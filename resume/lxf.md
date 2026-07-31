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
</div> 
<div class="info-wrap">
    <span class="info-label">手 机：15279189307</span>
    <span class="info-item">邮 箱：luxiaofeng.code@gmail.com</span>
</div> 
<div class="info-wrap">
    <span class="info-label">学 校：华东交通大学</span>
    <span class="info-item">专 业：通信工程（本科）</span>
</div>

## 个人优势

- 8 年前端经验，精通 Vue、React、小程序及 Taro、UniApp，熟悉 Webpack、Vite、pnpm、Node.js、CI/CD；具备微前端及 SaaS、B 端复杂项目从 0 到 1 落地经验，主导过技术栈升级、组件体系、依赖及构建优化。
- 1 年+前端管理经验，负责需求评审、任务拆分、排期、Code Review 及跨团队交付。
- 2 年全栈开发经验，具备 BFF、Java 全栈开发，熟悉 Spring Boot、MySQL、Redis、NSQ 等后端技术。
- 持续沉淀技术方案、迁移指南、开发规范及问题排查文档，推动团队复用。
- 熟练使用 Claude Code、Codex、Cursor，具备 Skill、OpenSpec、MCP 实践，自研 dev-flow MCP 并推广至约 50 人团队。

## 工作经历

<div class="company-wrap">
    <span class="company-name">有赞科技有限公司</span>
    <span>2024.07~2026.05</span>
    <span>全栈开发</span>
</div>

- **全栈业务开发**：负责美业 SaaS 前后端业务开发，覆盖 CRM、用户权益、标签分层及运营触达等核心场景。
- **定制化方案落地**：主导 CRM 工程级定制化方案落地，支持不同业务环境的差异化交付。
- **工程效能治理**：推进 Yarn 向 pnpm 迁移、Node 升级及 CI 流程适配，治理依赖兼容、安装效率和多项目磁盘占用问题。
- **AI 研发提效**：主导 dev-flow MCP Server 建设，将日志、DB、接口和发布能力接入 AI 研发工作流，提升线上问题排查与修复效率。

<div class="company-wrap">
    <span class="company-name">深圳市兔展智能科技有限公司</span>
    <span>2020.07~2024.05</span>
    <span>高级前端开发</span>
</div>

- **小组协作与交付**：负责前端小组任务拆解与分配、排期跟进、Code Review 和技术方案协助，协调产品、后端及测试推进项目交付。
- **多端技术升级**：主导 Web 与微信小程序技术栈升级，完成 Vue 1 → Vue 3、WePY → UniApp + Vue 3 及 Taro 2 → Taro 3 迁移。
- **核心业务建设**：负责零售云与营销 SaaS 核心模块开发，覆盖页面装修、组织架构、角色权限、营销配置及小程序等业务场景。
- **通用能力沉淀**：建设 UI 与业务组件库，落地小程序非侵入式埋点、动态主题及分享页登录态治理等通用能力。
- **研发效能建设**：推进工程化基线和小程序 DevOps 建设，将项目初始化、质量检查、CI、构建发布及版本记录等流程标准化。

<div class="company-wrap">
    <span class="company-name">深圳市秦丝科技有限公司</span>
    <span>2018.07~2020.06</span>
    <span>中级前端开发</span>
</div>

- **装修系统建设**：基于 Vue 2、Webpack、Element 从 0 到 1 完成小程序首页装修系统，负责工作台、装修组件、动态表单及模板管理等模块。
- **数据与预览链路**：设计装修数据结构与动态渲染方案，打通 B 端配置、线上预览及小程序渲染链路。
- **混合 App 开发**：负责基于 WebView 的 App 业务页面开发与维护。

## 项目经历

### **1、AI 研发工作流平台（dev-flow MCP）** <span class="time">有赞科技 · 2025.03 - 2026.05</span>

**项目角色**：全栈开发

**主要技术栈**：Node.js、Python

**业务建设**：

- 面向线上 Bug 排查与修复场景，将日志、数据库、内部接口和发布系统等分散能力收敛到 IDE 内，形成“日志定位 → 数据核查 → 代码修复 → 发布验证”的完整流程。
- 项目启动后两个月内完成核心能力上线，后续持续迭代并推广至团队约 **50 人**使用；典型线上问题定位时间由人工排查 **30 分钟以上缩短至约 10 分钟**。

**架构设计**：

- 主导设计并开发团队内部 **dev-flow MCP Server**，按单一职责拆分日志、DB、接口和发布等 Tool；定义 Tool Schema、必填参数、统一返回结构和错误信息，执行参数校验并保留失败上下文，保证不同 Tool 可组合调用。
- 结合 Cursor、Skill 与 MCP 编排排障流程，将日志查询、数据核查、接口验证和发布验证等高频路径沉淀为可复用 Skill。

**技术落地**：

- 构建以 TraceId 为核心的跨系统诊断链路，串联调用链、异常日志、数据核查与代码上下文，实现线上问题的一站式定位。
- 建设数据库安全访问机制，通过 SQL 分析、写操作拦截、查询限流与调用审计，保障数据查询安全并支持全链路追溯。

<br>

### **2、有赞美业 SaaS 系统** <span class="time">有赞科技 · 2024.07 - 2026.05</span>

**项目角色**：高级前端开发 & 全栈开发

**主要技术栈**：React、Vue、TypeScript、Webpack、pnpm、Java、Spring Boot、MySQL、NSQ、Apollo

**业务建设**：

