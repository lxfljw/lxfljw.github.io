function sandbox(code) {
  return new Function("window", "document", code);
}
const code = `
console.log(window.top);
console.log(document.body)
`;

sandbox(code)({}, {});
