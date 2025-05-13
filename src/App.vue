<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Cardlist from './components/Cardlist.vue'
import Drawer from './components/Drawer.vue'
import InfoBlock from './components/InfoBlock.vue'


const items = ref([])
const cart = ref([]) 
const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)

const vatPrice = computed(() => Math.round((totalPrice.value * 5 ) / 100))

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const closeDrawer = () => {
    drawerOpen.value = false
}

const openDrawer = () => {
    drawerOpen.value = true
}

const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
})

const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
}

const createOrder = async () => {
    try {
        isCreatingOrder.value = true
        const { data } = await axios.post(`https://7046e39e8a82c704.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: totalPrice.value,
        })

        cart.value = []

        return data;
    } catch(err){
        console.log(err)
    } finally {
        isCreatingOrder.value = false
    }
}

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
    console.log(cart)
}




const onChangeSelect = (event) => {
    filters.sortBy = event.target.value;
}

const onChangeInput = (event) => {
    filters.searchQuery = event.target.value;
}

const fetchFavorites = async () => {
    try{
        const { data : favorites } = await axios.get(`https://7046e39e8a82c704.mokky.dev/favorites`)
       

        items.value = items.value.map(item => {
            const favorite = favorites.find((favorite) => favorite.parentId === item.id);

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

const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite){
        const obj = {
            parentId: item.id
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
    await fetchItems()
    await fetchFavorites()
})


watch(filters,fetchItems)

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
})

</script>

<template>

   <Drawer v-if="drawerOpen" 
   :total-price="totalPrice" 
   :vat-price="vatPrice" 
   @create-order="createOrder" 
   :button-disabled="cartButtonDisabled"/>



    <div panel-1-34
    class="
    mt-14
    shadow-xl
    rounded-2xl
    bg-white
    w-4/5
    m-auto

    ">

        <Header :total-price="totalPrice" @open-drawer="openDrawer" @create-order="createOrder"/>
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


            
            <Cardlist :items="items" @add-To-Favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>
        </div>


    </div>

</template>

<style scoped>

</style>
