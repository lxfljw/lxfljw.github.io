import { defineConfig } from "vitepress";

// TODO: 使用脚本自动生成目录
// 1. 读取目录
// 2. 生成目录
// 3. 生成配置文件
// 4. 生成页面
// 5. 生成路由

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "码上秃的博客",
  description: "我的网站",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "我的文章", link: "/pages/设计模式/前言.md" },
    ],

    sidebar: [
      {
        text: "一、设计模式",
        collapsed: true,
        items: [
          { text: "前言", link: "/pages/设计模式/前言.md" },
          { text: "1-单例模式", link: "/pages/设计模式/1-单例模式.md" },
          { text: "2-策略模式.md", link: "/pages/设计模式/2-策略模式.md" },
          { text: "3-代理模式", link: "/pages/设计模式/3-代理模式.md" },
          { text: "4-发布订阅模式", link: "/pages/设计模式/4-发布订阅模式.md" },
        ],
      },
      {
        text: "二、鉴权",
        collapsed: true,
        items: [
          {
            text: "1-Session，Token，JWT 区别",
            link: "/pages/鉴权/1-Session，Token，JWT 区别.md",
          },
        ],
      },
      {
        text: "三、Git",
        collapsed: true,
        items: [
          {
            text: "1-多仓库合并",
            link: "/pages/Git/多仓库合并.md",
          },
        ],
      },
      {
        text: "四、Vue3",
        collapsed: true,
        items: [
          {
            text: "1、准备工作",
            link: "/pages/Vue3/源码系列/1、准备工作.md",
          },
        ],
      },
      {
        text: "五、算法",
        collapsed: true,
        items: [
          {
            collapsed: true,
            text: "数组",
            items: [
              {
                text: "1、二分法查找",
                link: "/pages/算法/数组/1、二分法查找.md",
              },
            ],
          },
          {
            collapsed: true,
            text: "链表",
            items: [
              {
                text: "1、合并有序链表",
                link: "/pages/算法/链表/1.合并有序链表.md",
              },
              {
                text: "2.分隔链表",
                link: "/pages/算法/链表/2.分隔链表.md",
              },
              {
                text: "3.合并K个有序链表",
                link: "/pages/算法/链表/3.合并K个有序链表.md",
              },
              {
                text: "4.反转链表",
                link: "/pages/算法/链表/4.反转链表.md",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lxfljw/lxfljw.github.io" },
    ],
  },
});