- 负责美业 SaaS 系统全栈业务开发，覆盖客户 CRM、用户权益、标签分层、预约、商品、订单等场景，并支持不同业务环境的差异化交付。
- 在 2 个月内独立负责小红书小程序前端从 0 到 1 建设，完成首页 Banner、主题色方案、商品配置、商品详情、支付及订单等核心交易页面；参与部分 Java 后端开发，负责商品提审、POI 管理及核销等能力，打通商品配置、交易下单与到店核销链路。
- 负责用户权益自动过期与标签增量刷新后端方案及 Java 实现，完成定时任务、MySQL 增量查询、分批聚合、NSQ 消息触发和异常监控，以增量处理替代全量重算。
- 针对业务域名被 DNS 屏蔽后静态资源和接口不可用的问题，建设域名容灾切换能力，降低域名故障对 Web 与小程序线上业务的影响。
- 推进多项目依赖治理，解决全栈开发场景下安装耗时长、磁盘占用随项目数量持续增长及 CI 构建效率低的问题。

**架构设计**：

- 主导 CRM 多环境可扩展架构设计，通过标品能力与差异化能力分层，实现同一套代码按环境交付不同版本，并保留标品自动回退能力。
- 建立定制化边界与影响分析机制，统一页面、组件和类型的替换规则，保证类型检查、研发调试与构建产物一致。
- 设计权益过期感知与标签刷新链路，以昨日过期权益圈定受影响用户，通过用户聚合与异步消息实现精准通知。
- 设计配置中心驱动的多端域名容灾架构，统一域名映射规则并适配 Web 与小程序运行环境，支持线上故障快速切换。
- 制定包管理器与运行时平滑升级方案，通过版本锁定、兼容层和 CI 一致性治理，降低大规模项目迁移风险。

**技术落地**：

- 落地配置驱动的多环境定制机制，实现定制能力与标品隔离、按需加载及自动回退，保证研发与构建结果一致。
- 基于 UniApp 独立完成小红书小程序前端建设，并参与 Spring Boot 后端开发，对接商品、POI、核销及交易相关开放能力。
- 基于定时任务扫描昨日过期权益，聚合受影响用户并通过 **NSQ** 精准通知业务方完成标签更新，解决用户权益过期后业务方无法及时感知的问题。
- 数据库性能治理，通过慢查询分析定位瓶颈，优化不合理 SQL 并重新设计索引，降低查询耗时与数据库负载。
- 落地多端域名容灾机制，支持通过配置快速切换资源和接口域名，提升线上服务可用性。
- 主导 pnpm 迁移与依赖治理，解决存量依赖兼容、版本冲突及多项目重复占用问题，统一本地与 CI 环境。
- 依赖安装耗时由约 **3 分钟缩短至 30 秒**，线上 CI 由约 **3 分半缩短至 1 分半**；多项目依赖磁盘占用稳定在约 **20GB** 左右。

<br>

### **3、兔展 SaaS 营销系统** <span class="time">兔展科技 · 2020.07 - 2024.05</span>

**项目角色**：前端组长 / 高级前端开发

**主要技术栈**：Vue 3、React、UniApp、Taro、TypeScript、Webpack 5、Vite、SWC、Node.js、Ant Design，Tailwindcss

**业务建设**：

- 担任前端组长，参与需求评审和技术方案设计，按成员能力拆分任务并制定排期，跟进开发风险、Code Review、联调验收及上线。
- 负责门店经营、营销活动、页面装修和小程序搭建等核心场景建设；解决分享入口未登录即调用鉴权接口导致的页面空白问题，提升分享链路稳定性。
- 在春节前约 **15 天**从 0 到 1 完成 AI 数字人拜年小程序的技术选型、任务拆解、主框架搭建、核心页面开发及联调上线。
- 负责营销 SaaS 系统 B 端后台和 Taro 小程序开发维护，完成组织架构树、角色权限等核心模块，支持组织层级展示、节点操作和权限配置。
- 建设小程序用户行为采集与动态主题能力，覆盖页面访问、停留时长、页面流转及关键点击，并支持任意主题色配置与全局生效。

**架构设计**：

- 主导零售云多端架构升级，推动 Web 与微信小程序统一至 Vue 3 技术体系，降低多端维护和人员切换成本。
- 重构核心装修模块，重新划分渲染、配置面板和素材管理的组件边界，统一数据状态与更新入口，降低模块耦合及高频需求扩展成本。
- 建设工程化基线和小程序 DevOps 体系，将项目初始化、监控、Lint、CI、构建、上传、预览、发布检查及版本记录等流程标准化。
- 维护 UI 与业务组件库，将异常状态、多级联动筛选及数据驱动渲染等通用能力从业务页面中抽离。
- 设计小程序全局非侵入式代理埋点和动态主题方案，实现数据采集、主题配置与业务逻辑解耦。

**技术落地**：

- 主导 Web 与小程序存量技术栈升级，完成 Vue、WePY、Taro 及构建体系迁移，统一多端开发基线并降低历史系统维护成本。
- 重构页面装修、路由权限与登录鉴权等核心链路，收敛状态和能力边界，提升复杂业务的扩展性与稳定性。
- 建设工程化基线与项目生成体系，将技术规范、能力预设、模板和版本管理平台化，统一项目初始化及交付标准。
- 打通小程序构建、上传、预览、发布与版本追踪链路，并建设统一取码平台，提升多角色协作与发布效率。
- 建设组件体系、非侵入式埋点与动态主题能力，提升业务复用率，并实现用户行为采集与主题配置能力解耦。
- Vue 3 生态落地后整体开发效率约提升 **20%**，Vite 本地构建速度约提升 **90%**，Webpack 生产构建速度约提升 **36%**；新项目启动时间由约 **2 小时缩短至 10 分钟内**。
- 小程序发布流程平台化后，研发侧效率约提升 **15%**、协作效率约提升 **60%**。

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
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 40px;
        align-items: center;
        margin-bottom: 10px;
    }
   .info-label {
        min-width: 0;
    }
    .info-item {
        min-width: 0;
        text-align: left;
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
