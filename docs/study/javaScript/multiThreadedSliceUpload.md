---
title: "多线程切片上传"
description: "keywords:worker,md5,upload"
---
## 多线程切片上传
使用``worker``实现多文件切片上传，由于md5 hash计算为同步任务，所以需要使用``worker``多线程能大大节省时间，但由于``vuepress``的配置问题无法在单文件中实现,故而舍去了hash计算，虽然有效果但并不明显。

## 代码实现
:::demo javaScript/multiThreadedSliceUpload/multiThreadedSliceUpload