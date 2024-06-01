# 一、单例模式
单例模式指的是无论调用多少次生成函数，都只会返回相同的实例。在这之前，你需要对闭包有些许了解.

假设我们需要创建一个可复用的弹窗，一旦有了这个弹窗，就不再重复创建 div，大概逻辑如下：

```js
let temp = null; // 单例模式的关键变量
function Modal() {
  // 如果有缓存 直接返回缓存内容
  if (temp) {
    return temp;
  }
  return (temp = document.createElement("div"));
}
```

上面的代码非常的简单，仅仅是使用一个 `temp` 变量缓存了 div 这个节点，一旦创建过就不会重复创建，这就是单例模式的核心原理：缓存。接下来让我们完善这个功能：

```js
let temp = null; // 缓存变量 用于缓存稍后创建的弹窗
/**
 * 创建弹窗函数
 * @param {弹窗内容} modalContent
 */
function Modal(modalContent) {
  // 如果有缓存 直接返回缓存内容
  if (temp) {
    temp.innerHTML = modalContent;
    return temp;
  }
  const body = document.querySelector("body"); // 如果没有创建新的弹窗
  const div = document.createElement("div");
  div.innerHTML = modalContent;
  body.appendChild(div);
  return (temp = div);
}
```

现在我们来使用这个弹窗函数：

```js
const modal1 = Modal("modal1"); // 第一次执行由于没有缓存，会执行后面的创建过程
const modal2 = Modal("modal2"); // 第二次有了缓存，直接返回了temp 正是第一次创建好的temp
modal1 === modal12; // 结果是 true
```

到此为止单例模式的核心已经讲完了，有项目经验的同学肯定发现了 `temp` 是一个外部变量，会污染命名空间，我们需要使用闭包的方式创建缓存变量，闭包可以简单解释为是函数创建的变量环境，属于函数上下文，作用是不会污染全局上下文。

现在我们对上述例子进行改造：
其实除了使用 `IIFE` 立即执行函数创建闭包变量以外，没有什么其他的不同，但是这个例子仍不是完美的，看完示例代码你可以自己思考一分钟，答案会在后面揭晓。

```js
var Modal = (function (modalContent) {
  let temp = null; // 缓存变量 用于缓存稍后创建的弹窗
  return function () {
    // 如果有缓存 直接返回缓存内容
    if (temp) {
      temp.innerHTML = modalContent;
      return temp;
    }
    const body = document.querySelector("body"); // 如果没有创建新的弹窗
    const div = document.createElement("div");
    div.innerHTML = modalContent;
    body.appendChild(div);
    return (temp = div);
  };
})();
```

上述例子到底有什么缺陷呢，假如我今天需要复用弹窗，明天需要复用其他的东西，就不得不再次为某个具体的业务创造单例模式，那么我们在单例模式使用到达一定数量的时候，就需要考虑使用工厂函数：

```js
/** 单例工厂函数 */
function SingletonbFactory(Fn) {
  let instance = null; // 实例缓存
  return function () {
    if (instance) return instance; // 如果有直接返回
    return (instance = new Fn(arguments));
  };
}

function Modal(modalContent) {
  const body = document.querySelector("body"); // 如果没有创建新的弹窗
  const div = document.createElement("div");
  div.innerHTML = modalContent;
  body.appendChild(div);
  return div;
}

const SingleModal = SingletonFactory(Modal); // 工厂函数包装需要作为单例的函数

const modal1 = SingleModal("modal1"); // 弹窗命名为 modal1
const modal2 = SingleModal("modal2"); // 弹窗命名为 modal2

modal1 === modal1; // true
```

可能你会好奇，为什么要这么设计，这不是增加了理解难度吗？是的，这会增加代码的复杂度，万事都是有两面性的，使用设计模式需要学习成本。但是这在大型项目中是非常有价值的，以来这种方式符合函数式编程的理念，专业术语叫做 `AOP` （面向切面编程）。这样做的价值在于把函数指责分开了，单例的工厂函数只负责缓存责任，实现具体业务的函数则不去负责这个事情，遵循函数单一职责原则。
