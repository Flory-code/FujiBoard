<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
    id:Number,
    imageUrl: String,
    title:String,
    price:Number
    })
</script>
<template>
    <div class="flex items-center border border-slate-400 p-4 rounded-xl gap-4">
        <img :src="imageUrl" alt="keyboard" class="w-26 h-26">

        <div class="flex flex-col flex-1">
            <p>{{ title }}</p>
            

            <div class="flex justify-between mt-2">
                <b class="flex-1">{{ price }} руб.</b>
                <img 
                @click="emit('onClickRemove')"
                 class="opacity-60 hover:opacity-100 transition cursor-pointer" 
                 src="/close.svg" alt="">
            </div>
        </div>
    </div>
</template>