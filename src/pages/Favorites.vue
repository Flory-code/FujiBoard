<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import Cardlist from '../components/Cardlist.vue';

const favorites = ref()

onMounted(async () => {
    try {
        const { data } = await axios.get(`https://7046e39e8a82c704.mokky.dev/favorites?_relations=items`)

        favorites.value = data.map((obj) => obj.item)

    } catch (err) {
        console.log(err)
    }
})


</script>


<template>
    
    <h2 class="text-3xl font-bold p-3">Весь товар</h2>
    <Cardlist :items="favorites" /> 
</template>