/**
 * @type {import('webpack').Configuration}
 */
const baseConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            $schema: "https://swc.rs/schema.json",
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
            // target: "es2015",
            // loose: false,
          },
        },
      },
    ],
  },
};

module.exports = baseConfig;
