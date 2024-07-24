function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}

function sum(...args) {
  function fn(nums) {
    const pList = [];
    const len = nums.length;
    if (len === 0) return Promise.resolve(0);
    if (len === 1) return Promise.resolve(nums[0]);
    // return new Pro
    let i = 0;
    while (i < nums.length) {
      pList.push(
        new Promise((resolve) => {
          const next = typeof nums[i + 1] === "number" ? nums[i + 1] : 0;
          asyncAdd(nums[i], next, resolve);
        })
      );
      i += 2;
    }
    return Promise.all(pList).then((res) => {
      return fn(res);
    });
  }
  return fn(args);
}

sum(1, 2, 3, 4, 5).then((result) => console.log(result));
