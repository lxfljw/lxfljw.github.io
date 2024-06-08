/**
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
function fastSort(arr) {
  function swap(a, b) {
    const t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
  }

  function partition(start, end) {
    if (start >= end) return [];
    let mid = (start + end) >> 1;
    const midValue = arr[mid];
    // 左指针
    let p = start;
    swap(mid, end);
    // 每遇到一个比 mid 小的值，交换 i 和 p，指针向前移动
    for (let i = start; i <= end - 1; i++) {
      if (arr[i] < midValue) {
        swap(i, p);
        p++;
      }
    }
    swap(p, end);
    partition(start, p - 1);
    partition(p + 1, end);
  }
  partition(0, arr.length - 1);
  return arr;
}

console.log(fastSort([6, 2, 5, 3, 4]));
