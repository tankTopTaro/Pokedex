<script setup>

import { computed } from 'vue';

const props = defineProps({
    pokedex: Object
})

const genera = (pokemon) => {
    const genus = pokemon.genera.find(entry => entry.language === 'en')?.genus
    return genus
}

</script>

<template>
    <div 
        v-for="pokemon in props.pokedex" 
        :key="pokemon.id" 
        class="border flex flex-col items-center justify-center"
        :style="{background: pokemon.palette.base}">
        <p>{{ pokemon.id }}</p>
        <p>{{ pokemon.name }}</p>
        <p>{{ genera(pokemon) }}</p>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" loading="lazy">
        <p v-for="type in pokemon.types">{{ type.name }}</p>
    </div>
</template>