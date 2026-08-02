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
    <span class="info-label">岗 位：高级前端开发（全栈）</span>
    <span class="info-item">网 站：<a href="https://luxiaofeng.site" target="_blank" rel="noopener noreferrer">luxiaofeng.site</a></span>
</div> 
<div class="info-wrap">
    <span class="info-label">手 机：15279189307</span>
    <span class="info-item">邮 箱：luxiaofeng.code@gmail.com</span>
</div> 
<div class="info-wrap">
    <span class="info-label">学 校：华东交通大学</span>
    <span class="info-item">专 业：通信工程（本科）</span>
</div>

## 技术能力

- 近 2 年全栈开发经验，具备 BFF、Java 服务端开发能力，熟悉 Spring Boot、MySQL、Redis、NSQ 等后端技术。
- 8 年前端经验，熟练掌握 Vue、React，熟悉 Taro、UniApp 等多端小程序开发；具备 SaaS、B 端复杂项目从 0 到 1 落地经验，主导过技术栈升级、组件体系、依赖及构建优化，熟悉 Webpack、Vite、pnpm、Node.js、CI/CD。
- 1 年+前端管理经验，负责 3 名前端的需求评审、任务拆分、排期、Code Review 及跨团队交付。
- 熟练使用 Claude Code、Codex、Cursor 等 AI 编程工具，日常基于 OpenSpec 以 SDD（规格驱动开发）推进需求落地。
- 具备 AI 研发工程化实践，自研并推广团队级 dev-flow MCP，将日志、数据库、接口与发布能力接入 IDE；支持一键配置到 Cursor、Claude Desktop、Claude Code 等主流 AI 客户端。

## 工作经历

<div class="company-wrap">
    <span class="company-name">有赞科技有限公司</span>
    <span>2024.07~2026.05</span>
    <span>高级前端开发（全栈）</span>
</div>

- 负责美业 SaaS 全栈业务开发，主导 CRM 定制化，并参与权益刷新、商品提审等服务端能力落地。
- 主导工程效能治理与 dev-flow MCP Server 建设，支持一键配置到主流 AI 客户端。

<div class="company-wrap">
    <span class="company-name">深圳市兔展智能科技有限公司</span>
    <span>2020.07~2024.05</span>
    <span>高级前端开发</span>
</div>

- 负责 3 名前端协作交付，负责零售云与营销 SaaS 核心模块开发。
- 主导 Web 与微信小程序技术栈升级，推进组件库、小程序埋点及工程化建设。

<div class="company-wrap">
    <span class="company-name">深圳市秦丝科技有限公司</span>
    <span>2019.05~2020.06</span>
    <span>中级前端开发</span>
</div>

- 负责进销存系统业务开发，主导小程序首页装修从 0 到 1 落地。

## 项目经历

### **1、有赞美业 SaaS 系统** <span class="time">有赞科技 · 2024.07 - 2026.05</span>

**项目角色**：高级前端开发（全栈）

**主要技术栈**：React、Vue、UniApp、TypeScript、Webpack、pnpm、Node.js、Java、Spring Boot、MySQL、NSQ、Apollo

