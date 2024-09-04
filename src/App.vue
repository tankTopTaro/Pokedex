<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const pokemons = ref([])

onMounted(async () => {
 try {
    const response = await axios.get('http://localhost:5000/api/pokedex')
    pokemons.value = response.data
    console.log(response.data)
 } catch (error) {
    console.error('Error @ App.vue: ', error)
 }
})

</script>

<template>

</template>
