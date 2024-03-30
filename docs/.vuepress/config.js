import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '无涯过客',
  description: '无涯过客的博客',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      { text: "首页", link: "/" }
    ],
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
