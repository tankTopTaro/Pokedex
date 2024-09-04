<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Pokedex from './views/Pokedex.vue';

const pokedex = ref([])

const showNull = async () => {
   try {
      const response = await axios.get('http://localhost:5000/api/null')
      pokedex.value = response.data
   } catch (error) {
      console.error('Error @ showNull: ', error)
   }
}

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
   <h1>Pokemon</h1>
   <button class="border bg-blue-300" @click="showNull">Show all null</button>
   <Pokedex :pokedex="pokedex"/>
</template>
