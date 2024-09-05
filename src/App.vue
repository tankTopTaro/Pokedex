<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import Pokedex from './views/Pokedex.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const pokedex = ref({})
const isLoading = ref(true)
const palette = ref([])

const fetchPokedexData = async () => {
   try {
      // Check Cache Storage
      const cache = await caches.open('pokedex-cache')
      const cachedResponse = await cache.match('pokedex-data')

      if (cachedResponse) {
         // Use cached data if available
         const cachedData = await cachedResponse.json()
         pokedex.value = cachedData
      } else {
         // Fetch data from API if not in cache
         const response = await axios.get('http://localhost:5000/api/pokedex')
         const data = response.data

         // Store fetched data in Cache Storage
         const responseData = new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
         })

         await cache.put('pokedex-data', responseData)
 
         // Update pokedex with fetched data
         pokedex.value = data
         console.log(data)
      }
   } catch (error) {
      console.error('Error @ fetchPokedexData:', error)
   } finally {
      isLoading.value = false
   }
}

const handlePaletteEmit = (emittedPalette) => {
   palette.value = emittedPalette
   console.log('Palette:', palette.value[0])
}

onBeforeMount(() => {
   fetchPokedexData()
})
</script>
 
<template>
   <div class="h-svh w-svw overflow-x-hidden">
      <div class="w-full h-full drop-shadow-xl absolute -translate-x-[65%] -skew-x-[25deg] z-20 transition-all duration-300" :style="{backgroundColor: palette[0] || '#93c5fd'}"></div>
      <div class="w-full h-full drop-shadow-xl absolute -translate-x-[55%] -skew-x-[25deg] z-10 transition-all duration-300" :style="{backgroundColor: palette[1] || '#60a5fa'}"></div>
      <div class="w-full h-full absolute z-0 transition-all duration-300 overflow-hidden bg-zinc-200">
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
         <div v-else class="h-full flex flex-col items-center justify-center">
            <Pokedex :pokedex="pokedex" @palette="handlePaletteEmit"/>
         </div>
      </div>
   </div>
</template>
