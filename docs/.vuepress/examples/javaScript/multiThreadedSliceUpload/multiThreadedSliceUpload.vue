<template>
    <div class="multiThreadedSliceUpload-wrapper">
        <div class="upload-box">
            <ElUpload v-model:file-list="fileList1" :auto-upload="false" :on-change="uploadFile1" class="upload-btn">
                <ElButton type="primary" :loading="loading1">单线程切片上传</ElButton>
            </ElUpload>
            <span class="time">消耗时间：{{ singleTime }}</span>
        </div>
        <div class="upload-box">
            <ElUpload v-model:file-list="fileList2" :auto-upload="false" :on-change="uploadFile2" class="upload-btn">
                <ElButton type="primary" :loading="loading2">多线程切片上传</ElButton>
            </ElUpload>
            <span class="time">消耗时间：{{ multiTime }}</span>
        </div>
    </div>
</template>

<script setup>
import { ElUpload, ElButton } from 'element-plus';
import SparkMD5 from 'spark-md5';
import { ref } from 'vue';
const singleTime = ref(0);
const multiTime = ref(0);
const fileList1 = ref()
const fileList2 = ref()
const isFinished = ref(0)
const loading1 = ref(false)
const loading2 = ref(false)


//单个切片大小
const CHUNK_SIZE = 5 * 1024 * 1024;
//线程数
const THREAD_COUNT = Navigator.hardwareConcurrency || 4;

/**
 * 根据单个序号创建对应切片
 * @param {*} file 
 * @param {*} index 
 * @param {*} size 
 */
const createChunk = async (file, index, size) => {
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

/**
 * 单线程切片
 * @param {*} file 
 */
const sliceFile = async (file) => {
    const _chunksCount = Math.ceil(file.size / CHUNK_SIZE);
    const _result = []
    for (let i = 0; i < _chunksCount; i++) {
        const chunk = await createChunk(file, i, CHUNK_SIZE)
        _result.push(chunk)
    }
    return _result
}

/**
 * 多线程切片
 * @param {*} file 
 */
const sliceFile2 = async (file) => {
    return new Promise(async (resolve, reject) => {
        const _chunksCount = Math.ceil(file.size / CHUNK_SIZE);
        const _threadCount = Math.ceil(_chunksCount / THREAD_COUNT);
        const _result = []
        //根据线程分配任务
        for (let i = 0; i < _threadCount; i++) {
            //创建的线程
            const end = (i + 1) * _threadCount > _chunksCount ? _chunksCount : (i + 1) * _threadCount
            const start = i * _threadCount
            //blob转url
            const worker = new Worker("/js/multiThreadedSliceUpload/worker.js", { type: "module" });
            worker.postMessage({
                file,
                CHUNK_SIZE,
                start,
                end
            })
            worker.onmessage = (e) => {
                for (let j = 0; j < e.data.length; j++) {
                    _result[e.data[j].index] = e.data[j];
                }
                //结束线程
                worker.terminate()

                isFinished.value++
                //完成的线程数相等则给出结果
                if (isFinished.value === _threadCount) {
                    resolve(_result)
                }
            }
        }
    })
}

/**
 * 单线程上传
 * @param {*} e 
 */
const uploadFile1 = async (e) => {
    loading1.value = true;
    const startTime = new Date();
    const file = e.raw
    const chunks = await sliceFile(file)
    const endTime = new Date();
    singleTime.value = endTime - startTime
    loading1.value = false;
    console.log(chunks);
}
/**
 * 多线程上传
 * @param {*} e 
 */
const uploadFile2 = async (e) => {
    loading2.value = true;
    const startTime = new Date();
    const file = e.raw
    const chunks = await sliceFile2(file)
    const endTime = new Date();
    multiTime.value = endTime - startTime
    loading2.value = false;
    console.log(chunks);
}
</script>
<style lang='scss'>
.multiThreadedSliceUpload-wrapper {
    padding: 20px;

    .upload-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        .time {
            margin-left: 20px;
        }

        .upload-btn {
            height: 32px;
        }
    }

    .el-upload-list {
        display: none;
    }
}
</style>