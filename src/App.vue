<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import Pokedex from './views/Pokedex.vue'

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
      <div class="w-full h-full absolute -translate-x-3/4 -skew-x-[25deg] z-10 transition-all duration-300" :style="{backgroundColor: palette[0] || '#60a5fa'}"></div>
      <div class="w-full h-full absolute z-0 transition-all duration-300" :style="{backgroundColor: palette[1] || '#bfdbfe'}"></div>
      <div class="absolute z-20 w-full h-full">
         <div class="h-full flex flex-col items-center justify-center">
            <Pokedex :pokedex="pokedex" @palette="handlePaletteEmit"/>
         </div>
      </div>
   </div>
</template>
