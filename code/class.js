var a = "global";
const fn = function () {
  console.log(this.a);
};

const obj = {
  a: "obj",
  fn: function () {
    fn();
  },
};

obj.fn2 = fn;
// obj.fn(); // 1

obj.fn2();
