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
        <div class="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            <button @click="close" class="absolute top-2 right-2 text-red-500">
                &times;
            </button>
            <div class="flex flex-col gap-2">
                <button v-for="generation in generations" :key="generation.id" @click="selectGeneration(generation)" class="p-2 bg-blue-500 text-white rounded-full">
                    {{ generation.name }}
                </button>
            </div>
        </div>
     </div>
</template>