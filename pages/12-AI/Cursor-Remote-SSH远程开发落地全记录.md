# Mac 写代码，Windows 跑环境：Cursor Remote-SSH 远程开发落地全记录

> 实战时间：2026-11 | 场景：两台机器同一局域网（办公 WiFi）
> 最终效果：Mac 上的 Cursor 通过 Remote-SSH 直连 Windows，编辑、终端、Git、AI 补全全部跑在 Windows 上，免密登录

## 1. 为什么要这么折腾

我手边一台 MacBook，工位上一台 Windows 台式机。Mac 敲代码手感好，但环境全在 Windows 那边：代码仓库、运行时、内网依赖都是 Windows 侧的。

以前的做法是在 Mac 上开个 SSH 终端 + 共享文件夹，编辑和运行两头割裂，AI 补全更是完全用不上——因为 Cursor 索引的是 Mac 本地没有的代码。

Cursor 的 Remote-SSH 正好解决这个问题：SSH 连上 Windows 后，Cursor 会在远端起一个服务进程，编辑器里的终端、Git、文件搜索、AI 补全**全部在 Windows 上执行**，Mac 只是一块"带键盘的显示器"。一台 Mac，操纵两套环境。

整体就两大块：Windows 端把 SSH 服务端配好（四步），Mac 端把客户端配好（两步）。步骤不难，难的是一路上踩的坑，全部记录在后面第 4 节，建议先扫一眼再动手。

## 2. Windows 端配置（四步，管理员 PowerShell）

以下命令全部在**管理员 PowerShell**里执行，一次配完就不用再管。

### 2.1 安装并启动 OpenSSH Server

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

最后一句把 sshd 设成开机自启，重启后不用再手动开。

### 2.2 防火墙规则覆盖所有网络类型

装完 OpenSSH 自带的防火墙规则，默认可能只对「专用网络」生效——而办公 WiFi 经常被 Windows 归为「公用网络」，这是最隐蔽的一个坑（详见 4.2）。直接把规则改成对所有 Profile 生效：

```powershell
Get-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' | Select-Object Enabled, Profile
Set-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -Profile Any
```

### 2.3 把 sshd 的默认 shell 改成 PowerShell

cmd 做 SSH 默认 shell 时，Cursor 连上后初始化脚本会直接报错断连（详见 4.3）。注册表一行改掉：

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

### 2.4 装 Mac 公钥（管理员组账户的关键点）

如果 Windows 账户在管理员组里（绝大多数个人机都是），公钥**不是**放在 `~/.ssh/authorized_keys`，而是 `C:\ProgramData\ssh\administrators_authorized_keys`，并且必须收紧权限，否则 sshd 会因为文件权限过宽直接忽略它：

```powershell
Add-Content C:\ProgramData\ssh\administrators_authorized_keys -Value "<Mac 的 id_ed25519.pub 内容，一行>"
icacls C:\ProgramData\ssh\administrators_authorized_keys /inheritance:r /grant "Administrators:F" /grant "SYSTEM:F"
```

最后查一下本机 IP，记下来给 Mac 用：

```powershell
ipconfig   # 记下 IPv4，下文以 192.168.1.100 代称
```

## 3. Mac 端配置（两步）

### 3.1 密钥：必须在默认路径

```bash
[ -f ~/.ssh/id_ed25519 ] || ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub   # 这一行的内容交给 Windows（上面 2.4）
```

这里的坑很容易踩：只有放在**默认路径**、无密码短语的 `~/.ssh/id_ed25519`，ssh 才会自动出示。你把密钥放在 `~/.ssh/work_ed25519` 这种自定义路径里，ssh 默认根本不会尝试它——症状就是「Windows 明明装了我的公钥，但每次还是要密码」（详见 4.4）。

### 3.2 别名配置 ~/.ssh/config

```
Host win-dev
    HostName 192.168.1.100
    User dev
```

配好之后 `ssh win-dev` 直连。验证别名是否生效：

```bash
ssh -G win-dev | grep hostname
```

### 3.3 连接 Cursor

`Cmd+Shift+P` → `Remote-SSH: Connect to Host` → 选 `win-dev` → Open Folder 打开 Windows 上的仓库目录。

第一次连接时 Cursor 要往 Windows 下载约 106MB 的远端服务包，这一步在国内网络下是大坑，见 4.5。

