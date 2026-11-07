# 企业级 ChatBI 系统设计方案

## AI 智能报表

## 1. 背景

传统 BI 系统通常需要业务人员提前学习：

- 数据库表结构
- 指标口径
- SQL 查询方式
- BI 工具操作流程

业务人员提出一个简单问题：

> 最近一个月会员增长趋势怎么样？

往往需要数据分析师介入，手动确认：

- 使用哪张表
- 哪个字段代表会员
- 时间范围如何计算
- 是否需要过滤无效数据

ChatBI 的目标是通过大模型 + Agent，让用户通过自然语言直接获取业务分析结果。

---

# 2. 整体架构

整体流程：

```
用户自然语言输入

        ↓

意图识别

        ↓

Agent

        ↓

Skill选择

        ↓

指标层 Semantic Layer

        ↓

RAG 检索业务知识

        ↓

Text2SQL

        ↓

SQL安全校验

        ↓

QA环境验证

        ↓

执行查询

        ↓

数据分析与可视化
```

---

# 3. 核心模块设计

## 3.1 Agent

Agent 负责整体任务编排。

主要职责：

- 理解用户问题
- 判断任务类型
- 选择对应 Skill
- 调用数据查询工具
- 组织最终结果

例如：

用户：

> 查询最近三个月会员增长趋势

Agent 判断：

```
问题类型：
会员分析


选择：

member-analysis Skill


调用：

会员增长指标查询工具
```

---

# 4. Skill 设计

## 4.1 为什么需要 Skill

不能把所有业务知识全部交给一个 Agent。

原因：

- 业务领域复杂
- Prompt过大
- 容易产生错误理解
- 不同业务指标口径不同

所以按照领域拆分 Skill。

例如：

## 销售分析 Skill

负责：

- 销售额
- 订单数量
- 客单价
- 同比环比

## 会员分析 Skill

负责：

- 新增会员
- 活跃会员
- 会员等级
- 留存率

## 库存分析 Skill

负责：

- 库存数量
- 周转率
- 缺货率

---

# 5. 指标层 Semantic Layer

## 5.1 为什么需要指标层

大模型无法直接理解数据库字段含义。

例如：

用户说：

> 销售额

数据库可能存在：

```
order.amount

payment.amount

refund.amount
```

模型无法判断：

哪个字段才是真正销售额。

所以需要指标层定义业务语义。

---

## 5.2 指标定义示例

销售额：

```json
{
  "metric": "销售额",
  "description": "已支付订单金额",
  "table": "order",
  "field": "pay_amount",
  "condition": "status='PAID'",
  "time_field": "pay_time"
}
```

会员增长：

```json
{
  "metric": "新增会员",
  "table": "member",
  "field": "id",
  "aggregation": "count",
  "time_field": "create_time"
}
```

---

# 6. RAG知识库设计

ChatBI 中 RAG 不只是存表结构。

需要包含：

## 6.1 数据库 Schema

例如：

```
user_member

字段：

id
tenant_id
create_time
level
status
```

---

## 6.2 字段业务解释

例如：

```
pay_amount:

含义：
用户实际支付金额

注意：
不包含退款金额
```

---

## 6.3 指标定义

例如：

```
销售额：

= 已支付订单金额

过滤条件：

status=PAID
```

---

## 6.4 SQL 示例

例如：

问题：

```
查询本月销售额
```

标准 SQL：

```sql
select sum(pay_amount)
from orders
where status='PAID'
and pay_time >= 月初
```

---

## 6.5 权限规则

例如：

租户隔离：

```
所有查询必须包含：

tenant_id = 当前租户
```

---

# 7. Text2SQL流程

流程：

```
用户问题

↓

Agent理解意图

↓

查询相关Skill

↓

检索指标定义

↓

获取相关Schema

↓

生成SQL

↓

SQL安全检查

↓

执行
```

---

# 8. SQL安全治理

AI生成SQL不能直接执行。

需要经过安全层。

## 8.1 SQL Parser解析

检查：

禁止：

```sql
DELETE

UPDATE

DROP

ALTER
```

只允许：

```sql
SELECT
```

---

## 8.2 表权限控制

例如：

允许：

```
orders
member
product
```

禁止：

```
user_password
payment_secret
```

---

## 8.3 字段权限控制

例如：

允许：

```
order_amount
create_time
```

禁止：

```
身份证号
手机号
银行卡
```

---

## 8.4 查询限制

防止：

```sql
select *
from huge_table
```

限制：

- 最大返回数量
- 最大执行时间
- 最大扫描数据量

---

# 9. SQL执行验证

生成SQL后，不直接访问生产。

流程：

```
生成SQL

↓

QA环境执行

↓

检查执行结果

↓

检查执行耗时

↓

通过后执行生产
```

---

# 10. AI准确性评估体系

## 10.1 SQL正确率

判断：

- SQL是否执行成功
- 是否符合规范
- 是否访问正确表

---

## 10.2 指标匹配率

判断：

用户：

> 销售额

是否正确映射：

```
销售额

↓

order.pay_amount
```

---

## 10.3 Golden SQL评估

建立标准测试集。

例如：

问题：

```
查询本月销售额
```

标准答案：

```sql
select sum(pay_amount)
from order
where status='PAID'
```

AI生成结果与标准结果比较。

---

## 10.4 用户反馈

记录：

```
问题

↓

生成SQL

↓

查询结果

↓

用户评价
```

用于：

- Prompt优化
- Skill优化
- 知识库优化

**ChatBI 本质不是简单的 Text2SQL，而是通过 Agent 负责任务编排，通过 Skill 做领域路由，通过 Semantic Layer 固化业务指标口径，再结合 RAG 提供 Schema、正反 SQL案例和业务规则，生成 SQL 后经过 SQL 安全校验和数据权限校验，最后执行查询，并通过自动评分、用户反馈和 Agent 日志形成持续优化闭环。**

---
