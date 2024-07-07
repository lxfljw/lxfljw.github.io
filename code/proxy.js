const obj = {
  a: {
    b: 1,
  },
};

const proxyObj = new Proxy(obj, {
  get(target, key, reciever) {
    console.log("key", key);
    return Reflect.get(target, key, reciever);
  },
});

proxyObj.a.b;
