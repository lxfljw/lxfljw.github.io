# 二、策略模式

笔者使用过的设计模式中，策略模式是常用的模式并且非常的实用。举一个小例子你可能会恍然大悟，原来你一直在用，只不过不知道它叫`策略模式`，策略模式用在那些代码结构相似但是内部逻辑不相同的场景。

<br>

现在有一个需求，要你在页面上展示今天是星期几，你会怎么做？可以试着给自己一分钟思考；时间到，第一点，我们要知道 `JavaScript` 的日期实例 `new Date().getDay()` 能够返回今天星期几的数字，`0` 代表星期天，`1` 代表星期一,`2` 代表星期二 ... 以此类推。假设我们不知道什么设计模式，代码雏形应该是这样的：

```js

function getDayDesc(day) {
  switch (day) {
    case 0:
      return '星期天'
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
  }
}

console.log('今天是', getDayDesc(new Date().getDay()));

```

一般来说这是大部人第一时间想到的方案，确实也是可以实现功能的，但是一眼看去，似乎重复的部分有点多，并且我要修改`星期一`为`周一`，就要改动函数，这违反了函数的设计规则：开放封闭原则。开放封闭原则指的是对函数的扩展开发，对修改封闭，不允许修改已有的逻辑。策略模式用的最多的就是对象，我们尝试用对象封装这个策略：

```js
const daysObj = {
  0: '星期天',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}
function getDayDesc(day, strategyObj) {
  return strategyObj[day]
}
console.log('今天是', getDayDesc(new Date().getDay(), daysObj));
```
上面的代码看起来有点奇怪，怪在下标是数字，因此可以用数组来表达：

```js

const daysSet = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]
function getDayDesc(day, strategyObj) {
  return strategyObj[day]
}
console.log('今天是', getDayDesc(new Date().getDay(), daysSet));
```

假设哪天产品要求你把星期改为周，你只需如下改动并且能长久复用：

```js
const daysSet = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]
function getDayDesc(day, strategyObj) {
  return strategyObj[day]
}
console.log('今天是', getDayDesc(new Date().getDay(), daysSet));
```
我们没有动函数的内部功能，不需要担心其他使用 `getDayDesc` 的人会有问题。

现在假设有更复杂的，周一我要提醒大家需要升国旗并且要调用接口下发通知，那么现在的功能就变得有点不适用了，我们策略只返回了 string 类型，无法做到更多的事，我们需要修改为兼容函数类型：

```js
const daysObj = {
  0: '周日',
  1: () => {
      ajax('/notice')
      return '今天周一，早上要升国旗'
  },
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
}
function getDayDesc(day, strategyObj) {
  const strategy = strategyObj[day]
  if (typeof strategy === 'function') {
    return strategy()
  }
  return strategy
}
console.log('今天是', getDayDesc(new Date().getDay(), daysObj));

```

兼容了函数类型，使得我们的策略模式非常的灵活并且这个函数是不会轻易被修改的。

到这里这算是一个非常完整的策略模式改造，这里有个细节是我重新加上了key，方便全是函数的时候作区分。你如果配置过 loader， 一定也能发现很多loader即支持字符串也支持函数，背后的设计大概也是这个样子。
大家日常开发一定经常用这个设计模式，，本章的例子策略是固定七个，但是业务中常常需要扩展非常多的功能，这时候策略模式的威力才真正得以展现。下一章，我们说说 `代理模式`。

### 小试牛刀
假设公司的绩效等级分为 A，B，C，D，E 年终奖对应的绩点为 2，1.8，1.5，1.1，0.8。假设年终基数为 base，年终奖为：年终基数 * 绩点。已知绩效等级，求员工的年终奖，答案将在下一章揭晓。