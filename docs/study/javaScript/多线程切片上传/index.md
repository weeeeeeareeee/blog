---
title: "代码实现"
description: "keywords:worker,md5,upload"
---
# 多线程切片上传
使用``worker``实现多文件切片上传，由于md5 hash计算为同步任务，所以需要使用``worker``多线程能大大节省时间。

# 代码实现
:::demo javaScript/multiThreadedSliceUpload/multiThreadedSliceUpload
:::
# worker.js
``import``引入spark-md5会阻塞新线程，所以换了种使用``import``引入。
```js{2}
 const createChunk = async (file, index, size) => {
    await import('/js/multiThreadedSliceUpload/spark-md5.min.js');
    return new Promise((resolve, reject) => {
        const start = index * size;
        const end = start + size;
        const blob = file.slice(start, end);
        const fileReader = new FileReader()
        const md5 = new SparkMD5.ArrayBuffer();
        fileReader.onload = (e) => {
            md5.append(e.target.result);
            resolve({
                start,
                end,
                index,
                blob,
                hash: md5.end()
            })
        }
        fileReader.readAsArrayBuffer(blob)
    })
}

onmessage = async (e) => {
    const { file, CHUNK_SIZE, start, end } = e.data;
    const prms = [];
    for (let i = start; i < end; i++) {
        prms.push(createChunk(file, i, CHUNK_SIZE))
    }
    const chunks = await Promise.all(prms);
    postMessage(chunks);
}
```