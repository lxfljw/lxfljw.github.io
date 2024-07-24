# SWC

## 什么是SWC？

swc 是一款基于 Rust 语言的开源的 JavaScript 编译器，它可以将 ES6+ 代码编译成 ES5 代码，并在编译过程中优化代码，提高运行效率。

## 为什么要使用 SWC？ 

- 执行效率：SWC 编译后的代码比 Babel 编译后的代码更快，因为它使用 Rust 编写，可以提高编译效率。
- 能兼容 Babel 大部分功能


## 安装

```bash
pnpm i swc --save-dev
```

## 配置

在项目根目录下创建 `.swcrc` 文件，并配置编译选项：

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "jsx": true
    },
    "transform": {
      "optimizer": {
        "globals": {
          "vars": {
            "process.env.NODE_ENV": "production"
          }
        }
      }
    }
  }
}
```

