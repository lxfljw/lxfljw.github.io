// posts.data.js
import { createContentLoader } from "vitepress";

// https://github.com/vuejs/vitepress/issues/3655 启动 module 模式

export default createContentLoader("pages/**/*.md", {
  includeSrc: true, // 包含原始 markdown 源?
  render: true, // 包含渲染的整页 HTML?
  excerpt: true, // 包含摘录?
});
