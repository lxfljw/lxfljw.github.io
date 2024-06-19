Function.prototype.myCall = function (ctx, ...args) {
  if (!ctx) return this();
  const __fn__ = Symbol("fn");
  ctx[__fn__] = this;
  return ctx[__fn__](...args);
};

Function.prototype.myBind = function (ctx, ...args) {
  if (!ctx || !(ctx instanceof Object)) {
    return function (...restArgs) {
      return this(...restArgs);
    };
  }
  function NOOP() {}
  // 原型链继承
  const __fn__ = Symbol("fn");
  ctx[__fn__] = this;
  function FBind(...restArgs) {
    return ctx[__fn__](...restArgs);
  }
  NOOP.prototype = this.prototype;
  FBind.prototype = new NOOP();
  return FBind;
};
