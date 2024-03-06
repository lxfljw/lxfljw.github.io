import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "码上秃的博客",
  description: "我的网站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "我的文章", link: "/docs/设计模式/前言.md" },
    ],

    sidebar: [
      {
        text: "一、设计模式",
        collapsed: true,
        items: [
          { text: "前言", link: "/docs/设计模式/前言.md" },
          { text: "1-单例模式", link: "/docs/设计模式/1-单例模式.md" },
          { text: "2-策略模式.md", link: "/docs/设计模式/2-策略模式.md" },
          { text: "3-代理模式", link: "/docs/设计模式/3-代理模式.md" },
          { text: "4-发布订阅模式", link: "/docs/设计模式/4-发布订阅模式.md" },
        ],
      },
      {
        text: "二、鉴权",
        collapsed: true,
        items: [
          {
            text: "1-Session，Token，JWT 区别",
            link: "/docs/鉴权/1-Session，Token，JWT 区别.md",
          },
        ],
      },
      {
        text: "三、Git",
        collapsed: true,
        items: [
          {
            text: "1-多仓库合并",
            link: "/docs/Git/多仓库合并.md",
          },
        ],
      },
      {
        text: "四、Vue3源码",
        collapsed: true,
        items: [
          {
            text: "准备环境",
            link: "/docs/Vue3源码系列/1、准备工作.md",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lxfljw/lxfljw.github.io" },
    ],
  },
});
