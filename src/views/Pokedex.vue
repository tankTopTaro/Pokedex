<script setup>

import { computed } from 'vue';
import Pokemon from './Pokemon.vue';

const props = defineProps({
    pokedex: Object
})

</script>

<template>
    <div class="flex flex-wrap">
        <div 
            v-for="pokemon in props.pokedex" 
            :key="pokemon.id" 
            class="border flex flex-col items-center"
            :style="{background: pokemon.palette.accents[2]}">
            <Pokemon :pokemon="pokemon" />
        </div>
    </div>
</template>