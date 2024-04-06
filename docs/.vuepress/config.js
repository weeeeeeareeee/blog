import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { createSidebarByDir } from "./utils/tools"

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
    }

  }),
  bundler: viteBundler(
    {
      viteOptions: {

      }
    }
  ),
  open: true,
  port: 3000
})
