<script setup>
import { computed, ref } from 'vue';
import Pokemon from './Pokemon.vue';
import Modal from './components/Modal.vue';
import Generations from '../objects/Generations'

const props = defineProps({
    pokedex: Object
})

const emit = defineEmits(['palette'])

// Modal
const selectedGeneration = ref({ id: 0, name: 'All Generations', value: 'all-generation' })
const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const handleGenerationSelect = (generation) => {
    selectedGeneration.value = generation
    closeModal()

    if (currentBox.value !== 1) {
        currentBox.value = 1
    }
}

// Search
const searchQuery = ref('')

// define current box and items per box
const currentBox = ref(1)
const itemsPerBox = 30

// remove entries without a sprite
const filteredPokemons = computed(() => {
    return Object.values(props.pokedex)
        .filter(pokemon => pokemon.id < 10000 
            && pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            && (selectedGeneration.value.value === 'all-generation' || pokemon.generation === selectedGeneration.value.value)
        )
})

// calculate the start and end index for the current page
const paginatedPokemons = computed(() => {
    const start = (currentBox.value - 1) * itemsPerBox
    const end = start + itemsPerBox
    return filteredPokemons.value.slice(start, end)
})

// define the total number of box
const totalBox = computed(() => Math.ceil(filteredPokemons.value.length / itemsPerBox))

// define the methods to change the box
const nextBox = () => {
    if (currentBox.value < totalBox.value) {
        currentBox.value++
    } else {
        currentBox.value = 1
    }
}

const prevBox = () => {
    if (currentBox.value > 1) {
        currentBox.value--
    } else {
        currentBox.value = totalBox.value
    }
}

// implement search
</script>

<template>
    <!-- Paginate pokedex -->
    <div class="flex mb-4 w-full lg:w-3/4 xl:w-1/2 items-center justify-center transition-all duration-300">
        <div class="flex w-1/2 py-3 items-center justify-between bg-slate-100 rounded-full">
            <button class="p-2 w-20 max-h-full text-red-500" @click="prevBox">Prev</button>
            <h1 class="text-xl lg:text-2xl mx-4">{{ 'Box ' + currentBox }}</h1>
            <button class="p-2 w-20 h-full text-red-500" @click="nextBox">Next</button>
        </div>
    </div>
    <!-- Box Grid -->
    <div class="h-1/2 mb-14">
        <div class="grid grid-cols-6 gap-2">
            <div
                v-for="pokemon in paginatedPokemons" 
                :key="pokemon.id" 
                class="flex flex-col items-center rounded-xl"
                @click="emit('palette', pokemon.palette.accents)"
                :style="{ background: pokemon.palette.base }">
                <Pokemon :pokemon="pokemon" />
            </div>
        </div>
    </div>
    <!-- Search & Sort -->
    <div class="flex w-full lg:w-3/4 xl:w-1/2 items-center justify-center gap-4 px-8 transition-all duration-300">
        <div @click="openModal" class="flex w-1/3 py-3 items-center justify-center bg-slate-100 rounded-full cursor-pointer">
            <span>{{ selectedGeneration.name }}</span>
        </div>
        <div class="flex w-1/3 py-3 items-center justify-center bg-slate-100 rounded-full">
            <div class="px-4 text-gray-500">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Search" class="w-full px-2 rounded-full bg-transparent focus:outline-none">
        </div>
    </div>
    <!-- Modal -->
    <Modal :isOpen="isModalOpen" :generations="Generations" @close="closeModal" @select="handleGenerationSelect" />
</template>