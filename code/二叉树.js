class ListNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function createTree(root, num = 0) {
  if (num > 11) return null;
  root.left = new ListNode(num + 1);
  root.right = new ListNode(num + 2);
  createTree(root.left, root.left.val + 1);
  createTree(root.right, root.right.val + 1);
}
const root = new ListNode(1);
createTree(root);
// console.log(root);

function getlevel(head) {
  const levelList = [];
  function recursion(node, level = 0) {
    if (!node) return;
    if (!levelList[level]) {
      levelList[level] = [];
    }
    levelList[level].push(node.val);
    recursion(node.left, level + 1);
    recursion(node.right, level + 1);
  }
  recursion(head);
  return levelList;
}

console.log(getlevel(root));
