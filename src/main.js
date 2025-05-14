import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'


import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const routes = [
  { path: '/', name:'Home', component: Home },
  { path: '/Favorites',name:'Favorites', component: Favorites },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})
const app = createApp(App)

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
