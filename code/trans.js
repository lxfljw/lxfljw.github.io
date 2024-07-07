const num = -100011;

function trans(num) {
  const unit = ["千", "百", "十", ""];
  const splitUnit = ["", "万", "亿"];
  const numbers = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
  };
  const isNegative = num < 0;
  let str = num.toString();
  if (isNegative) {
    str = str.slice(1);
  }
  let count = 0;
  let tempList = [];
  const list = [];
  for (let i = str.length - 1; i >= 0; i--) {
    tempList.unshift(str[i]);
    count++;
    if (count === 4) {
      list.unshift(tempList);
      count = 0;
      tempList = [];
    }
  }
  if (tempList.length > 0) {
    list.unshift(tempList);
    tempList = [];
  }
  const res = list
    .map((group) => {
      let start = 4 - group.length;
      return group
        .map((num, i) => {
          if (num == 0) {
            start++;
            return "";
          }
          let res = `${numbers[num]}${unit[start++]}`;
          if (group[i - 1] == 0) {
            res = `${numbers[0]}${res}`;
          }
          return res;
        })
        .join("");
    })
    .reverse()
    .map((item, index) => item + splitUnit[index])
    .reverse()
    .join("");
  return isNegative ? `负${res}` : res;
}

console.log(trans(num));

// function NumToChina(n) {
//   n = n.toString();
//   let numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
//   if (n === "0") return numbers[0];
//   let units = ["", "十", "百", "千"];
//   let len = n.length;
//   let res = "";
//   console.log(n, "n");
//   for (let i = 0; i < len; i++) {
//     let num = Number(n[i]);
//     if (num != 0) {
//       if (n[i - 1] === "0") res = res + numbers[0];
//       res = res + numbers[num] + units[len - i - 1];
//     }
//   }
//   if (len == 2 && n[0] == "1") res = res.slice(1);
//   return res;
// }

// function numTo(n) {
//   const isLose = n < 0;
//   n = Math.abs(n).toString();
//   let res = [];
//   let len = n.length;
//   for (let i = len; i > 0; i -= 4) {
//     res.push(NumToChina(n.slice(Math.max(0, i - 4), i)));
//   }
//   const units = ["", "万", "亿"];
//   for (let i = 0; i < res.length; i++) {
//     if (res[i] == "") continue;
//     res[i] = res[i] + units[i];
//   }
//   isLose && res.push("负");
//   return res.reverse().join("");
// }
// console.log(numTo(1001));
