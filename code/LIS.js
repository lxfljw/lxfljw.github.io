// Vue3 最长增长子序列算法

function getSequence(arr) {
  // 浅拷贝数组
  const p = arr.slice();
  // 第一个默认为最开始
  const result = [0];
  let i, j, u, v, c;
  // 数组长度
  const len = arr.length;
  // 遍历数组
  for (i = 0; i < len; i++) {
    //arrI 第 i 个
    const arrI = arr[i];
    // 如果是 0 表示新增节点
    if (arrI !== 0) {
      // 取出上一个结果的最后一个元素 第一次是 0
      j = result[result.length - 1];
      // 如果最后一个都是小于 arrI 的话，索引直接加入
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      // 如果
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

getSequence([8, 20, 4, 6, 9, 1, 2]);
