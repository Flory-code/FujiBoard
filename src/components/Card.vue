<script setup>
import {inject} from 'vue'
const props = defineProps({
    id:Number,
    imageUrl: String,
    title:String,
    price:Number,
    isFavorite:Boolean,
    isAdded:Boolean,
    onClickAdd: Function,

    onClickFavorite: Function
  
})

const addToFavorite = inject('addToFavorite')

const onClickFavorite = () => {
    const obj = {
        ...props,
        parentId: props.id
    };

    addToFavorite(obj);
}
</script>

<template>


        <div class="relative bg-white border border-slate-400 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">

            


            <img @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="like1" class="absolute top-8 left-8">

            <img :src="imageUrl" alt="keyboard" class="">
            <p class="mt-2">{{ title }}</p>

            <div class="flex justify-between mt-3">
                <div  class="flex flex-col">
                    <span class="text-slate-500">Цена:</span>
                    <b>{{ price }} руб.</b>
                </div>
            

            <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">
            </div>
        </div>

</template>