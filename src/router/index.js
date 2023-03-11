import { createWebHistory, createRouter } from 'vue-router';
import SidebarMenu from './../views/SideBarMenu.vue';
import Home from './../views/HomeTest.vue';

// TODO: Renaming home to landing and SideBar to Home
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./../views/HomeTest.vue'),
  },
  {
    path: '/home',
    // name: 'Home',
    component: () => import('./../views/SideBarMenu.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('./../views/Dashboard.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./../views/Dashboard.vue'),
      },
    ],
  },
];

let router = createRouter({
  history: createWebHistory(),
  routes,
});

let token = localStorage.getItem('authToken');

router.beforeEach((to, from, next) => {
  console.log(token);
  if (to.name !== 'Landing' && !token) next({ name: 'Landing' });
  else next();
});

export default router;
