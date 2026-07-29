---
navbar: false
sidebar: false
next: false
pre: false
title: 卢晓锋的简历
titleTemplate: false
pageClass: resume-lxf
---

<div class="resume-pdf-header">
  <a href="https://luxiaofeng.site" target="_blank" rel="noopener noreferrer">luxiaofeng.site</a>
</div>

 <center>
 <h1>卢晓锋</h1>
 </center>

## 个人信息

<div class="info-wrap">
    <span class="info-label">岗 位：高级前端开发</span>
    <span class="info-item">经 验：8 年</span>
</div> 
<div class="info-wrap">
    <span class="info-label">手 机：15279189307</span>
    <span class="info-item">邮 箱：luxiaofeng.code@gmail.com</span>
</div> 
<div class="info-wrap">
    <span class="info-label">学 校：华东交通大学</span>
    <span class="info-item">专 业：通信工程（本科）</span>
</div>

## 工作经历

<div class="company-wrap">
    <span class="company-name">有赞科技有限公司</span>
    <span>2024.07~2026.05</span>
    <span>全栈开发</span>
</div>

<div class="company-wrap">
    <span class="company-name">深圳市兔展智能科技有限公司</span>
    <span>2020.07~2024.05</span>
    <span>高级前端开发</span>
</div>

<div class="company-wrap">
    <span class="company-name">深圳市秦丝科技有限公司</span>
    <span>2018.07~2020.06</span>
    <span>中级前端开发</span>
</div>

## 技能

- **前端**：React / Vue；小程序（Taro、UniApp）；Webpack / Vite
- **服务端 & 运维**：Java、Spring Boot、Redis、NSQ、MySQL；Nginx、Docker、Jenkins
- **Vibe Coding**：Claude Code / Codex / Cursor 贯穿研发生命周期；Skill + **OpenSpec** 沉淀可复用协作规范
- **自研 MCP**：打通日志 / DB / 接口 / 发布，主要用于线上问题排查与 Bug 定位修复

## 项目经历

### **1、AI 研发工作流平台（dev-flow MCP）** <span class="time">有赞科技 · 2025.03 - 2026.05</span>

**项目角色**：全栈开发

**主要技术栈**：Node.js、Python

**项目背景**：线上 Bug 排查与修复需要在日志、数据库、内部接口和发布系统间频繁切换，上下文割裂、人工操作链路长；AI 编程助手缺少直接调用内部研发系统的能力，难以完成从问题定位到修复验证的闭环。

**项目描述**：主导设计并开发团队内部 **dev-flow MCP Server**，将天网日志查询、数据库查询、内部接口调用和项目发布封装为可编排的 **MCP Tool**，结合 Cursor 与 Skill 串联“日志定位 → 数据核查 → 代码修复 → 发布验证”的完整流程；项目启动后两个月内完成核心能力上线，后续持续迭代维护并推广至团队使用。

**核心工作**：

- **MCP 工具架构**：按单一职责拆分日志、DB、接口和发布等 **7～8 个 MCP Tool**，统一输入输出协议、错误处理及失败提示，支持 AI 助手按排查步骤组合调用。
- **Bug 排查闭环**：输入 TraceId 自动检索调用链和异常日志并结合代码上下文定位问题；涉及数据状态时继续调用 DB Tool 核查数据，将跨系统排查收敛为连续工作流。
- **登录态复用**：延续本机浏览器已登录会话访问内部系统；登录失效时引导完成企业登录后恢复任务。
- **安全与稳定性治理**：DB 工具复用个人系统 Token，访问权限由 Token 对应的个人权限决定；工具侧拦截写入 SQL，设置查询超时和最大返回行数，并记录调用审计日志以支持问题追溯。
- **Skill 沉淀**：将日志排查、数据核查、接口验证和发布验证等高频路径沉淀为可复用 Skill，统一团队使用方式。

**项目成果**：平台覆盖团队约 **50 人**，将原本分散在多个浏览器系统中的排查与发布操作收敛到 IDE 内；典型线上问题定位时间由人工排查 **30 分钟以上缩短至约 2 分钟**，显著减少系统切换和上下文复制成本。

<br>

### **2、有赞美业 SaaS 系统** <span class="time">有赞科技 · 2024.07 - 2026.05</span>

**项目角色**：高级前端开发 & 全栈开发

**主要技术栈**：React、TypeScript、Webpack、pnpm、Java、Spring Boot、MySQL、NSQ

