// 十瓶药 有两瓶和其他八瓶不一样，只称一次找出来

function findDefferentDrug(num) {
  // 遍历,直到找到十个数，两两相加的结果答案唯一
  // 声明一个 Set，存放已有的数量的和
  // 声明一个数组，存放每瓶药需要拿的数量
  const sumSet = new Set();
  const countArr = [];

  let count = 1;

  while (countArr.length < num) {
    let j = countArr.length - 1;
    console.log("j", countArr);
    if (j === -1) {
      countArr.push(1);
      count++;
      continue;
    }
    let noRepeat = true;
    while (j >= 0) {
      if (sumSet.has(count + countArr[j--])) {
        noRepeat = false;
        break;
      }
    }
    if (noRepeat) {
      countArr.push(count);
      countArr.forEach((item) => {
        sumSet.add(item + count);
      });
    }
    count++;
  }
  return countArr;
}

console.log(findDefferentDrug(10, 2)); // 10
