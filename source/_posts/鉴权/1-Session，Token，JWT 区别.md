---
title: 1.1-Session，Token，JWT 原理解析
date: 2023-10-22 23:51:39
categories:
- 鉴权
tags:
---

# 一、Session

Session 是服务器端使用的一种记录客户端状态的机制，客户端通过 SessionID 来访问服务器端的资源，SessionID 一般是存在 Cookie 中的，也可以通过 URL 传递，但是不推荐这样做。
Session 模式一般如下步骤：

1. 用户未登录，输入账号密码，提交到服务器端。
2. 服务器端验证账号密码，如果正确，生成 SessionID，将用户信息以及 SessionID 保存到服务器端，通过 Set-Cookie 请求头设置 cookie 到客户端。
3. 客户端收到响应后，保存 cookie，下次请求时，自动带上 cookie。

**缺点**
1. 在遭受 DDOS 攻击时，服务器端需要保存大量的 Session 信息，会消耗大量的内存。
2. Session 信息保存在服务器端，如果服务器宕机，会丢失所有的 Session 信息，用户需要重新登录。
3. Session 信息保存在内存中，如果有多台服务器，用户的 Session 信息无法同步。
4. XSS 攻击，如果用户的浏览器存在 XSS 漏洞，攻击者可以拿到用户的 Session 信息，然后伪造用户的 cookie，从而可以伪造用户的身份。
5. CSRF 攻击，攻击者可以伪造用户的请求，从而可以拿到用户的 Session 信息，然后伪造用户的 cookie，从而可以伪造用户的身份。

# 二、Token

Token 是一种客户端认证方式，客户端通过用户名密码请求服务器，服务器验证通过后，返回 Token，客户端收到 Token 后，保存到客户端，下次请求时，自动带上 Token，服务器端通过校验 Token 来验证用户身份。

Token 模式一般如下步骤：

1. 用户未登录，输入账号密码，提交到服务器端。
2. 服务器端验证账号密码，如果正确，生成 Token，将 Token 保存到服务器端，通过 Set-Cookie 请求头设置 cookie 到客户端或者响应体返回，用户自行设置到 localStorage。
3. 客户端收到响应后，保存 cookie 或者 localStorage，下次请求时，自动带上 cookie 或者 localStorage。
4. 客户端每次请求时，通过 Authorization 请求头或者 URL 传递 Token。
5. 服务器端通过 Authorization 请求头或者 URL 传递 Token，验证 Token，如果验证通过，返回数据，如果验证失败，返回 401 状态码。

**缺点**
1. Token 需要存储到服务端，如果有多台服务器，需要同步 Token。
2. Token 一般是不会过期的，如果 Token 被盗取，攻击者可以一直使用 Token，除非用户修改密码或者主动注销 Token。
  
# 三、JWT

JWT 是一种 Token 的实现方式，JWT 的全称是 JSON Web Token，是一种轻量级的身份认证和信息交互方式，可以在用户和服务器之间传递安全可靠的信息。
JWT 分为三部分，分别是 Header，Payload 和 Signature，三部分之间用 . 分割，如下所示：

```
Header.Payload.Signature
```
Header 存储加密的算法，Payload 存储用户信息，Signature 是对 Header 和 Payload 的签名，用于验证数据的完整性，Payload 一般存储 userId，用于校验用户身份，Signature 是防篡改的，如果数据被篡改，Signature 会验证失败。比如用户 id 被攻击者获取，攻击者如果伪造 Signature，服务器端会验证失败，从而防止攻击者伪造用户身份。这样原来，后端无需存储 JWT，只需使用密码学原理，对签名进行校验即可安全的验证用户身份，未来服务器扩容，只要保证密钥一致即可，无需同步用户登录状态。

JWT 步骤如下：
1. 用户未登录，输入账号密码，提交到服务器端。
2. 服务端校验账号密码，如果正确，则返回 JWT Token，客户端收到响应后，保存到 localStorage。
3. 客户端每次请求时，通过 Authorization 请求头或者 URL 传递 Token。
4. 服务器端通过 Authorization 请求头或者 URL 传递 Token，验证 Token，如果验证通过，返回数据，如果验证失败，返回 401 状态码。
5. 客户端每次请求时，需要带上 Token，服务器端通过校验 Token 来验证用户身份。
   

**缺点**
1. JWT 一般是不会过期的，如果 Token 被盗取，攻击者可以一直使用 Token，除非用户修改密码或者主动注销 Token。
2. JWT 一般存储在 localStorage 中，如果用户的浏览器存在 XSS 漏洞，攻击者可以拿到用户的 JWT，然后伪造用户的身份。


