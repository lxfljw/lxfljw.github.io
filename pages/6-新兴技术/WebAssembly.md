# WebAssembly

> 极简解释：JavaScript 开发者甚至可以把 WebAssembly 想象成一个高效地生成高性能函数的 JavaScript 特性


将来，WebAssembly 模块将会像 ES 模块那样加载（使用 `<script type='module'>`），这也就意味着 JavaScript 代码能够像轻松地使用一个 ES 模块那样来获取、编译和导入一个 WebAssembly 模块。


WebAssembly 生态系统处在初始阶段；更多的工具会毫无疑问得不断出现。当前，有四个主要的着手点：

- 使用 Emscripten 移植一个 C/C++ 应用程序。
- 直接在汇编层，编写或生成 WebAssembly 代码。
- 编写 Rust 程序，将 WebAssembly 作为它的输出。
- 使用 AssemblyScript，它类似于 TypeScript 并且可编译成二进制 WebAssembly 代码。

对于前端来说，WebAssembly 是一个有潜力的技术，它将会带来更快、更小的体积、更高的性能。


**WebAssembly 示例（使用 Rust 编写）**

WebAssembly 是一种低级别的二进制指令格式，通常使用其他高级语言（如 Rust、C、C++）编写代码，然后编译为 WebAssembly。以下是一个用 Rust 编写的 WebAssembly 示例：


```rust
// Rust: Add two numbers
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

```

编译生成 WebAssembly 文件并通过 JavaScript 调用：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WebAssembly with Rust</title>
</head>
<body>
    <h1>WebAssembly with Rust</h1>
    <script type="module">
        import init, { add } from './hello_wasm.js';

        async function run() {
            // 初始化 WebAssembly 模块
            await init();
            
            // 调用导出的 WebAssembly 函数
            console.log(add(2, 3)); // 输出 5
        }

        run();
    </script>
</body>
</html>
```