<script setup>
import { onBeforeMount, ref } from 'vue'
import Pokedex from './views/Pokedex.vue'
import Cursor from './views/components/Cursor.vue'
import Details from './views/Details.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const pokedex = ref({})
const isLoading = ref(true)
const palette = ref([])
const pokemon = ref([])
const series = ref([{ name: "", data: [], }])

const fetchPokedexData = async () => {
   try {
      const response = await fetch('/Pokedex.pokemons.json')
      const data = await response.json()
      pokedex.value = data
   } catch (error) {
      console.error('Error @ fetchPokedexData:', error)
   } finally {
      isLoading.value = false
   }
}

const handlePaletteEmit = (accents) => {
   palette.value = accents
}

const isOpen = ref(false)

const handlePokemonEmit = (pokemonData) => {
   isOpen.value = false

   setTimeout(() => {
      pokemon.value = pokemonData
      series.value[0].name = pokemonData.name
      series.value[0].data = pokemonData.stats.map(s => s.base_stat)
      isOpen.value = true
   }, 300)
}

const closeDetails = () => {
   isOpen.value = false
   console.log(isOpen)
}

onBeforeMount(() => {
   fetchPokedexData()
})
</script>
 
<template>
   <Cursor :accent="palette[2]"/>
   <div class="relative h-lvh w-lvw overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 shadow-2xl -translate-x-[65%] -skew-x-[25deg] z-20 transition-all duration-300" :style="{backgroundColor: palette[0] || '#93c5fd'}"></div>
      <div class="absolute inset-0 shadow-2xl -translate-x-[55%] -skew-x-[25deg] z-10 transition-all duration-300" :style="{backgroundColor: palette[1] || '#60a5fa'}"></div>
      <div class="absolute inset-0 z-0 transition-all duration-300 overflow-hidden bg-zinc-200">
         <div class="absolute bottom-0 right-0 text-gray-300 translate-x-1/3 translate-y-1/3">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="1000"  height="1000"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="0.4"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pokeball motion-safe:animate-spin-slow">
               <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
               <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"  />
               <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
               <path d="M3 12h6" />
               <path d="M15 12h6" />
            </svg>
         </div>
      </div>
      <div class="absolute z-20 w-full h-full">
         <div v-if="isLoading" class="h-full flex flex-col items-center justify-center">
            <PulseLoader />
         </div>
         <div v-else class="h-full w-[90%] md:w-1/2 mx-8 flex flex-col items-start justify-center">
            <Pokedex :pokedex="pokedex" @palette="handlePaletteEmit" @pokemon="handlePokemonEmit"/>
         </div>
      </div>
      <!-- Details -->
       <Transition> 
         <div v-if="isOpen" class=" hidden md:flex bg-zinc-500 bg-opacity-20 absolute inset-0 z-5 justify-end">
            <button @click="closeDetails" class="cursor-scale cursor-none absolute top-2 right-2 z-50 hover:rotate-180 hover:text-white transform-gpu transition-all duration-300">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </button>
            <!-- Details emitted from Pokedex goes here -->
            <div class="h-full w-2/5 flex flex-col px-4 items-center justify-center">
                  <Details :pokemon="pokemon" :series="series"></Details>
            </div>
         </div>
       </Transition>
   </div>
</template>

<style scoped>
/* Ensure the container covers the viewport */
   html, body {
      height: 100%;
      margin: 0;
   }

   .v-enter-active,
   .v-leave-active {
   transition: all 0.5s ease;
   }

   .v-enter-from {
      opacity: 0;
      transform: translateX(100%);
   }

   .v-enter-to,
   .v-leave-from {
      opacity: 1;
      transform: translateX(0);
   }

   .v-leave-to {
      opacity: 0;
      transform: translateX(100%);
   }
</style>
