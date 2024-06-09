/**
 *
 * @param {number[]} arr 未排序的数组
 * @param {number} low 起始下标
 * @param {number} high 结束下标
 * @returns {number[]} 排好序的数组
 */
function mergeSort(arr) {
  let temp = arr.slice();
  // 不断二分
  function divide(low, high) {
    // 递归停止条件：low 和 high 相等,只有一个元素不需要排序
    if (low === high) return;
    // [6, 2, 5, 3, 4]
    // 找出中间值
    const mid = (low + high) >> 1;
    // 1.把数组不断二分
    divide(low, mid);
    divide(mid + 1, high);
    // 2.调用合并函数
    merge(low, mid, high);
    return arr;
  }

  /**
   *
   * @param {numer[]} arr
   * @param {number} low
   * @param {number} mid
   * @param {number} high
   */
  function merge(low, mid, high) {
    for (let i = low; i <= high; i++) {
      temp[i] = arr[i];
    }

    let p = low,
      p1 = low,
      p2 = mid + 1;
    while (p1 <= mid && p2 <= high) {
      arr[p++] = temp[p1] < temp[p2] ? temp[p1++] : temp[p2++];
    }

    while (p1 <= mid) {
      arr[p++] = temp[p1++];
    }

    while (p2 <= high) {
      arr[p++] = temp[p2++];
    }
  }
  divide(0, arr.length - 1);
  return arr;
}

console.log(mergeSort([6, 2, 5, 3, 4, 8], 0, 5));
