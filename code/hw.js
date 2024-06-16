const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

async function fn1() {
  /**
   *
   * @param {number} emptyCount
   */
  function getGapWater(emptyCount, fullCount = 0) {
    if (emptyCount < 2) return fullCount;
    const rest = emptyCount % 3;
    const currentCount = parseInt(emptyCount / 3);
    if (rest + currentCount === 2) return currentCount + fullCount + 1;
    return getGapWater(rest + currentCount, fullCount + currentCount);
  }

  while ((line = await readline())) {
    if (line == 0) break;
    console.log(getGapWater(line));
  }
}
async function fn2() {
  // Write your code here
  let nums = [];
  while ((line = await readline())) {
    nums.push(Number(line));
  }
  nums.shift();
  nums = nums.reduce((unRepeatNums, num) => {
    if (unRepeatNums.length === 0) {
      unRepeatNums.push(num);
      return unRepeatNums;
    }
    if (!unRepeatNums.includes(num)) {
      // unRepeatNums.push(num);
      let start = 0;
      let end = unRepeatNums.length - 1;
      let mid = (start + end) >> 1;
      while (start <= end) {
        mid = (start + end) >> 1;
        if (unRepeatNums[mid] > num) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
      // let i = 0;
      // for (; i < unRepeatNums.length; i++) {
      //   if (unRepeatNums[i] > num) {
      //     i;
      //     break;
      //   }
      // }
      unRepeatNums.splice(start + 1, 0, num);
    }
    return unRepeatNums;
  }, []);
  for (const num of nums) {
    console.log(num);
  }
}

async function fn3() {
  const changeMap = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };
  while ((line = await readline())) {
    let count = 0;
    currentTime = 1;
    for (let i = line.length - 1; i >= 2; i--) {
      count += Number(changeMap[line[i]] || line[i]) * currentTime;
      currentTime = currentTime * 16;
    }
    console.log(count);
  }
}

async function a() {
  // Write your code here
  let nums = [];
  while ((line = await readline())) {
    nums.push(Number(line));
  }
  nums.shift();
  nums = nums.reduce((unRepeatNums, num) => {
    if (unRepeatNums.length === 0) {
      unRepeatNums.push(num);
      return unRepeatNums;
    }
    if (!unRepeatNums.includes(num)) {
      // unRepeatNums.push(num);
      let i = 0;
      for (; i < unRepeatNums.length; i++) {
        if (unRepeatNums[i] > num) {
          break;
        }
      }

      unRepeatNums.splice(i, 0, num);
    }
    return unRepeatNums;
  }, []);
  for (const num of nums) {
    console.log(num);
  }
}

async function ss() {
  // Write your code here
  while ((line = await readline())) {
    const countMap = new Map();
    // 获取各个字符串的计数
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!countMap.has(char)) {
        countMap.set(char, 1);
      } else {
        countMap.set(char, countMap.get(char) + 1);
      }
    }
    // 找出最小的那个 迭代 Map
    const entries = Array.from(countMap.entries()).sort((a, b) => a[1] - b[1]);
    // 有重复
    const [_, minCount] = entries[0];
    for (const entry of entries) {
      if (entry[1] === minCount) {
        line = line.replace(new RegExp(entry[0], "g"), "");
        continue;
      }
      break;
    }
    console.log(line);
  }
}
