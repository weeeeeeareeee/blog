<template>
    <div class="contextMenu-wrapper">
        <div v-context-menu="{ 打印a: a, 打印b: b, 打印c: c }" class="box" style="background-color: aqua;">

        </div>
        <div v-context-menu="{ 打印a: a, 打印c: c }" class="box" style="background-color: aquamarine;">

        </div>
    </div>
</template>
<script setup>
import { h } from 'vue';

const a = () => {
    console.log('a')
}
const b = () => {
    console.log('b')
}
const c = () => {
    console.log('c')
}
const ob = new ResizeObserver((a) => {
    console.log(a);
})
const vContextMenu = {
    mounted: (el, binding) => {
        el.addEventListener('contextmenu', (e) => {
            //阻止默认的右键事件
            e.preventDefault();
            console.log(binding.value);
            console.log(e);
            //判断是否已经存在context-menu, 如果存在则移除
            if (document.querySelector(".context-menu")) {
                document.body.removeChild(document.querySelector(".context-menu"))
            }

            //创建dom
            const div = document.createElement("div")
            Object.keys(binding.value).forEach(key => {
                const item = document.createElement("div")
                item.className = "context-menu-item"
                item.innerText = key
                //给每个菜单项添加效果
                item.addEventListener('click', (e) => {
                    binding.value[key]()
                    document.body.removeChild(document.querySelector(".context-menu"))
                })
                div.appendChild(item)
            })
            document.body.appendChild(div)
            div.className = "context-menu"
            div.style.left = e.clientX + "px"
            div.style.top = e.clientY + "px"

        })
    }
}


</script>
<style lang='scss'>
.contextMenu-wrapper {
    height: 600px;
    display: flex;
    padding: 20px;
    flex-direction: column;

    >.box {
        flex: 1;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.context-menu {
    background-color: #fff;
    position: absolute;
    padding: 3px;
    border-radius: 8px;

    &-item {
        height: 30px;
        width: 50px;
        line-height: 30px;
        font-size: 16px;
        padding: 3px 20px;
        border-radius: 8px;
        cursor: pointer;

        &:hover {
            background-color: #cecece;
        }
    }

}
</style>