<script setup>
    import { ref, computed } from 'vue'
    import Types from '../objects/Types.js'

    const { pokemon, series } = defineProps({
        pokemon: Object,
        series: Object
    })

    const showStat = ref(false)
    const isShiny = ref(false)

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

    const genera = computed (() => {
        return pokemon.genera.find(entry => entry.language === 'en')?.genus
    }) 

    const pokemonName = computed (() => {
        return pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    })

    const flavorText = computed (() => {
        const text = pokemon.flavor_text_entries.slice().reverse().find(en => en.language === 'en')

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
        return matchType(pokemon.types, Types)
    })

    const showShiny = () => {
        isShiny.value = !isShiny.value
    }

    const playSound = () => {
        const cry = pokemon.cries
        new Audio(cry).play()
    }

    const showStats = () => {
        showStat.value = true
    }

    const closeStats = () => {
        showStat.value = false
    }
</script>

<template>
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
</template>

<style scoped>
   .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s ease-in-out;
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0.5;
   }
</style>