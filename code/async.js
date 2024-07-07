function getData(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "666", count: 0 }), time);
  });
}

function p1() {
  const res = getData(1500);
  return { ...res, count: res.count + 1 };
}

function p2() {
  const res = p1();
  return { ...res, count: res.count + 1 };
}

function run(fn) {
  const oldGetData = getData;
  let cache = {
    status: "pendding",
    data: null,
  };
  getData = function () {
    if (cache.status !== "pendding") return cache.data;
    const p = oldGetData().then(
      (res) => {
        cache = {
          status: "success",
          data: res,
        };
      },
      (err) => {
        cache = {
          status: "fail",
          data: err,
        };
      }
    );
    throw p;
  };
  try {
    fn();
  } catch (err) {
    console.log(err);
    err.finally(() => {
      fn();
      getData = oldGetData;
    });
  }
}

run(() => {
  const data = p2();
  console.log(data);
});

async function foo() {
  return 1;
}

function bar() {
  const result = foo();
  console.log(result);
}

function run(fn) {
  const oldFoo = foo;
  let cache = {
    status: "pendding",
    data: null,
  };
  foo = function () {
    if (cache.status !== "pendding") return cache;
    throw oldFoo()
      .then((res) => {
        cache = {
          status: "done",
          data: res,
        };
      })
      .catch((err) => {
        cache = {
          status: "error",
          data: err,
        };
      });
  };
  try {
    fn();
  } catch (err) {
    err.finally(() => {
      fn();
    });
  }
}

run(bar);
