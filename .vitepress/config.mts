import { defineConfig } from "vitepress";
import { HOST_NAME, initSideBar } from "./utils";

const sidebar = initSideBar();

// console.log("%o sidebar-", sidebar);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: HOST_NAME,
  },
  title: "码上秃的博客",
  description: "我的网站",
  base: "/",
  head: [["link", { rel: "icon", href: "/logo.awebp" }]],
  themeConfig: {
    logo: "/logo.awebp",
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "目录导航", link: "/link-list/index.md" },
      { text: "主页", link: "/" },
    ],
    sidebar: [
      ...sidebar,
      // 目录
      {
        text: "",
        link: "/link-list/link-list.md",
      },
      // 简历 不声明也可以 这里是防止忘记
      {
        text: "",
        link: "/resume/lxf.md",
      },
      {
        text: "",
        link: "/resume/lm.md",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/lxfljw/lxfljw.github.io" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
});
