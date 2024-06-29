const arr = [
  {
    id: 1,
    child: [
      { id: 3 },
      {
        id: 4,
        child: [
          {
            id: 5,
            child: [{ id: 6 }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    child: [
      {
        id: 7,
      },
    ],
  },
];

function findPathById(arr, id) {
  let resPath;
  function fn(arr, path = []) {
    for (const item of arr) {
      if (item.id === id) {
        path.push(id);
        resPath = path;
        return;
      }
      if (item.child) {
        path.push(item.id);
        fn(item.child, [...path]);
      }
    }
  }
  fn(arr);
  return resPath;
}

// findPathById(arr, 6);
console.log("findPathById(arr, 6)", findPathById(arr, 6));
console.log("findPathById(arr, 7)", findPathById(arr, 7));
