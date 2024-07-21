function logger(store) {
  return function (next) {
    return function (action) {
      // console.log("logger 获取 userId", store.getUserId());
      console.log("logger dispatching", action);
      let result = next(action);
      // console.log("loggernext state");
      return result;
    };
  };
}

function test1(store) {
  return function (next) {
    return function (action) {
      // console.log("test1 获取 userId", store.getUserId());
      console.log("test1 dispatching", action);
      let result = next(action);
      // console.log("test1 next state");
      return result;
    };
  };
}

const topApi = {
  getUserId: () => "uid123",
};

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return chain.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
const middleware = [logger, test1];
const chain = middleware.map((func) => func(topApi));

const trigger = () => {
  console.log("trigger");
};

const dispatch = compose(...chain)(trigger);

dispatch("getData");
