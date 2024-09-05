<script setup>

const props = defineProps({
    isOpen: Boolean,
    generations: Array
})

const emit = defineEmits(['close', 'select'])

const close = () => {
    emit('close')
}

const selectGeneration = (generationId) => {
    emit('select', generationId)
}
</script>

<template>
    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50" @click.self="close">
        <div class="bg-zinc-200 bg-opacity-50 w-1/3 p-4 rounded-xl shadow-lg">
            <button @click="close" class="absolute top-2 right-2 hover:rotate-180 hover:text-white transform-gpu transition-all duration-300">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </button>
            <div class="flex flex-col gap-2">
                <button v-for="generation in generations" :key="generation.id" @click="selectGeneration(generation)" class="p-2 bg-blue-500 text-white rounded-full">
                    {{ generation.name }}
                </button>
            </div>
        </div>
     </div>
</template>