<script setup>
import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';
import InfoBlock from './InfoBlock.vue';
import { inject, ref, computed } from 'vue';
import axios from 'axios';

const emit = defineEmits(['createOrder'])
const isCreating = ref(false)
const {cart, closeDrawer} = inject('cart')
const orderId = ref(null)

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
    buttonDisabled: Boolean
})
const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

const createOrder = async () => {
    try {
        isCreating.value = true
        const { data } = await axios.post(`https://7046e39e8a82c704.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: props.totalPrice.value,
        })

        cart.value = []
        orderId.value = data.id

    } catch(err){
        console.log(err)
    } finally {
        isCreating.value = false
    }
}


</script>
<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 bg-black/75 ">

        <div class="bg-white w-150 h-full fixed right-0 top-0 z-20 p-8">
            <DrawerHead/>

            
            <div v-if="!totalPrice || orderId" class="flex h-full items-center">
                
                <InfoBlock 
                v-if="!totalPrice && !orderId"
                title="Корзина пустая" 
                description="йоу" 
                image-url="/package-icon.png"
                />

                <InfoBlock 
                v-if="orderId"
                title="Заказ оформлен" 
                :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`" 
                image-url="/order-success-icon.png"

                />
            

            </div>

            <div v-else>    
            <CartItemList v-auto-animate/>

            <div v-if="totalPrice">
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
                :disabled="buttonDisabled"
                @click="createOrder"
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

            </div>
    </div>
</template>

