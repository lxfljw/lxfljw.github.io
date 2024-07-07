const arr = [
  {
    id: 2,
    name: "部门B",
    parentId: 0,
  },
  {
    id: 3,
    name: "部门C",
    parentId: 1,
  },
  {
    id: 1,
    name: "部门A",
    parentId: 2,
  },
  {
    id: 4,
    name: "部门D",
    parentId: 1,
  },
  {
    id: 5,
    name: "部门E",
    parentId: 2,
  },
  {
    id: 6,
    name: "部门F",
    parentId: 3,
  },
  {
    id: 7,
    name: "部门G",
    parentId: 2,
  },
  {
    id: 8,
    name: "部门H",
    parentId: 4,
  },
];
/**
 * @param {{id: number;name:string;parentId: number}[]} arr 扁平化数组
 */
function transformTree(arr) {
  const treeMap = new Map();
  let root;
  arr.forEach((item) => {
    if (item.parentId === 0) {
      root = item;
    }
    let list = treeMap.get(item.parentId) || [];
    list.push(item);
    treeMap.set(item.parentId, list);
  });
  function fn(node) {
    const children = treeMap.get(node.id) || null;
    node.children = children;
    if (children) {
      children.forEach(fn);
    }
  }
  fn(root);
  return [root];
}

console.log("%o", transformTree(arr));
