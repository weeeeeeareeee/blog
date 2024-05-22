---
title: "多入口"
description: "keywords:webpack"
---
## 多入口配置
每一个入口都是一个对象，通过配置import配置入口文件，通过配置filename配置出口文件,其中`[name]`为每一个chunk的名称。

```js {3-4}
 entry: {
        app1: {
            import: "./src/app1/app1.js",
            filename: '[name]/assert/index.js'
        },
        app2: {
            import: "./src/app2/app2.js",
            filename: '[name]/assert/index.js'
        },
    }
```

## html模板配置
多入口想要完全分开，多个html需要配置，所以需要配置HtmlWebpackPlugin插件，指定一个模板，出口时配置不同的文件夹。
```js {3-5}
 plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'app1/index.html',
            chunks: ['app1']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'app2/index.html',
            chunks: ['app2']
        }),
    ]
```