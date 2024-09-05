<script setup>
    const { prevBox, nextBox, currentBox } = defineProps({
        currentBox: Number,
        prevBox: Function,
        nextBox: Function
    })
</script>

<template>
    <div class="flex mb-4 w-full lg::w-1/2 items-center justify-center transition-all duration-300">
        <div class="flex w-1/2 py-3 items-center justify-between bg-slate-100 rounded-full">
            <span class="flex items-center justify-center p-2 w-20 max-h-full text-red-500" @click="prevBox">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" /></svg>
            </span>
            <span class="w-full text-center text-xl lg:text-2xl mx-4">{{ 'Box ' + currentBox }}</span>
            <span class="flex items-center justify-center p-2 w-20 h-full text-red-500" @click="nextBox">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" /></svg>
            </span>
        </div>
    </div>
</template>