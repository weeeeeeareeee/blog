<template>
    <div class="wrapper">
        <div v-slide-in="[30, 1000]" v-for="item in 10" class="item">
            <span>{{ item }}</span>
        </div>
    </div>
</template>
<script setup>
import { onUnmounted } from 'vue';


//观察元素是否进入视口
const ob = new IntersectionObserver((els) => {
    els.forEach(el => {
        if (el.isIntersecting) {
            animates.get(el.target).play();
            // 动画只需要完成一次
            ob.unobserve(el.target)
        }
    })
})
//元素与动画的映射
const animates = new WeakMap();
//具体指令
const vSlideIn = {
    mounted(el, binding) {

        //获取穿过来的值，分别为出生位置与动画持续时间
        const _defaultPosition = binding.value[0] || 30;
        const _defaultDuration = binding.value[1] || 1000;

        //创建元素的动画
        const animation = el.animate([
            { transform: `translateY(${_defaultPosition}%)`, opacity: 0.5 },
            { transform: `translateX(0)`, opacity: 1 }
        ], {
            duration: _defaultDuration,
            easing: 'ease'
        })
        //最开始赞停，进入视口后才允许播放
        animation.pause();
        //监听元素进入视口
        ob.observe(el)
        //设置映射
        animates.set(el, animation)
    },
    unmounted(el) {
        ob.unobserve(el)
    }
}
onUnmounted(() => {
    ob.disconnect();
})
</script>
<style lang='scss'>
//生成随机颜色函数
@function random-color() {
    @return rgb(random(255), random(255), random(255)); // 生成随机的 RGB 颜色
}

.wrapper {
    height: 600px;
    overflow: auto;
    padding: 20px;

    .item {
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100px;
        background-color: random-color();
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

    }
}
</style>