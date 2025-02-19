<script setup>
import { onMounted, ref, watch, reactive } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue'
import Cardlist from './components/Cardlist.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])


const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
})


const onChangeSelect = (event) => {
    filters.sortBy = event.target.value;
}

const onChangeInput = (event) => {
    filters.searchQuery = event.target.value;
}

const fetchItems = async () => {
    try{
        const params = {
            sortBy: filters.sortBy,
        }

        if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
        }

        const { data } = await axios.get('https://7046e39e8a82c704.mokky.dev/items',{params})

        items.value = data;

    }   catch(err) {
        console.log(err)
    }    
}

onMounted(fetchItems)


watch(filters,fetchItems)
</script>

<template>

    <!-- <Drawer/> -->

    <div
    class="
    mt-14
    shadow-xl
    rounded-2xl
    bg-white
    w-4/5
    m-auto

    ">

        <Header/>
        <div class="p-10">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl font-bold">Весь товар</h2>

                <div class="flex gap-2.5">
                    <select @change="onChangeSelect" class="py-2 px-2 border rounded-md outline-none border-gray-500" name="" id="">
                        <option value="name">По названию</option>
                        <option value="price">По цене(дешевле)</option>
                        <option value="-price">По цене(дороже)</option>
                    </select>

                    <div class="relative">
                        <img class="absolute left-3 top-3" src="/search.svg" >
                        <input 
                        @input="onChangeInput"
                        class="border border-gray-500 rounded-md py-1.5 pl-10 pr-4 outline-none focus:border-gray-400"
                        placeholder="Поиск...">
                    </div>
                </div>
            </div>



            <Cardlist :items="items"/>
        </div>


    </div>

</template>

<style scoped>

</style>
