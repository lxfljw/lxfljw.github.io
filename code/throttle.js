/**
 *
 * @param {(...args: any[]) => any} fn 执行函数
 * @param {number} wait  等待时间
 * @param {boolean} tail 最后一次是否触发
 */
function throttle(fn, wait = 500, tail = false) {
  let timer = null;
  let preTriggerTime = 0;
  return function (...args) {
    const ctx = this;

    // console.log(wait, timer);
    const remaining = wait - (Date.now() - preTriggerTime);
    if (remaining <= 0) {
      console.log("立即触发");
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // 立即触发
      fn.apply(ctx, args);
      preTriggerTime = Date.now();
    } else {
      if (timer) return;
      timer = setTimeout(() => {
        fn.apply(ctx, args);
        timer = null;
        preTriggerTime = Date.now();
      }, remaining);
    }
  };
}

function move(time) {
  console.log("1111", time);
}

const throttleMove = throttle(move, 2000);

let pre = Date.now();
setInterval(() => {
  const time = Date.now() - pre;
  pre = Date.now();
  throttleMove(time);
}, 300);
