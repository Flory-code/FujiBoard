<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { cart, removeFromCart } = inject('cart')


</script>

<template>    
    <div class="flex flex-col gap-4 flex-1">
        <CartItem v-for="item in cart" 
        :key="item.id" 
        :title="item.title" 
        :price="item.price" 
        :image-url="item.imageUrl" 
        @on-click-remove="() => removeFromCart(item)"
        />  
    </div>
</template>