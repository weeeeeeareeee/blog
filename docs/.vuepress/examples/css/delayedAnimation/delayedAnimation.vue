<template>
    <div class="delayedAnimation-wrapper">
        <div class="box">
            <div class="title">
                js实现
            </div>
            <div class="box-content">
                <div class="box-content-ball" ref="ballRef1"></div>
                <ElSlider v-model="num1" :show-tooltip="false" class="slider" />
            </div>
        </div>
        <div class="box">
            <div class="title">
                css延迟实现
            </div>
            <div class="box-content">
                <div class="box-content-ball ballAnimate" ref="ballRef2"></div>
                <ElSlider v-model="num2" :show-tooltip="false" class="slider" />
            </div>
        </div>
        <div class="box">
            <div class="title">
                复杂css延迟实现
            </div>
            <div class="box-content">
                <div class="box-content-ball__big" ref="ballRef2">
                    <div class="eye eye-left"></div>
                    <div class="eye eye-right"></div>
                    <div class="mouse"></div>
                </div>
                <ElSlider v-model="num3" :show-tooltip="false" class="slider" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ElSlider } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
const num1 = ref(0);
const num2 = ref(0);
const num3 = ref(0);
const ballRef1 = ref(null)
const ballRef2 = ref(null)
const transformNum2 = ref(0)
watch(num1, (newValue) => {
    ballRef1.value.style.transform = `translateX(${newValue / 100 * (ballRef1.value.parentElement.offsetWidth - ballRef1.value.offsetWidth)}px)`
})
onMounted(() => {
    transformNum2.value = ballRef2.value.parentElement.offsetWidth - ballRef2.value.offsetWidth
})
</script>
<style lang='scss'>
.ballAnimate {
    --time: v-bind(num2);
    --width: v-bind(transformNum2);

    @keyframes ballMove {
        100% {
            transform: translateX(calc(var(--width) * 1px));
        }
    }

    animation: ballMove 100s calc(var(--time) * -1s) linear forwards paused;
}

@keyframes ballClip {
    100% {
        clip-path: polygon(80% 0, 100% 0, 100% 100%, 75% 100%, 25% 100%, 0 100%, 0 0);
    }
}

@keyframes ballClip1 {
    100% {
        clip-path: polygon(20% 0, 100% 0, 100% 100%, 75% 100%, 25% 100%, 0 100%, 0 0);
    }
}

@keyframes colorChange {
    100% {
        background: linear-gradient(to right bottom, #008000, #adff2f);
        // background: green;

    }
}

@keyframes mouseClip {
    100% {
        clip-path: path("M 0 30 Q 50 30 100 30 Q 50 100 0 30 Z");
    }
}

.box-content-ball__big {
    --animateTime: v-bind(num3);

    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(to right bottom, #ff0000, #ffff00);
    // background: red;
    margin: auto;
    position: relative;

    .eye {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 20%
    }

    .eye-left {
        left: 25%;
        clip-path: polygon(80% 0, 100% 0, 100% 100%, 75% 100%, 25% 100%, 0 100%, 0 60%);
        animation: ballClip 100s calc(var(--animateTime) * -1s) linear forwards paused;
    }

    .eye-right {
        right: 25%;
        clip-path: polygon(20% 0, 100% 60%, 100% 100%, 75% 100%, 25% 100%, 0 100%, 0 0);
        animation: ballClip1 100s calc(var(--animateTime) * -1s) linear forwards paused;
    }

    .mouse {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 60%;
        background-color: #fff;
        clip-path: path("M 0 50 Q 50 0 100 50 Q 50 10 0 50 Z");
        animation: mouseClip 100s calc(var(--animateTime) * -1s) linear forwards paused;
    }

    animation: colorChange 100s calc(var(--animateTime) * -1s) linear forwards paused;
}

.delayedAnimation-wrapper {
    padding: 20px;

    >.box {
        padding: 10px;
        border: 1px solid #000;
        border-radius: 8px;
        margin-bottom: 10px;

        .title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .box-content {
            display: flex;
            flex-direction: column;
            position: relative;

            &-ball {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: aqua;


            }

            .slider {
                width: 300px;
                margin: 0 auto;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }

    }
}
</style>