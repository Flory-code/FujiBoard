<template>
    <header class="flex justify-between border-b border-slate-300 px-10 py-8">
        <div class="flex items-center gap-4">
            <img src="/logo3.svg" alt="logo" class="w-10">
            <div>
                <h2 class="text-xl font-bold uppercase">FujiBoard</h2>
                <p class="text-slate-600">Магазин клавиатур</p>
            </div>
        </div>
        
        <ul class="flex items-center">
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/cart.svg" alt="cart">
                <b>999р.</b>
            </li>
        </ul>

        <ul class="flex items-center">
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/heart.svg" alt="heart">
                <b>Закладки</b>
            </li>
        </ul>

        <ul class="flex items-center">
            <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img src="/profile.svg" alt="Profile">
                <b>Профиль</b>
            </li>
        </ul>

    </header>
</template>
