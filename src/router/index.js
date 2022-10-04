import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/alquran/',
      name: 'root',
      component: HomeView
    },
    {
      path: '/alquran/:id',
      name: 'sura',
      component: HomeView
    },
  ]
})

export default router
