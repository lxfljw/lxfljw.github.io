async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
function async2() {
  console.log("async2");
}
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});
console.log("script end");

// start -> async1 start -> async2 -> promise1 ->
//  promise2 -> script end -> async1 ned ->promise3 -> setimeout
