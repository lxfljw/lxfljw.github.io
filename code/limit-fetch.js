// 2 为并发最大数
const limit = pLimit(2);
const inputs = [
  limit(() => fetchSomething(1000), "param1"),
  limit(() => fetchSomething(2000), "param2"),
  limit(() => fetchSomething(3000), "param3"),
];
function fetchSomething(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
const time = Date.now();
Promise.all(inputs).then((results) => {
  console.log(results);
  console.log(Date.now() - time); // 需要打印为 4s。（解释：因为并发数限制为2，第一个和第二个请求并发进行，第三个等待，第一个结束后开始第三个请求。总体时间为4s）
});

// 实现 pLimit 函数？
function pLimit(limit) {
  let count = 0;
  const list = [];
  function schedule() {
    if (count < limit && list.length > 0) {
      const { cb, resolve, reject, args } = list.shift();
      count++;
      cb(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          count--;
          schedule();
        });
    }
  }
  return function (cb, ...args) {
    return new Promise((resolve, reject) => {
      list.push({ cb, args, resolve, reject });
      schedule();
    });
  };
}
