/**
 *
 * @param {number} number
 */
function fn(number) {
  const str = number.toString();
  let splitStr = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (count === 3) {
      splitStr = "," + splitStr;
      count = 0;
    }
    splitStr = `${str[i]}${splitStr}`;
    count++;
  }
  return splitStr;
}

/**
 *
 * @param {number} number
 */
function fn1(number) {
  const str = number.toString();
  return str.replace(/\B(?=(\d{3})+)/g, ",");
}

/**
 *
 * @param {Record<string, any>} obj
 * @param {string|string[]} path
 * @param {any} defaultValue
 */
function get(obj, path, defaultValue) {
  let value = obj;
  // 处理字符串路径
  if (typeof path === "string") {
    const newPath = path.replace(/([^\.]+)\[([^\.]+)\]/g, "$1.$2");
    newPath.split(".").every((path) => {
      try {
        value = value[path];
        return true;
      } catch (e) {
        value = defaultValue;
        return false;
      }
    });
  }
  return value === undefined ? defaultValue : value;
}

const testObj = { a: [{ b: { c: "6" } }], d: { e: 90 } };

console.log("--1", get(testObj, "a[2].b.c", "818"));
// console.log("--2", get(testObj, "d.e"));