**项目背景**：美业 SaaS 系统覆盖客户 CRM、用户权益、标签分层和运营触达等核心场景，同时需要面向门店、零售、电商等环境提供差异化能力。随着业务和项目规模增长，系统面临标品缺少定制扩展机制、权益状态与标签结果不一致，以及多项目依赖导致安装慢、磁盘占用持续增长等问题。

**项目描述**：负责美业 SaaS 系统前后端业务开发与工程治理，主导从 0 到 1 建设 CRM 工程级定制化方案，完成用户权益自动过期与标签增量刷新链路，并推进 Yarn 向 pnpm 迁移及 Node 版本升级，提升多环境交付能力、业务数据准确性和研发效能。

**核心工作**：

- **CRM 定制化架构**：主导从 0 到 1 设计工程级定制化方案，通过 Webpack `resolve.extensions` 按环境调整文件后缀解析优先级，优先加载定制实现、未命中时自动回退标品文件；同步配置 TypeScript `moduleSuffixes`，确保类型检查、IDE 跳转与实际构建结果一致，在不侵入标品代码的前提下支持门店、零售、电商等环境。
- **权益自动过期**：基于权益到期时间定时识别待过期记录并刷新状态，将过期数据作为用户标签重算入口，保障权益状态与标签结果一致。
- **标签增量刷新**：以昨日过期权益圈定受影响用户，按 **5000 条/批、最多约 300 批**处理约 **150 万条**数据；批次内按 `userId` 聚合，减少重复消息发送，通过 NSQ 触发标签刷新，并配置异常日志与任务超时上报，避免全量扫描。
- **依赖工程治理**：完成 Yarn 向 pnpm 迁移及 Node 升级，使用 `pnpm import` 基于原 `yarn.lock` 生成 `pnpm-lock.yaml`，尽量保持迁移前后的依赖版本一致；处理幽灵依赖、版本冲突和旧包兼容问题，同步调整安装脚本与 CI 流程，并通过 pnpmfile 兼容存量依赖。

**项目成果**：

- 实现标品能力与定制能力的工程隔离，同一套代码可按环境输出门店、零售、电商等定制版本，降低多环境交付和回归维护成本。
- 以增量任务替代标签全量重算，支持约 150 万条数据分批处理，降低数据库扫描及任务执行压力。
- 依赖安装耗时由约 **3 分钟缩短至 30 秒**，线上 CI 由约 **3 分半缩短至 1 分半**；多项目依赖磁盘占用稳定在约 **20GB** 左右，解决全栈开发时磁盘占用随项目增加持续上涨的问题。

<br>

### **3、零售云 SaaS 系统** <span class="time">兔展科技 · 2021.12 - 2024.05</span>

**项目角色**：高级前端开发 / 前端组长

**主要技术栈**：Vue 3、UniApp、TypeScript、Webpack 5、Vite、SWC、Node.js

**项目背景**：零售云 SaaS 系统覆盖门店经营、营销活动、页面装修和小程序搭建等业务场景。Web 端长期运行于 Vue 1 与早期 Webpack 技术栈，微信小程序使用 Wepy，核心装修模块耦合度高、构建速度慢；同时项目初始化和小程序发布依赖人工操作，影响业务迭代与团队协作效率。

**项目描述**：担任前端组长，主导零售云前端架构升级及研发效能建设，完成 Web 端 **Vue 1 → Vue 3**、微信小程序 **WePY → UniApp + Vue 3** 及 Webpack 5、TypeScript 落地，重构核心装修模块，并建设工程化基线及小程序 DevOps 发布流程。

**核心工作**：

- **多端架构升级**：完成 Web 端 **Vue 1 → Vue 3**、微信小程序 **WePY → UniApp + Vue 3** 迁移，并升级至 Webpack 5，引入 TypeScript、SWC、并行编译和构建分析；兼容 Vite 本地开发模式，统一多端技术栈并提升构建效率。
- **装修模块重构**：针对渲染逻辑、配置面板和素材管理强耦合问题，重新划分组件边界、收敛状态流转并适配路由，降低高频装修需求的扩展和维护成本。
- **工程化基线建设**：通过 CLI、远程模板、能力预设和版本管理，将项目初始化、监控、Lint 及 CI 配置标准化，支持不同项目类型按需生成工程能力。
- **分享页登录态治理**：针对用户从分享入口进入页面时，未登录即调用鉴权接口导致页面空白的问题，封装 `onLogin` 自定义 Hook，统一承接需要登录鉴权的业务逻辑，确保登录完成后再执行接口请求与页面初始化。
- **小程序 DevOps**：通过 CLI、发布配置和取码平台串联构建、上传、预览、发布检查、版本记录及二维码分发，降低多人并行发版的版本覆盖风险。
- **团队协作与交付管理**：参与需求评审和技术方案设计，按成员能力拆分并分配任务、制定排期；跟进开发进度与风险，通过 Code Review 统一代码质量，协助组员解决技术难点，并协调产品、后端和测试推进联调、验收及上线。
- **重点业务交付**：在春节前约 15 天 从 0-1 完成 AI 数字人拜年小程序的技术选型、任务拆解、主框架搭建、核心页面开发及联调上线。

