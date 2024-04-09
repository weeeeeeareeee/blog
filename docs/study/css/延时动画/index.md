---
title: "代码实现"
description: "keyword：animate delay clip-path v-bind"
---
# 介绍
通过 ``css`` 实现动画的操控，其中的图像计算可以通过``css``自动计算，对比js控制的动画，css只需要调整时间，就可以实现动画的切换。在动画效果复杂时更加适合去使用。

# clip-path

clip-path 属性允许你裁剪元素的一部分，从而创建一个自定义的形状。
这次主要使用的是``polygon``多边形与`path`路径，polygon通过[多边形裁切网站](https://bennettfeely.com/clippy/)生成，path需要手动写，只需记住几个词就是`M` `Z` `L` `Q` 分别是起点(x y)、闭合（连接到起点）、直线（x y）、二次贝塞尔曲线(x y x y)为前一个xy曲线的接近点。`c`为贝塞尔曲线需要（x y x y x y）需要两个控制点。
# 代码实现
:::demo css/delayedAnimation/delayedAnimation
:::