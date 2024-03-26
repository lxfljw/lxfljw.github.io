import { defineConfig } from "vitepress";
import fs from "node:fs";
import { resolve } from "node:path";

function initSideBar() {
  function noStartsWith(...args) {
    return function (name) {
      return !name.startsWith(...args);
    };
  }

  function removeExt(name) {
    return name.replace(/\.[^.]+$/, "");
  }

  function readDir(dir, path, rootPath) {
    const isDir = fs.statSync(path).isDirectory();
    const text = removeExt(dir);
    // 资源文件夹不显示
    if (dir.startsWith("assets-")) return null;
    if (isDir) {
      const dirs = fs.readdirSync(path).filter(noStartsWith("."));
      return {
        text,
        collapsed: true,
        items: dirs.map((name) => {
          return readDir(name, resolve(path, name), `${rootPath}/${dir}`);
        }),
      };
    }
    if (!dir.endsWith(".md")) return null;
    return {
      text,
      link: `/${rootPath}/${dir}`,
    };
  }

  const root = resolve(__dirname, "../pages");
  const rootDirs = fs.readdirSync(root).filter(noStartsWith("."));

  const sidebar = rootDirs.map((dir) => {
    return readDir(dir, resolve(root, dir), `pages`);
  });
  return sidebar;
}

const sidebar = initSideBar();

console.log("%o sidebar-", sidebar);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "码上秃的博客",
  description: "我的网站",
  base: "/",
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "博客列表", link: "/pages/设计模式/0-前言.md" },
    ],
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/lxfljw/lxfljw.github.io" },
    ],
  },
});