**项目成果**：

- Vue 3 生态落地后整体开发效率约提升 **20%**，Vite 本地构建速度约提升 **90%**，Webpack 生产构建速度约提升 **36%**。
- 完成 Web 与微信小程序技术栈升级，统一基于 Vue 3 的开发模式，降低多端维护和人员切换成本。
- 解决分享页面在未登录场景下调用鉴权接口导致的空白问题，提升分享链路的可用性和稳定性。
- 新项目从创建到本地可运行由约 **2 小时**缩短至 **10 分钟内**，监控、Lint 及 CI 等工程能力实现统一接入。
- 小程序发布流程平台化后，研发侧效率约提升 **15%**、协作效率约提升 **60%**，版本与发布记录可追溯。

<br>

### **4、兔展营销 SaaS 系统** <span class="time">兔展科技 · 2020.07 - 2024.05</span>

**项目角色**：高级前端开发

**主要技术栈**：React、Webpack、Ant Design、Taro 3

**项目背景**：营销 SaaS 系统覆盖企业组织管理、角色权限、营销业务配置和小程序等场景。业务需要获取用户进入小程序、页面访问与停留时长、页面流转及重要功能点击等完整生命周期数据；同时 B 端后台核心模块、通用组件能力及 Taro 2 小程序的兼容性和构建能力需要持续完善。

**项目描述**：负责营销 SaaS 系统 B 端后台和 Taro 小程序的开发维护，并参与 UI 组件库、业务组件库建设；设计小程序全局非侵入式代理埋点及动态主题方案，将数据采集、主题配置能力与业务逻辑解耦。

**核心工作**：

- **B 端核心模块**：负责组织架构树、角色权限等核心模块开发，支持组织层级展示、节点操作和权限配置等业务场景。
- **组件库建设**：维护 UI 组件库与业务组件库，主导统一错误、404、无数据等状态展示组件，规范异常及空状态的交互和视觉表现。
- **复杂业务组件**：负责多级联动筛选组件和数据驱动动态渲染组件，将通用交互及渲染逻辑从业务页面中抽离，降低重复开发成本。
- **小程序架构升级**：维护基于 Taro 的微信小程序，完成 **Taro 2 → Taro 3** 升级，解决 Taro 2 下函数组件渲染兼容问题，接入 Webpack 生态并优化打包体积。
- **小程序非侵入式埋点**：通过全局代理统一拦截小程序生命周期和关键交互事件，自动采集进入小程序、页面访问、停留时长及重要功能点击数据；埋点逻辑与业务代码分离，避免在页面中重复编写上报逻辑。
- **小程序动态主题**：针对原有主题色写死在 CSS 中、无法扩展多套主题的问题，设计动态主题方案；在根节点注入主题色变量并由组件统一消费，避免为每套主题重复生成样式，在减少小程序包体积的同时支持任意主题色动态配置与全局生效。

**项目成果**：完成组织架构、角色权限等核心能力交付；通过组件库统一通用场景的实现方式，提高组件复用率和页面一致性；升级小程序技术栈，改善函数组件兼容性、工程扩展能力及构建产物体积；实现小程序访问链路与关键行为的统一采集，并支持任意主题色动态配置。

<style>
    .resume-pdf-header {
        display: none;
    }
    @media print {
        .resume-lxf .resume-pdf-header {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            text-align: center;
            font-size: 10pt;
            padding: 6px 12px 10px;
            border-bottom: 1px solid #999;
            background: #fff;
        }
        .resume-lxf .resume-pdf-header a {
            color: #333;
            text-decoration: none;
        }
        /* 避免首屏正文与固定页眉重叠 */
        .resume-lxf .VPContent,
        .resume-lxf .vp-doc {
            padding-top: 36px;
        }
    }

    .info-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px
    }
   .info-label {
        width: 230px;
    }
    .info-item {
        width: 290px;
        text-align: left;
        margin-left: 100px;
    }
    .company-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px
    }
    .company-name {
        width: 220px;
    }

    .time {
        font-weight: normal;
        margin-left: 50px;
        font-size: 16px;
    }
</style>
