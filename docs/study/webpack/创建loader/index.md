---
title: "创建loader"
description: "keywords:webpack,loader"
---
## 作用
loader是webpack的一个重要功能，用于解析不同文件并转换为js或可以被js使用的格式。

## webpack配置
通过后缀名判断是不是需要被loader处理，只会处理import或者require引入的文件。
```js {4-5}
  module: {
        rules: [
            {
                test: /\.dataurl$/,
                use: path.resolve(__dirname, './loader/dataurlLoader.js')
            }
        ]
    },
```
可以使用数组来让一个文件被多个loader处理，顺序是由下往上，由右往左。
```js
{
    test: /\.css$\/,
    use: ['style-loader', 'css-loader', 'less-loader']
}

{
    test: /\.css$\/,
    use: [{
        loader: 'style-loader',
    },{
        loader: 'css-loader',
    },{
        loader: 'less-loader',
    }]
}
```
## loader代码
loader.js的代码需要返回一个字符串，这个字符串会被webpack当作js代码来处理。
```js
module.exports = function loader(source) {
    console.log(source)
    return `module.exports = ${JSON.stringify(source)}`;
};
```