<script setup>
import { useEventListener } from '@vueuse/core'
import { nextTick, onMounted } from 'vue'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(CSSRulePlugin)

const props = defineProps({
    accent: {
        type: String,
        default: '#60a5fa'
    }
})

onMounted(() => {
    let cursor = document.querySelector('.cursor')
    let mouseX = 0, mouseY = 0

    gsap.to({}, {
        duration: 0.016,
        repeat: -1,
        onRepeat: function() {
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            })
        }
    })

    useEventListener(window, 'mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
    })

    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('.cursor-scale')) {
            cursor.classList.add('grow')
        }
    }, true)

    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('.cursor-scale')) {
            cursor.classList.remove('grow')
        }
    }, true)
})
</script>

<template>
    <div class="cursor" :style="{border: `2px solid ${props.accent}`}"></div>
</template>

<style scoped>
   .cursor{
      position: fixed;
      width: 40px;
      height: 40px;
      margin-left: -20px;
      margin-top: -20px;
      border-radius: 50%;
      transition: transform 0.3s ease;
      transform-origin: center center;
      pointer-events: none;
      z-index: 1000;
   }

   .grow {
        transform: scale(3);
   }
</style>