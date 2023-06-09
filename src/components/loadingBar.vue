<style scoped lang="scss">
.warps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;
    z-index: 999;
    .bar {
        height: inherit;
        width: 0;
        background: #18a058;
        z-index: 999;
    }
}
</style>

<template>
    <div ref="warps" class="warps">
        <div ref="bar" class="bar"></div>
    </div>
    <div ref="aaa"></div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)

const startLoading = () => {    
    speed.value = 1;
    let dom = bar.value as HTMLElement
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 5;
            dom.style.width = speed.value + '%'
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1;
            window.cancelAnimationFrame(timer.value)
        }
    })
}
let warps = ref<HTMLElement>()
const endLoading = () => {
    let warpsDom = warps.value as HTMLElement
    let dom = bar.value as HTMLElement
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100;
            dom.style.width = speed.value + '%'
        })
        setTimeout(() => {
            warpsDom.style.height = 0 + 'px';
        }, 666)
    }, 666)
}
// 暴露出这两个方法
defineExpose({
    startLoading,
    endLoading
})
</script>