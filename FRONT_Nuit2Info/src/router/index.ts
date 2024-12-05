import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import PulmonPage from '@/views/PulmonPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // Le layout principal
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'pulmon', name: 'pulmon', component: PulmonPage },
      ],
    },
  ],
})

export default router
