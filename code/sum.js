function getSum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}
function sum(...args) {
  let res = getSum(args);
  function fn(...args1) {
    res += getSum(args1);
    return fn;
  }
  fn.toString = () => res;
  fn.exec = () => res;
  return fn;
}

console.log(sum(3)(2)(3));
