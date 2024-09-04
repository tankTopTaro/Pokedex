<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Pokedex from './views/Pokedex.vue';

const pokedex = ref([])

onMounted(async () => {
 try {
    const response = await axios.get('http://localhost:5000/api/pokedex')
    pokedex.value = response.data
    console.log(response.data)
 } catch (error) {
    console.error('Error @ App.vue: ', error)
 }
})

</script>

<template>
   <Pokedex :pokedex="pokedex"/>
</template>
