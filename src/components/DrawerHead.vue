<script setup>
import { inject } from 'vue';

const { closeDrawer } = inject(['cart']);
</script>
<template>
<div class="flex items-center gap-5 mb-8">
    <svg @click="closeDrawer" class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"  width="16" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h13.714M8.714 1l6 6-6 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <h2 class="text-2xl font-bold">Корзина</h2>
</div>
</template>