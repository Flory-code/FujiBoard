<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
    totalPrice:Number
})
</script>

<template>
    <header class="flex items-center border-b border-slate-300 px-10 py-8">

        <router-link to="/">        
        <div class="flex gap-4">
            <img src="/logo3.svg" alt="logo" class="w-10">
            <div>
                <h2 class="text-xl font-bold uppercase">FujiBoard</h2>
                <p class="text-slate-600">Магазин клавиатур</p>
            </div>
        </div>
        </router-link>

        <div class="flex space-x-10 ml-auto ">
            <ul class="flex ">
                <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                    <img src="/cart.svg" alt="cart">
                    <b>{{ totalPrice }}р.</b>
                </li>
            </ul>

            <router-link to ="favorites">
                <ul class="flex items-center">
                    <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                        <img src="/heart.svg" alt="heart">
                        <b>Закладки</b>
                    </li>
                </ul>
            </router-link>


        </div>

    </header>
</template>
