function midNum(arr) {
  const len = arr.length;
  const newArr = quickSort(arr);
  const mid = len >> 1;
  console.log(newArr, mid);

  if (len % 2 === 0) {
    return (newArr[mid - 1] + newArr[mid]) / 2;
  } else {
    return arr[mid];
  }
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = arr.length >> 1;
  const pivot = arr[mid];

  const left = [];
  const right = [];
  arr.forEach((item) => {
    if (item < pivot) {
      left.push(item);
    } else if (item > pivot) {
      right.push(item);
    }
  });
  return quickSort(left).concat([pivot]).concat(quickSort(right));
}

console.log(midNum([3, 1, 6, 7, 9, 4]));
