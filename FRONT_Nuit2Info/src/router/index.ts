import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ComparisonPage from '@/views/ComparisonPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // Le layout principal
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'pulmon', name: 'pulmon', component: ComparisonPage },
        { path: 'heart', name: 'heart', component: ComparisonPage},
        { path: 'skin', name: 'skin', component: ComparisonPage},
        { path: 'stomac', name: 'stomac', component: ComparisonPage},
        { path: 'neurons', name: 'neurons', component: ComparisonPage},
        { path: 'muscles', name: 'muscles', component: ComparisonPage},
        {path: 'blood', name: 'blood', component: ComparisonPage},
        {path: 'immunity', name: 'immunity', component: ComparisonPage},
      ],
    },
  ],
})

export default router
