//  ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']

function compareFn(a, b) {
  var aArr = a.split(".");
  var bArr = b.split(".");
  var len = Math.max(aArr.length, bArr.length);
  // 从第一位开始比较
  for (let i = 0; i < len; i++) {
    const numA = parseInt(aArr[i]) || 0;
    const numB = parseInt(bArr[i]) || 0;
    if (numA === numB) {
      continue;
    }
    return numA > numB ? 1 : -1;
  }
}

function compareVersion(versions) {
  return versions.sort(compareFn);
}

console.log(
  compareVersion(["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"])
);
