function getFPS(targetCount = 5) {
  const startTime = performance.now();
  let count = targetCount;
  return new Promise((resolve) => {
    (function fps() {
      requestAnimationFrame(() => {
        count--;
        console.log(performance.now() - startTime);
        if (count === 0) {
          resolve(targetCount / ((performance.now() - startTime) / 1000));
          return;
        }
        fps();
      });
    })();
  });
}
getFPS().then(console.log);
