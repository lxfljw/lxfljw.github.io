# Spring Boot 事务详解

## 1. 什么是事务

事务（Transaction）是一组数据库操作的执行单元。

事务需要保证 ACID：

- Atomicity（原子性）
- Consistency（一致性）
- Isolation（隔离性）
- Durability（持久性）

例如订单创建流程：

```
创建订单
    ↓
扣减库存
    ↓
扣除余额
```

如果扣余额失败：

```
订单创建回滚
库存扣减回滚
```

保证数据一致性。

---

# 2. Spring Boot 为什么需要事务

数据库本身支持事务：

```sql
BEGIN;

UPDATE order;

UPDATE stock;

COMMIT;
```

但是业务代码中，如果每个地方都手动控制：

- 开启事务
- 提交事务
- 回滚事务

代码会非常复杂。

Spring 提供：

```java
@Transactional
```

帮助我们自动管理事务。

---

# 3. Spring 事务实现原理

Spring 事务核心：

```
AOP
+
代理模式
+
TransactionInterceptor
```

Spring 并不是扫描 SQL 自动开启事务。

而是：

在调用业务方法之前，通过代理对象拦截方法调用：

```
Controller

↓

Service代理对象

↓

开启数据库事务

↓

执行真实Service方法

↓

执行SQL

↓

commit / rollback
```

---

# 4. @Transactional 执行流程

例如：

```java
@Service
public class OrderService {


    @Transactional
    public void createOrder(){

        orderMapper.insert();

    }

}
```

Spring 启动时：

扫描：

```java
@Transactional
```

发现：

```java
createOrder()
```

需要事务。

然后创建代理对象：

```
OrderService

↓

OrderServiceProxy
```

调用：

```java
orderService.createOrder();
```

实际执行：

```
调用代理对象

↓

TransactionInterceptor拦截

↓

开启事务

↓

调用真实createOrder()

↓

执行SQL

↓

成功 commit

↓

异常 rollback
```

---

# 5. Spring 事务核心组件

## TransactionInterceptor

事务拦截器。

负责：

- 创建事务
- 提交事务
- 回滚事务

执行流程：

```
before

↓

开启事务

↓

执行目标方法

↓

after

↓

提交事务
```

异常：

```
exception

↓

rollback
```

---

# 6. @Transactional 默认回滚规则

默认情况下：

会回滚：

```
RuntimeException
Error
```

例如：

```java
@Transactional
public void pay(){

    updateMoney();

    throw new RuntimeException();

}
```

执行：

```
updateMoney()

↓

RuntimeException

↓

rollback
```

---

## Checked Exception

例如：

```java
@Transactional
public void test()
throws Exception{

}
```

默认：

不会回滚。

需要：

```java
@Transactional(
    rollbackFor = Exception.class
)
```

指定异常回滚。

---

# 7. Spring 事务失效场景

## 7.1 异常被 catch

错误：

```java
@Transactional
public void save(){

    try{

        insert();

    }catch(Exception e){

    }

}
```

执行过程：

```
insert()

↓

发生异常

↓

被catch

↓

方法正常结束

↓

Spring认为成功

↓

commit
```

解决：

重新抛异常：

```java
catch(Exception e){

    throw e;

}
```

或者：

```java
TransactionAspectSupport
.currentTransactionStatus()
.setRollbackOnly();
```

---

# 7.2 同类方法自调用

代码：

```java
@Service
public class UserService {


    public void a(){

        this.b();

    }


    @Transactional
    public void b(){

    }

}
```

调用：

```
a()

↓

this.b()

↓

直接调用真实对象
```

没有经过：

```
代理对象
```

所以：

```
@Transactional 不生效
```

解决：

拆分 Service：

```
UserService

↓

OrderService
```

通过 Spring Bean 调用。

---

# 7.3 方法不是 public

Spring 事务基于代理。

通常：

```java
@Transactional
public void save(){

}
```