## 4. 踩坑实录（症状 → 原因 → 解法）

这一节是全文精华。每个坑都是真实踩过、真实解掉的，按「症状 → 原因 → 解法」整理。

### 坑 1：Add-WindowsCapability 进度条转圈到天荒地老

- **症状**：`Add-WindowsCapability` 卡住不动，进度条一直显示安装中，等半小时也没结果。
- **原因**：Windows 的组件安装服务（CBS）一次只允许一个安装会话。如果两个安装并发了（比如脚本在装、你又手动敲了一遍），后到的会话会永远等待——而进度条是个假象，它不代表任何真实进度。
- **解法**：先看 `C:\Windows\Logs\DISM\dism.log` 有没有新写入的记录，没有就是真死锁了。**重启电脑清掉锁，然后只跑一次安装命令**。判断标准就一条：日志不动 = 卡死。

### 坑 2：ARP 通、ping 和 SSH 全部无响应

- **症状**：Mac 上 `arp` 能看到 Windows 的 MAC 地址，说明二层是通的；但 `ping` 不通，SSH 连 22 端口也毫无响应，像机器不存在一样。
- **原因**：OpenSSH 自带的防火墙规则默认只对 Private 网络生效，而办公 WiFi 被 Windows 归类为 Public 网络——规则压根没套在这张网卡上。二层通、三层被防火墙默默丢弃，就是这个经典症状组合。
- **解法**：`Set-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -Profile Any`（即 2.2 那步）。改完 SSH 立刻就通。顺带一提：Public 网络默认拦 ICMP，之后 ping 不通但 SSH 能连属于正常现象，测端口用 `nc -vz <IP> 22`。

### 坑 3：Cursor 一连上就报 `'export' 不是内部或外部命令`

- **症状**：SSH 本身能连，但 Cursor 连接初始化时远端报 `'export' 不是内部或外部命令`，然后直接断连。
- **原因**：sshd 默认 shell 是 cmd。Cursor 的初始化脚本是 bash/POSIX 语法写的（`export`、`&&`、`if` 这类），cmd 看不懂，第一步就挂。
- **解法**：把默认 shell 换成 PowerShell（即 2.3 那步注册表命令），重连即可。

### 坑 4：服务器装了公钥，每次还是要密码

- **症状**：Windows 的 `administrators_authorized_keys` 里明明有 Mac 的公钥，`ssh win-dev` 还是每次问密码。看 sshd 日志只有 `Accepted password`，从没有 publickey 记录。
- **原因**：Mac 侧私钥放在非默认路径（比如 `~/.ssh/work_ed25519`）。ssh 只会自动出示默认路径的密钥（`~/.ssh/id_ed25519` 等），自定义路径的密钥不配 `IdentityFile` 它根本不会尝试——客户端压根没出示，服务端自然只能问密码。
- **解法**：把密钥放回默认路径 `~/.ssh/id_ed25519`（`ssh-keygen` 不带 `-f` 生成即可），或在 `~/.ssh/config` 里显式加 `IdentityFile`。前者最省心。

### 坑 5：Cursor 服务端 106MB 下载被限速到 45KB/s

- **症状**：Cursor 连接后卡在 `Failed to install server within the timeout`。Windows 上看 `~/.cursor-server\bin\win32-x64\<commit>\cursor-server.tar.gz` 只有十几 KB，还在以约 45KB/s 龟速增长——而完整包约 106MB，照这个速度要 40 分钟起步，必然超时。
- **原因**：Cursor 的服务端包托管在海外 CDN（`cursor.blob.core.windows.net`），国际链路对单流限速。
- **解法**（按顺序试）：
  1. **方案 A**：Cursor 设置里改成「Mac 下载再通过 SSH 传给 Windows」：

     ```json
     "remote.SSH.localServerDownload": "always"
     ```

  2. **方案 B**：临时切手机热点让 Mac 或 Windows 下载，链路换了限速策略有时就不同。
  3. **方案 C（终极，实测有效）**：从 `Remote-SSH: Show Log` 日志里拿到真实下载 URL（形如 `https://cursor.blob.core.windows.net/remote-releases/<commit>/vscode-reh-win32-x64.tar.gz`），手动用**多进程分段 Range 下载**绕过单流限速——把 106MB 切成 24 段并行拉，实测单流 45KB/s、聚合能到 130KB/s 以上，分钟级拉完。拼装成完整 tar.gz 后解压到位：

     ```powershell
     tar.exe -xzf vscode-reh-win32-x64.tar.gz --strip-components=1 -C "$env:USERPROFILE\.cursor-server\bin\win32-x64\<commit>"
     ```

     注意压缩包顶层自带一层 `vscode-reh-win32-x64/` 目录，**必须加 `--strip-components=1`**，否则文件会多套一层目录，Cursor 找不到可执行文件。装好后重连，Cursor 发现服务端已就位，跳过下载直接启动。