- **小红书小程序**：在 3 个月内基于 UniApp 独立完成前端从 0 到 1 建设，覆盖商品配置、详情、支付及订单等核心交易页面；并参与部分 Spring Boot 后端开发，负责商品提审、POI 绑定等能力，打通商品配置、交易下单与到店核销链路；上线后负责全部前后端维护。
- **权益过期与标签刷新**：负责后端方案设计及 Java 实现，通过 MySQL 增量查询、分批聚合与 **NSQ** 消息通知业务方完成标签更新，以增量处理替代全量重算，解决权益过期后业务方无法及时感知的问题。
- **CRM 多环境定制**：主导 CRM 多环境可扩展架构设计，通过配置动态生成 Resolver 与 TypeScript 类型文件，实现不同环境下的模块解析与类型一致性，并支持差异化能力覆盖及标品自动回退。
- **AI 研发工作流（dev-flow MCP）**：面向线上问题排查与修复，主导建设团队级 AI Native 研发基础设施。将日志、数据库、内部接口与发布能力抽象为 MCP 工具并接入 IDE，沉淀以 TraceId 为入口的跨系统诊断工作流，并建立 SQL 风险分析、写操作拦截与调用审计等安全治理能力；同时提供一键配置能力，自动完成环境安装与 MCP / Skills 写入，覆盖 Cursor、Claude Desktop、Claude Code 等主流 AI 客户端。推广至团队约 **30 人**使用，将原先依赖多系统人工排查的流程收敛为 IDE 内一站式诊断。
- **域名容灾**：基于 Apollo 配置中心设计多端域名映射方案，统一 Web 与小程序运行环境的域名切换规则，支持 DNS 异常时通过配置快速切换，保障静态资源与接口可用。
- **微信小程序质量保障**：基于 `miniprogram-automator` 建设全页面白屏检测，通过页面截图与报告生成辅助定位白屏问题，并对核心下单链路补充 E2E 回归；同时预留约定式扫描扩展，页面侧新增 `*.spec.ts` 即可自动纳入自定义测试流程，保障包管理器升级及日常迭代后的页面可用性。
- **pnpm 迁移与依赖治理**：制定包管理器与运行时平滑升级方案，通过版本锁定、兼容层和 CI 一致性治理解决依赖兼容、版本冲突及多项目重复占用问题。依赖安装耗时由约 **3 分钟缩短至 30 秒**，线上 CI 由约 **3 分半缩短至 1 分半**。

<br>

### **2、兔展 SaaS 营销系统** <span class="time">兔展科技 · 2020.07 - 2024.05</span>

**项目角色**：高级前端开发

**主要技术栈**：Vue 3、React、UniApp、Taro、TypeScript、Webpack 5、Vite、SWC、Node.js、Ant Design、Tailwind CSS

- **多端技术栈升级**：主导零售云 Web 与微信小程序存量技术栈升级，完成 Vue 1 → Vue 3、WePY → UniApp、Taro 2 → Taro 3 及构建体系迁移，统一多端开发基线。Vite 本地构建速度约提升 **90%**，Webpack 生产构建速度约提升 **36%**。
- **AI 数字人拜年小程序**：以此项目为起点开始带领前端团队，在春节前约 **15 天**完成技术选型、任务拆解、主框架搭建、核心页面开发及联调上线。
- **核心业务建设**：负责门店经营、营销活动、页面装修、组织架构树及角色权限等核心模块开发；重构装修模块，重新划分渲染、配置面板和素材管理的组件边界；设计统一 `onLogin` Hook，解决分享入口鉴权时序异常导致的页面白屏问题。
- **工程化与 DevOps**：维护内部脚手架 CLI，新增项目一键启动、埋点接入、ESLint 与 Prettier 等能力；将项目初始化、监控、CI、构建、上传、预览、发布检查及版本记录等流程标准化，并打通小程序发布链路；新项目搭建时间由约 **2 小时缩短至 10 分钟内**。
- **业务组件库**：参与业务组件库建设，负责多级联动动态筛选组件。支持根据输入配置动态渲染筛选条件与选项数据，开放外部修改能力以便业务侧扩展；兼容 Form List，支持动态增减表单项，并接入表单校验体系。
- **小程序埋点**：设计小程序全局非侵入式代理埋点方案，覆盖页面访问、停留时长、页面流转及关键点击，实现数据采集与业务逻辑解耦；并建设动态主题能力，支持主题配置与业务代码分离。
- **小程序海报治理**：将原生 Canvas 海报方案迁移至开源框架，简化海报业务开发；主动参与框架维护并修复多个缺陷。

<br>

### **3、秦丝 SaaS 进销存系统** <span class="time">秦丝科技 · 2019.05 - 2020.06</span>

**项目角色**：中级前端开发

**主要技术栈**：Vue 2、Webpack、Element UI、微信原生小程序、腾讯云 IM

- **小程序首页装修**：主导首页装修系统从 0 到 1 落地，面向商户自主配置小程序首页，支持十余种装修组件；设计 Schema 配置结构与动态渲染机制，打通 B 端配置、实时预览及微信小程序渲染链路。
- **腾讯 IM 客服**：在 H5 与小程序接入腾讯云 IM，构建客服会话与业务数据联动能力，支持订单、商品信息快速检索，并实现应用内浮窗消息触达；同步完成 B 端客服工作台页面开发，打通接待会话与业务查询闭环。

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
