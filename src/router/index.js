import { createWebHistory, createRouter } from 'vue-router';
import Home from './../views/Home.vue';
import HomeTest from './../views/HomeTest.vue';
import SideBarMenu from './../views/SideBarMenu.vue';

// TODO: Renaming home to landing and SideBar to Home
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: HomeTest,
  },
  {
    path: '/home',
    name: 'Home',
    component: SideBarMenu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let token = localStorage.getItem('authToken');

router.beforeEach((to, from, next) => {
  if (to.name !== 'Landing' && !token) next({ name: 'Landing' });
  else next();
});

export default router;
