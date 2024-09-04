<script setup>

import { computed } from 'vue';

const { pokemon } = defineProps({
    pokemon: Object
})

const genera = computed (() => {
    return pokemon.genera.find(entry => entry.language === 'en')?.genus
}) 

const sprite = computed (() => {
    return pokemon.sprites.official_artwork.front_default !== null ?
        pokemon.sprites.official_artwork.front_default 
        : pokemon.sprites.front_default 
})

const name = computed (() => {
    return pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
})

</script>

<template>
    <div class="flex flex-col items-center w-52">
        <div class="col w-full px-1.5 pt-2 text-center">
            <div class="flex justify-between">
                <h1 class="text-2xl">{{ name }}</h1>
                <h1 class="font-light">{{ pokemon.id }}</h1>
            </div>
           
            <p>{{ genera }}</p>
        </div>
        
        <div class="flex items-center gap-2 px-2 mt-2 w-full">
            <div 
                v-for="type in pokemon.types"
                :key="type.name"
                class="border text-center"
                :style="{width: type.length < 2 ? '100px' : '100%'}"
                >
                {{ type.name }}
            </div>
        </div>
        <img :src="sprite" :alt="pokemon.name">
    </div>
</template>