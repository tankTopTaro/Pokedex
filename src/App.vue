<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import Types from './objects/Types.js'
import Pokedex from './views/Pokedex.vue'
import Cursor from './views/components/Cursor.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const pokedex = ref({})
const isLoading = ref(true)
const palette = ref([])
const pokemon = ref([])

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

const handlePaletteEmit = (accents) => {
   palette.value = accents
}

const isOpen = ref(false)

const statOptions = {
    chart: {
        height: 350,
        type: 'radar',
    },
    dataLabels: {
        enabled: true
    },
    plotOptions: {
        radar: {
        size: 140,
        polygons: {
            strokeColors: '#e9e9e9',
            fill: {
                colors: ['#f8f8f8', '#fff']
            }
        }
        }
    },
    animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    markers: {
        size: 4,
        colors: ['#fff'],
        strokeColor: '#FF4560',
        strokeWidth: 2,
    },
    tooltip: {
        y: {
        formatter: function(val) {
            return val
        }
        }
    },
    xaxis: {
        categories: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed']
    },
    yaxis: {
        labels: {
            formatter: function(val, i) {
                if (i % 2 === 0) {
                return val
                } else {
                return ''
                }
            }
        }
    }
}

const series = ref([
   {
      name: "",
      data: [],
   },
])


const handlePokemonEmit = (pokemonData) => {
   console.log(pokemonData)
   pokemon.value = pokemonData
   series.value[0].name = pokemonData.name
   series.value[0].data = pokemonData.stats.map(s => s.base_stat)
   console.log(series)
   isOpen.value = true
}

const closeDetails = () => {
   isOpen.value = false
   console.log(isOpen)
}

const genera = computed (() => {
    return pokemon.value.genera.find(entry => entry.language === 'en')?.genus
}) 

const pokemonName = computed (() => {
    return pokemon.value.name[0].toUpperCase() + pokemon.value.name.slice(1)
})

const flavorText = computed (() => {
   const text = pokemon.value.flavor_text_entries.slice().reverse().find(en => en.language === 'en')

   return text.flavor_text
})

const matchType = (types, Types) => {
   if (types) {
      return types.map((type) => {
         const matchedType = Types.find(t => t.type === type.name)
         return {
               ...type, 
               color: matchedType ? matchedType.color : '',
               path: matchedType ? matchedType.path : ''
         }
      })
   }
}

const pokemonTypes = computed (() => {
   return matchType(pokemon.value.types, Types)
})

const isShiny = ref(false)

const showShiny = () => {
   isShiny.value = !isShiny.value
}

const playSound = () => {
   const cry = pokemon.value.cries
   new Audio(cry).play()
}

const showStat = ref(false)

const showStats = () => {
   showStat.value = true
}

const closeStats = () => {
   showStat.value = false
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
               <div v-if="showStat" class="w-full flex items-center justify-center flex-col px-2 py-4">
                  <div>
                     <apexchart
                        width="350"
                        height="500"
                        type="radar"
                        :options="statOptions"
                        :series="series"
                     ></apexchart>
                  </div>
                  <button class="cursor-scale cursor-none rounded-xl flex justify-center w-full mt-4 py-2 bg-zinc-200 z-50" @click="closeStats">
                     Go Back
                  </button>
               </div>
               <div v-else>
                  <div class="relative flex flex-col items-center justify-center"> 
                     <Transition name="fade" mode="out-in">
                        <img v-if="isShiny" class="object-contain w-1/2" :src="pokemon.sprites.official_artwork.front_shiny" :alt="pokemon.name">
                        <img v-else class="object-contain w-1/2" :src="pokemon.sprites.official_artwork.front_default" :alt="pokemon.name">
                     </Transition>
                     <span @click="showShiny" class="cursor-scale absolute border bottom-0 right-0 rounded-full w-max p-2 m-2 bg-zinc-200 z-50" :style="{color: pokemon.palette.accents[1]}">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
                     </span>
                  </div>
                  <div class="flex items-center justify-around w-full mb-1">
                     <h1 class="text-3xl">{{ pokemonName }}</h1>
                  </div>
                  <span class="mb-4">{{ genera }}</span>
                  <div class="flex items-center justify-center gap-2 w-full mb-4">
                     <div v-for="type in pokemonTypes" :key="type.name" class="text-white text-lg my-2 flex items-center justify-center rounded py-1.5" :style="{width: type.length < 2 ? '100px' : '100%', backgroundColor: type.color}">
                        <img :src="type.path" :alt="type.name" class="h-5 mr-2">
                        <span>{{ type.name }}</span>
                     </div>
                  </div>
                  <span>{{ flavorText }}</span>
                  <div class="flex w-full gap-2 px-2">
                     <div class="w-full flex items-center flex-col">
                        <button class="cursor-scale cursor-none rounded-xl flex justify-center w-full mt-4 py-2 bg-zinc-200 z-50" @click="playSound" :style="{color: pokemon.palette.accents[1]}">
                           <svg xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-ear"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10a7 7 0 1 1 13 3.6a10 10 0 0 1 -2 2a8 8 0 0 0 -2 3a4.5 4.5 0 0 1 -6.8 1.4" /><path d="M10 10a3 3 0 1 1 5 2.2" /></svg>
                        </button>
                        <small>Cry</small>
                     </div>
                     <div class="w-full flex items-center flex-col">
                        <button class="cursor-scale cursor-none rounded-xl flex justify-center w-full mt-4 py-2 bg-zinc-200 z-50" @click="showStats" :style="{color: pokemon.palette.accents[1]}">
                           <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20h14" /></svg>
                        </button>
                        <small>Stats</small>
                     </div>
                  </div>
               </div>
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
   
   .details {
      transform: skewX(25deg);
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

   .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s ease-in-out;
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0.5;
   }
</style>
