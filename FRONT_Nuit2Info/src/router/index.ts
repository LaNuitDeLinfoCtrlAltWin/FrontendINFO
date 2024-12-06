import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import PulmonPage from '@/views/PulmonPage.vue'
import HeartPage from '@/views/HeartPage.vue'
import SkinPage from '@/views/SkinPage.vue'
import LiverPage from '@/views/LiverPage.vue'
import NeuronsPage from '@/views/NeuronsPage.vue'
import MusclePage from '@/views/MusclePage.vue'
import BloodPage from '@/views/BloodPage.vue'
import ImmuneSystemPage from '@/views/ImmuneSystemPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // Le layout principal
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'pulmon', name: 'pulmon', component: PulmonPage },
        { path: 'heart', name: 'heart', component: HeartPage},
        { path: 'skin', name: 'skin', component: SkinPage},
        { path: 'liver', name: 'liver', component: LiverPage},
        { path: 'neurons', name: 'neurons', component: NeuronsPage},
        { path: 'muscles', name: 'muscles', component: MusclePage},
        {path: 'blood', name: 'blood', component: BloodPage},
        {path: 'immunity', name: 'immunity', component: ImmuneSystemPage},
      ],
    },
  ],
})

export default router
