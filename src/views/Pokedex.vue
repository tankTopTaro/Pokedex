<script setup>

import { computed } from 'vue';

const props = defineProps({
    pokedex: Object
})

const genera = (pokemon) => {
    const genus = pokemon.genera.find(entry => entry.language === 'en')?.genus
    return genus
}

const switchSprite = (pokemon) => {
    if (pokemon.sprites.official_artwork.front_default === null) {
        return pokemon.sprites.front_default
    } else {
        return pokemon.sprites.official_artwork.front_default
    }
}

</script>

<template>
    <div class="grid grid-cols-6 lg:grid-cols-9">
        <div 
            v-for="pokemon in props.pokedex" 
            :key="pokemon.id" 
            class="border flex flex-col items-center"
            :style="{background: pokemon.palette.accents[2]}">
            <p>{{ pokemon.id }}</p>
            <p>{{ pokemon.name }}</p>
            <p>{{ genera(pokemon) }}</p>
            <img :src="switchSprite(pokemon)" :alt="pokemon.name" loading="lazy" width="100px">
            <p v-for="type in pokemon.types">{{ type.name }}</p>
        </div>
    </div>
</template>