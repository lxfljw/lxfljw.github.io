# AI Native Development Workflow

## 1. 总体目标

通过 Agent + Project Map + Agent.md + Skill + MCP + OpenSpec，
让 AI 参与从需求分析、方案设计、任务拆解、编码、测试到发布验证的完整研发流程。

核心原则：

1. AI 不直接修改代码，必须经过 Spec 和 Task 阶段
2. AI 不自行理解整个仓库，必须通过项目上下文导航
3. AI 所有高风险操作必须经过人工确认
4. 所有 AI 行为必须可追踪、可审计

---

# 2. 总体流程

用户需求

↓

需求理解

↓

Project Map 领域定位

↓

加载项目 Agent.md

↓

选择 Workflow

↓

生成 OpenSpec

↓

人工确认 Spec

↓

Task 拆解

↓

AI Coding

↓

自动生成测试

↓

代码检查

↓

AI Code Review

↓

人工 Review

↓

测试环境发布

↓

验证

↓

生产发布
