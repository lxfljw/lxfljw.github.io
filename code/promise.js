const p1 = Promise.resolve(1);
const p2 = Promise.reject("error");

Promise.allSettled([p1, p2]).then((res) => {
  console.log(res);
});
