import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ComparisonPage from '@/views/ComparisonPage.vue'
import Infos from '@/views/Infos.vue'
import Resources from '@/views/Resources.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // Le layout principal
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'infos', name: 'infos', component: Infos },
        { path: 'resources', name: 'resources', component: Resources },
        { path: 'lungs', name: 'lungs', component: ComparisonPage },
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
