<script setup>
import { reactive, watch, ref, onMounted } from 'vue'

import { inject } from 'vue';
import Cardlist from '../components/Cardlist.vue'
import axios from 'axios'

const {cart, addToCart, removeFromCart} = inject('cart')

const items = ref([])




const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
})


const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
}

const onChangeSelect = (event) => {
    filters.sortBy = event.target.value;
}

const onChangeInput = (event) => {
    filters.searchQuery = event.target.value;
}
const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite){
        const obj = {
            item_id: item.id,
        };
        item.isFavorite = true
        const { data } = await axios.post(`https://7046e39e8a82c704.mokky.dev/favorites`, obj);


        item.favoriteId = data.id;
        
        console.log(data);
        } else {
            item.isFavorite = false
            await axios.delete(`https://7046e39e8a82c704.mokky.dev/favorites/${item.favoriteId}`);
            item.favoriteId = null
        }
    } catch (err) {
        console.log(err)
    }
}



const fetchFavorites = async () => {
    try{
        const { data : favorites } = await axios.get(`https://7046e39e8a82c704.mokky.dev/favorites`)
       

        items.value = items.value.map(item => {
            const favorite = favorites.find((favorite) => favorite.item_id === item.id);

            if (!favorite) {
                return item;
            }

            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id,
            }
        });
    }   catch(err) {
        console.log(err)
    }    
}


const fetchItems = async () => {
    try{
        const params = {
            sortBy: filters.sortBy,
        }

        if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
        }

        const { data } = await axios.get(`https://7046e39e8a82c704.mokky.dev/items`,{params})

        items.value = data.map((obj) => ({

            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false
        }))


    }   catch(err) {
        console.log(err)
    }    
}


onMounted(async () => {
    const localCart = localStorage.getItem('cart')
    cart.value = localCart ? JSON.parse(localCart) : []

    await fetchItems()
    await fetchFavorites()

        items.value = items.value.map((item) => ({
        ...item,
        isAdded:cart.value.some((cartItem) => cartItem.id === item.id)
    }))
})


watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

watch(filters,fetchItems)


</script>
<template>
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


            <Cardlist v-auto-animate :items="items" @add-To-Favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>
</template>