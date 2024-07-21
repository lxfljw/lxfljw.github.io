import React from "react";

export default function Home() {
  return React.createElement(
    "div",
    {
      onClick: () => {
        console.log("ssr 的点击事件");
      },
    },
    "欢迎学习 ssr",
    "点击调试"
  );
}
