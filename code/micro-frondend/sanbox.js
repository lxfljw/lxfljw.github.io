// const name = "lxfljw";

// // eval('console.log("eval","Hello", name)');

// // new Function("name", 'console.log("new Function", name)')("666");

// const parent = {
//   _name: "parent",
//   get name() {
//     return this._name;
//   },
// };

// const proxyParent = new Proxy(parent, {
//   get(target, key, receiver) {
//     // return target[key];
//     return Reflect.get(target, key, receiver);
//   },
//   set(target, key, value) {
//     target[key] = value;
//   },
// });

// const child = { _name: "child" };
// Object.setPrototypeOf(child, proxyParent);

// console.log(child.name); // "parent"

// const proxyWindow = new Proxy(window, {
//   get(target, key, receiver) {
//     if (key === "origin") {
//       return "对不起，你没有权限访问此属性:" + key;
//     }
//     return Reflect.get(target, key, receiver);
//   },
// });

// const code = `console.log( origin);`;

// function sanbox(code) {
//   return new Function(`with(proxyWindow){${code}}`);
// }

// sanbox(code)();

function createSanbox(code) {
  const whiteList = ["console"];
  const proxyWindow = new Proxy(window, {
    has(target, key) {
      if (whiteList.includes(key)) {
        return false;
      }
      return target.hasOwnProperty(key);
    },
    x,
  });

  return new Function("proxyWindow", `with(proxyWindow){${code}}`)(proxyWindow);
}
const code = `console.log(123);`;
const sanbox = createSanbox(code);
