<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Pokemon from './Pokemon.vue';
import Modal from './components/Modal.vue';
import Paginate from './components/Paginate.vue';
import SortSearch from './components/SortSearch.vue';
import Generations from '../objects/Generations'

const props = defineProps({
    pokedex: Object
})

const emit = defineEmits(['pokemon', 'palette'])

const handlePokemonClick = (pokemon) => {
    emit('pokemon', pokemon)

    emit('palette', pokemon.palette.accents)
}

// Modal
const selectedGeneration = ref({ id: 0, name: 'All Generations', value: 'all-generation', isActive: true })
const isOpen = ref(false)
const defaultPalette = ['#93c5fd', '#60a5fa']

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const handleGenerationSelect = (generation) => {
    Generations.forEach(gen => {
        gen.isActive = gen.id === generation.id; // Set isActive to true for the selected generation and false for others
    })

    selectedGeneration.value = {...generation}

    console.log(selectedGeneration.value)
    closeModal()
    emit('palette', defaultPalette)
    if (currentBox.value !== 1) {
        currentBox.value = 1
    }
    if (searchQuery.value !== '') {
        searchQuery.value = ''
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
</script>

<template>
    <div class="w-full px-4 flex flex-col">
        <!-- Paginate pokedex -->
        <Paginate :currentBox="currentBox" :prevBox="prevBox" :nextBox="nextBox" />
        <!-- Box Grid -->
        <div class="mb-4">
            <div class="grid grid-cols-5 lg:grid-cols-6 gap-2 h-1/2">
                <div
                    v-for="pokemon in paginatedPokemons" 
                    :key="pokemon.id" 
                    class="cursor-scale flex flex-col items-center rounded-xl bg-zinc-50 bg-opacity-30"
                    @click="handlePokemonClick(pokemon)">
                    <Pokemon :pokemon="pokemon" />
                </div>
            </div>
        </div>
        <!-- Search & Sort -->
        <SortSearch v-model:searchQuery="searchQuery" :openModal="openModal" :selectedGeneration="selectedGeneration" />
    </div>
    <!-- Generations Modal -->
    <Transition>
        <Modal :isOpen="isOpen" :close="closeModal">
            <h1 class="text-2xl text-center mb-4 font-semibold">Select Generation</h1>
            <button v-for="generation in Generations" :key="generation.id" @click="handleGenerationSelect(generation)" class="cursor-scale p-2 text-white rounded-full" :style="{backgroundColor: generation.isActive ? '#71717a' : '#52525b'}">
                {{ generation.name }}
            </button>
        </Modal>
    </Transition>
</template>

<style scoped>
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }
</style>