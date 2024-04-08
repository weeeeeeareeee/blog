// import SparkMD5 from 'spark-md5';

const createChunk = async (file, index, size) => {
    //import SparkMD5 会阻塞worker 所以在worker中 import本地的js
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