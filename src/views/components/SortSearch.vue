<script setup>
const { openModal, selectedGeneration, searchQuery } = defineProps({
    openModal: Function,
    selectedGeneration: Object,
    searchQuery: String
})

const emit = defineEmits(['update:searchQuery'])
</script>

<template>
    <div class="flex w-full lg:w-3/4 xl:w-1/2 items-center justify-center gap-4 px-8 mt-4 transition-all duration-300">
        <div @click="openModal" class="flex w-1/3 py-3 items-center justify-center bg-slate-100 rounded-full cursor-pointer">
            <span>{{ selectedGeneration.name }}</span>
        </div>
        <div class="flex w-1/3 py-3 items-center justify-center bg-slate-100 rounded-full">
            <div class="px-4 text-gray-500">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            </div>
            <input :value="searchQuery" @input="(ev) => emit('update:searchQuery', ev.target.value)" type="text" placeholder="Search" class="w-full px-2 rounded-full bg-transparent focus:outline-none">
        </div>
    </div>
</template>