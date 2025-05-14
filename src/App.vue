<script setup>
import { ref, watch, provide, computed } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'




const cart = ref([]) 


const drawerOpen = ref(false)

const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)

const vatPrice = computed(() => Math.round((totalPrice.value * 5 ) / 100))



// Корзина

const closeDrawer = () => {
    drawerOpen.value = false
}

const openDrawer = () => {
    drawerOpen.value = true
}

const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
}




watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    { deep: true }
)

provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
})
// _______________________________________________________________





</script>

<template>

   <Drawer v-if="drawerOpen" 
   :total-price="totalPrice" 
   :vat-price="vatPrice" 
   @create-order="createOrder" 
   />



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
            <router-view></router-view>
        </div>


    </div>

</template>

<style scoped>

</style>
