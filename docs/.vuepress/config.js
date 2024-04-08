import { blogPlugin } from '@vuepress/plugin-blog';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { createSidebarByDir, highlight } from "./utils/tools";
import { containerPlugin } from '@vuepress/plugin-container';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '无涯过客',
  description: '无涯过客的博客',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      { text: "首页", link: "/" },
      { text: "学习笔记", link: "/study/" },
    ],
    sidebar: {
      '/study/': await createSidebarByDir('study')
    },
  }),
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  plugins: [
    //自动注册组件
    registerComponentsPlugin({
      componentsDir: resolve(__dirname, './components'),
    }),
    //容器模板
    containerPlugin({
      type: "demo",
      before: (info) => {
        //
        let source = readFileSync(
          resolve(__dirname, "./examples/", `${info}.vue`),
          "utf-8"
        );
        //没有源码就报错
        if (!source)
          throw new Error(`Incorrect source file: ${info}`);

        return `<Demo sourceFilePath="${info}" source="${encodeURIComponent(
          highlight(source)
        )}" rawSource="${encodeURIComponent(source)}">`;
      },
      after: (info) => {
        return `</Demo>`;
      },
    }),
  ],
  bundler: viteBundler(
    {
      viteOptions: {

      }
    }
  ),
  port: 3000
})
