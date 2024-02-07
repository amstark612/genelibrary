import { createRouter, createWebHistory } from 'vue-router'
import SearchView from './views/SearchView.vue'

const routes = [
  { 
    path: '/gene/:id', 
    name: 'gene',
    component: () => import("./views/GeneView.vue")
  },
  {
    path: '/',
    name: 'index',
    component: SearchView,
  },
  { 
    path: '/search', 
    name: 'search',
    component: SearchView 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
