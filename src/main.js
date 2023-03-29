import { createApp, provide, h } from 'vue';
import router from './router';
// import './style.css';
import App from './App.vue';
import './index.css';

import * as te from 'tw-elements';

import 'vue3-toastify/dist/index.css';

import VueSidebarMenu from 'vue-sidebar-menu';
// import 'custom-var.scss';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

import { createPinia } from 'pinia';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { apolloClient } from './apolloClient';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faPlay,
  faCheck,
  faQuoteLeft,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUser,
  faUserGraduate,
  faSearch,
  faClock,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';

import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faCalendar,
  faBarChart,
} from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(
  faPlay,
  faCheck,
  faQuoteLeft,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faUserGraduate,
  faCalendar,
  faSearch,
  faClock,
  faPaperclip,
  faBarChart
);

import { DefaultApolloClient } from '@vue/apollo-composable';

const pinia = createPinia();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(pinia);
app.use(router);
app.use(VueSidebarMenu);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

// app.use(vuetify);
