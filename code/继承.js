// 继承
function extend(Father, Child) {
  return function (...args) {
    function F() {}
    F.prototype = Father.prototype;
    Child.prototype = new F();
    Child.prototype.contructor = Child;
    const child = new Child(...args);
    Father.apply(child, args);
    return child;
  };
}

function Father() {
  this.family = "ll";
}

Father.prototype.getFamily = function () {
  return this.family;
};

function Child() {
  this.name = "child";
}
