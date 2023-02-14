import { createWebHistory, createRouter } from 'vue-router';
import Home from './../views/Home.vue';
// import Auth from './../views/Auth.vue';
import HomeTest from './../views/HomeTest.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeTest,
  },
  // {
  //   path: '/auth',
  //   name: 'Auth',
  //   component: Auth,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
