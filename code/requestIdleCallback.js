(function () {
  let frameEndTime;
  let penddingCallback;

  // 获取此帧绘制完成的时机，MessageChannel

  const channel = new MessageChannel();

  requestIdleCallback = function (callback) {
    penddingCallback = callback;
    // rafTime requestAnimationFrame 回调执行的时间，说明本帧开始绘制
    requestAnimationFrame((rafTime) => {
      // 假设 需要 16.6ms 绘制完这一帧，那么预计绘制完成的时间是
      frameEndTime = rafTime + 16.6;
      channel.port1.postMessage("raf cb execute");
    });
  };

  channel.port2.onmessage = () => {
    // requestAnimation 执行结束时机
    // 当前帧可用时间
    const time = timeRemaining();
    console.log(time);
    // 如果有剩余时间
    if (time > 0) {
      penddingCallback &&
        penddingCallback({
          timeRemaining,
          // 肯定没有超时
          didTimeout: false,
        });
    } else {
      // 简单处理 转移到下一帧处理
      requestIdleCallback(penddingCallback);
    }
  };

  function timeRemaining() {
    return frameEndTime - performance.now();
  }
})();

requestIdleCallback(() => {
  console.log("??");
});
