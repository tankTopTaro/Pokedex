<script setup>
import { computed, ref } from 'vue'

const { pokemon } = defineProps({
    pokemon: Object,
})



const currentImage = computed(() => {
    return hovered ? pokemon.sprites.front_shiny : pokemon.sprites.front_default
})

</script>

<template>
    <div class="flex items-center object-contain" @click="openModal">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" loading="lazy">
    </div>
</template>