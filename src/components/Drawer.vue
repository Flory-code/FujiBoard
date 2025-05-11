<script setup>
import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';

const emit = defineEmits(['createOrder'])

defineProps({
    totalPrice: Number,
    vatPrice: Number
})
</script>
<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 bg-black/75 ">

        <div class="bg-white w-120 h-full fixed right-0 top-0 z-20 p-8">
            <DrawerHead/>
            <CartItemList/>

            <div class="flex flex-col gap-3 mb-5 my-7">

                <div class="flex gap-1">

                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dotted"></div>
                    <b>{{ totalPrice }} ₽</b>
                    
                </div>

                <div class="flex gap-1">

                    <span>Доставка:</span>
                    <div class="flex-1 border-b border-dotted"></div>
                    <b>{{ vatPrice }} ₽</b>
                    
                </div>
            </div>


            <button
            :disabled="totalPrice ? false : true"
            @click="() => emit('createOrder')"
            class="bg-lime-500
            w-full
            rounded-xl
            py-5
            text-white
            cursor-pointer
            disabled:bg-slate-400
            hover:bg-lime-600
            hover:transition
            active:bg-lime-700">
            Оформить заказ
        </button>
            
        </div>

    </div>
</template>

