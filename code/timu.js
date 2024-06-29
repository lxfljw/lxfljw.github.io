Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]();
};

// 面试题：如何结构？
const [a, b] = { a: 1, b: 2 };

console.log(a, b); // 1,2
