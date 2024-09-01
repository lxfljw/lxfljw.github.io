let time = 0;
const interval = 1000;

setInterval(() => {
  time += interval;
  console.log("已过去了", time, "ms");
}, interval);

var p = function () {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("1000");
      resolve("p 需要resolve");
    }, 1000);
  });
};
var p1 = function () {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("2000");
      resolve();
    }, 2000);
  });
};
var p2 = function () {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("3000");
      resolve();
    }, 3000);
  });
};
var p3 = function () {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("4000");
      resolve();
    }, 4000);
  });
};

class Skeduler {
  constructor(max = 2) {
    this.max = max;
    // 并发池
    this.poolCount = [];
    // 任务队列
    this.taskList = [];
  }
  //插入任务队列
  add(task) {
    return new Promise((resolve) => {
      this.taskList.push({ task, resolve });
      this.run();
    });
  }
  get shouldRun() {
    return this.poolCount < this.max && this.taskList.length > 0;
  }
  // 任务调度
  // 1. 如果队列没有满 从任务队列拿出任务
  // 2.如果队列已满，等待后续任务执行调度
  run() {
    if (this.taskList.length <= 0) return;
    if (this.poolCount === this.max) return;
    while (this.shouldRun) {
      const { task, resolve } = this.taskList.shift();
      this.poolCount++;
      task().then((res) => {
        resolve(res);
        this.run();
        this.poolCount--;
      });
    }
  }
}

const skeduler = new Skeduler(4);

skeduler.add(p).then((res) => {
  console.log("p的结果", res, "当前时间", time);
});
skeduler.add(p1);
skeduler.add(p2);
skeduler.add(p3);
