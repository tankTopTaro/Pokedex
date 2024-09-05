<script setup>

import { computed } from 'vue';

const { pokemon } = defineProps({
    pokemon: Object
})

const genera = computed (() => {
    return pokemon.genera.find(entry => entry.language === 'en')?.genus
}) 

const name = computed (() => {
    return pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
})

</script>

<template>
    <div class="flex items-center w-24 h-24">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>