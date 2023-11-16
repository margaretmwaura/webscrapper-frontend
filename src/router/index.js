import { createWebHistory, createRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

// TODO: Renaming home to landing and SideBar to Home
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./../views/Home.vue'),
  },
  {
    path: '/home',
    // name: 'home',
    component: () => import('./../views/SideBarMenu.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('./../views/LearningPage.vue'),
      },
      {
        path: '/notes',
        name: 'Notes',
        component: () => import('./../views/Notes.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./../views/Calendar.vue'),
      },
    ],
  },
];

let router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const { token } = storeToRefs(store);
  if (to.name !== 'Landing' && !token.value) next({ name: 'Landing' });
  else next();
});

export default router;
