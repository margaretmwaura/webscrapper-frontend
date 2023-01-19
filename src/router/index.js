import { createWebHistory, createRouter } from 'vue-router';
import Home from './../views/Home.vue';
import Auth from './../views/Auth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
