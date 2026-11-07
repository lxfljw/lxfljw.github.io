# Spring Boot 启动流程

## 1. 整体流程

Spring Boot 启动大致流程：

```
main方法
    |
    ↓
SpringApplication.run()
    |
    ↓
创建 SpringApplication
    |
    ↓
加载配置 Environment
    |
    ↓
创建 ApplicationContext
    |
    ↓
扫描 BeanDefinition
    |
    ↓
实例化 Bean
    |
    ↓
依赖注入
    |
    ↓
Bean 初始化
    |
    ↓
启动 Tomcat
    |
    ↓
注册 Controller
    |
    ↓
应用启动完成
```

---

# 2. 启动入口

Spring Boot 项目入口：

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

核心：

```java
SpringApplication.run()
```

作用：

- 创建 Spring 容器
- 加载项目配置
- 创建 Bean
- 启动 Web 服务

---

# 3. 创建 SpringApplication

执行：

```java
new SpringApplication(Application.class)
```

主要做两个事情：

## 3.1 判断应用类型

Spring Boot 根据项目依赖判断类型。

例如：

引入：

```xml
spring-boot-starter-web
```

判断为：

```
Servlet Web Application
```

启动：

```
内置 Tomcat
```

---

## 3.2 加载初始化组件

加载：

- ApplicationContextInitializer
- ApplicationListener

用于监听 Spring Boot 启动过程。

---

# 4. 加载配置 Environment

Spring Boot 会创建：

```
Environment
```

可以理解为：

> Spring Boot 统一管理配置的地方。

配置来源：

## 4.1 application.yml

例如：

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost/test
```

## 4.2 application.properties

```properties
server.port=8080
```

## 4.3 环境变量

例如：

```bash
DB_HOST=mysql
```

## 4.4 JVM参数

例如：

```bash
-Dserver.port=9000
```

最终：

所有配置合并到：

```
Environment
```

其他 Bean 可以读取：

```java
@Value("${server.port}")
private String port;
```

---

# 5. 创建 ApplicationContext

Spring 创建 IOC 容器：

```
ApplicationContext
```

作用：

管理所有 Bean。

负责：

- Bean 注册
- Bean 创建
- 依赖注入
- 生命周期管理

---

# 6. 扫描 BeanDefinition

Spring 扫描：

```
@Component
@Service
@Repository
@Controller
@Configuration
```

例如：

```java
@Service
public class UserService {

}
```

Spring 不会马上：

```java
new UserService()
```

而是先生成：

```
BeanDefinition
```

---

# 7. 什么是 BeanDefinition

BeanDefinition：

> Bean 的定义信息。

里面包含：

```
Bean名称

Class类型

作用域

依赖关系

初始化方法
```

例如：

```java
@Service
public class UserService {

}
```

扫描后：

```
UserService.class

↓

BeanDefinition

↓

注册到 IOC 容器
```

---

# 8. Bean 实例化

BeanDefinition 注册完成后：

Spring 创建对象。

例如：

```java
@Service
public class UserService {

}
```

执行：

```java
new UserService()
```

生成：

```
UserService对象
```

---

# 9. 依赖注入

例如：

```java
@Service
public class UserService {


@Autowired
private UserMapper userMapper;


}
```

Spring发现：

UserService依赖：

```
UserMapper
```

然后：

```
从IOC容器查找 UserMapper Bean

↓

注入 UserService
```

---

# 10. Bean 初始化

Bean 创建完成后，会执行初始化。

例如：

## @PostConstruct

```java
@PostConstruct
public void init(){

}
```

执行初始化逻辑。

---

## BeanPostProcessor

Bean 初始化前后执行：

```
BeforeInitialization

↓

初始化

↓

AfterInitialization
```

Spring AOP 基于这个扩展点实现。

---

# 11. 自动配置

Spring Boot 核心：

```
@EnableAutoConfiguration
```

根据项目依赖自动创建 Bean。

例如：

引入：

```
spring-boot-starter-data-redis
```

自动创建：

```
RedisTemplate Bean
```

引入：

```
spring-boot-starter-jdbc
```

自动创建：

```
DataSource Bean
```

---

# 12. 启动 Tomcat

Web 项目启动：

```
Embedded Tomcat
```

流程：

```
创建Tomcat

↓

绑定端口

↓

初始化Servlet

↓

启动服务
```

启动日志：

```
Tomcat started on port 8080
```

---

# 13. Controller 注册

例如：

```java
@RestController
@RequestMapping("/user")
public class UserController {


@GetMapping
public User get(){

}

}
```

Spring扫描：

```
UserController
```

注册：

```
GET /user

↓

UserController.get()
```

底层维护：

```
HandlerMapping
```

保存：

```
请求路径

↓

Controller方法
```

---

# 14. 请求执行流程

用户请求：

```
GET /user
```

流程：

```
Tomcat

↓

DispatcherServlet

↓

HandlerMapping

↓

Controller

↓

Service

↓

DAO

↓

MySQL

↓

返回结果
```

---

# 15. 面试回答版本

Spring Boot启动时，首先执行SpringApplication.run创建应用上下文，然后加载application.yml、环境变量等配置生成Environment。

之后创建ApplicationContext，通过@SpringBootApplication中的@ComponentScan扫描项目中的组件，将@Service、@Controller等生成BeanDefinition注册到IOC容器。

随后Spring根据BeanDefinition实例化Bean，完成依赖注入和初始化。

最后启动内置Tomcat，并注册Controller请求映射，使应用可以接收HTTP请求。

---

# 核心知识点

## 必须掌握

- SpringApplication
- Environment
- ApplicationContext
- BeanDefinition
- IOC
- DI
- 自动配置
- Tomcat启动

## 面试重点

1. 扫描到@Service不是立即创建对象

2. 先生成BeanDefinition

3. 再实例化Bean

4. 再依赖注入

5. 再初始化

6. 最后启动Web服务