### 坑 6：`cursor-remote.lock 正由另一进程使用`

- **症状**：解决了下载问题，重连时又报 `cursor-remote.lock` 被别的进程占用，安装无法继续。
- **原因**：之前超时的那次安装留下了残留进程，它还握着锁文件。
- **解法**：先找到还连着 CDN 的残留进程，再提权强杀，最后删锁文件重连：

  ```powershell
  Get-NetTCPConnection -RemotePort 443 -State Established   # 找连着 CDN 的 PID
  taskkill /F /T /PID <pid>   # 必须管理员窗口执行
  ```

  记住顺序：**先杀进程，再删锁文件**，反过来锁会立刻被重建。

### 坑 7：普通窗口 taskkill 报 Access denied

- **症状**：明明找到了 PID，普通 PowerShell 里 `taskkill /F` 却报拒绝访问。
- **原因**：通过 SSH（管理员组账户）起来的会话进程，运行在管理员的完整令牌下；而你的普通终端是 UAC 过滤后的令牌，权限反而不如它，杀不动。
- **解法**：开一个**管理员** PowerShell 再执行 taskkill。这也是坑 6 的解法必须「提权」的原因。

### 坑 8：昨天还好好的，今天 IP 连不上

- **症状**：配置全没动，第二天 `ssh win-dev` 直接连不上。
- **原因**：DHCP 分配的 IP 会漂移，Windows 重启或重连 WiFi 后拿到了新地址，Mac 配置里还是旧 IP。
- **解法**：Windows 上 `ipconfig` 查新 IP，同步改 Mac 的 `~/.ssh/config`；一劳永逸的办法是去路由器把 Windows 的 MAC 绑定固定 IP。

## 5. 坑速查表

| 症状 | 原因 | 解法 |
|---|---|---|
| 安装命令进度条永远在转 | CBS 并发死锁，进度条是假象 | 看 DISM 日志确认，重启清锁后只跑一次 |
| ARP 通、ping/SSH 全无响应 | 防火墙规则只对 Private 生效，办公 WiFi 是 Public | 规则 Profile 改 Any |
| `'export' 不是内部或外部命令` | sshd 默认 shell 是 cmd | 默认 shell 改 PowerShell |
| 连上即报 `&&` / `if` 解析错误 | Warp 终端的 warpify 向远端注入 bash 语法脚本 | Warp 设置关掉 "Warpify SSH sessions"，或用系统终端 |
| 有公钥还每次要密码 | 私钥不在默认路径，ssh 不出示 | 密钥放 `~/.ssh/id_ed25519` |
| 服务端下载超时 | 单流被国际链路限速 | localServerDownload → 热点 → 分段 Range 下载 |
| `cursor-remote.lock` 被占用 | 超时安装的残留进程持锁 | 提权 taskkill 后删锁重连 |
| taskkill 报拒绝访问 | SSH 会话进程是管理员完整令牌 | 管理员窗口执行 |
| 隔天连不上 | DHCP 分配的 IP 漂移 | `ipconfig` 对地址，或路由器绑 MAC |

其中 Warp 终端那条单独说一下：如果你用 Warp 做 Mac 日常终端，它的 "Warpify SSH sessions" 会往远端会话注入自己的 bash 语法初始化脚本，Windows shell 解析不了就报 `&&` / `if` 错误。这不是 SSH 或 Windows 的问题，关掉 Warpify 或换系统终端即可。

## 6. 日常使用

全部配好之后，日常只有一条命令：

```bash
ssh win-dev   # 免密直连，进去就是 PowerShell
```

Cursor 每次连接自动免密，打开就是熟悉的编辑器——只是终端里跑的命令、Git 操作、AI 补全的上下文，全都在 Windows 那台机器上执行。Mac 负责屏幕和键盘，Windows 负责一切苦力，各司其职。