有效。

但是：

```java
@Transactional
private void save(){

}
```

可能不会生效。

---

# 8. Spring 事务传播机制

事务传播解决：

> 一个事务方法调用另一个事务方法时，两个事务如何关联。

例如：

```
方法A

↓

方法B
```

A 和 B：

- 共用一个事务？
- 创建新事务？
- 不使用事务？

由传播机制决定。

---

# 9. REQUIRED（默认）

含义：

```
存在事务：

加入当前事务


不存在事务：

创建新事务
```

例如：

```
A开启事务

↓

调用B

↓

B加入A事务
```

结果：

```
A成功+B成功

一起提交


A失败/B失败

一起回滚
```

使用场景：

大部分业务默认选择。

---

# 10. REQUIRES_NEW

含义：

```
永远创建新的事务
```

执行：

```
A事务

↓

暂停A

↓

创建B事务

↓

B提交

↓

恢复A
```

场景：

例如记录操作日志：

订单失败：

但是日志必须保存。

---

# 11. SUPPORTS

含义：

```
有事务：

加入事务


没有事务：

普通执行
```

---

# 12. MANDATORY

含义：

必须存在事务。

如果没有：

直接异常。

---

# 13. NOT_SUPPORTED

含义：

不支持事务。

如果当前存在事务：

暂停当前事务。

---

# 14. NEVER

含义：

必须没有事务。

如果存在事务：

报错。

---

# 15. NESTED

嵌套事务。

基于数据库：

```
SavePoint
```

例如：

```
事务A

↓

事务B

↓

B失败

↓

回滚B

↓

A继续执行
```

---

# 16. Spring事务和数据库事务区别

数据库事务：

```
MySQL层面的事务
```

例如：

```sql
BEGIN;

UPDATE;

COMMIT;
```

Spring事务：

```
代码层事务管理
```

通过：

```
@Transactional
```

控制数据库事务。

---

# 17. Spring事务无法解决的问题

Spring事务只能管理：

```
一个服务

一个数据库
```

例如：

订单服务：

```
Order MySQL
```

库存服务：

```
Stock MySQL
```

调用：

```
订单服务

↓

库存服务
```

如果：

```
库存扣减成功

↓

订单创建失败
```

Spring事务无法自动回滚库存。

原因：

- 不同 JVM
- 不同数据库连接
- 不同事务上下文

---

# 18. 分布式事务解决方案

## 18.1 MQ最终一致性

流程：

```
创建订单

↓

发送MQ消息

↓

库存服务消费

↓

扣减库存

↓

更新订单状态
```

失败：

```
消息重试
```

---

## 18.2 补偿机制

建立：

```
失败任务表
```

例如：

```
task_id
business_id
status
retry_count
error_message
```

定时任务：

```
扫描失败任务

↓

重新执行

↓

更新状态
```

---

## 18.3 Seata

通过：

```
事务协调器
```

管理多个服务事务。

---

# 19. 面试回答模板

Spring事务主要基于AOP代理实现。

Spring启动时扫描@Transactional注解，为目标Bean创建代理对象。

当调用事务方法时，会先进入代理，通过TransactionInterceptor开启数据库事务，然后执行真实业务方法。

执行成功提交事务，发生异常根据规则进行回滚。

默认RuntimeException和Error会触发回滚，Checked Exception需要通过rollbackFor指定。

常见事务失效原因：

1. 异常被catch导致Spring无法感知
2. 同类方法自调用没有经过代理
3. 方法不是public

另外Spring事务只能解决单服务数据库事务，跨服务场景需要通过MQ最终一致性、补偿机制或者分布式事务框架解决。

---

# 核心关键词

- @Transactional
- AOP
- 动态代理
- TransactionInterceptor
- commit
- rollback
- rollbackFor
- REQUIRED
- REQUIRES_NEW
- 分布式事务
- MQ最终一致性
- 补偿机制
