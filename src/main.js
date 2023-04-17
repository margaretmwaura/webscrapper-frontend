import { createApp, provide, h } from 'vue';
import router from './router';
import { createI18n } from 'vue-i18n';
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

import Particles from 'vue3-particles';

import { FRENCH_TRANSLATIONS } from './translations/fr';

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
  faPaperclip,
  faArrowUp,
  faWaveSquare,
  faVolumeUp,
  faBookOpen,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';

import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faCalendar,
  faBarChart,
  faClock,
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
  faBarChart,
  faArrowUp,
  faWaveSquare,
  faVolumeUp,
  faBookOpen,
  faMusic
);

import { DefaultApolloClient } from '@vue/apollo-composable';

const TRANSLATIONS = {
  fr: FRENCH_TRANSLATIONS,
};

// 2. Create i18n instance with options
const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: 'fr', // set locale
  fallbackLocale: 'fr', // set fallback locale
  messages: TRANSLATIONS,
  enableLegacy: false,
  runtimeOnly: false,
  compositionOnly: false,
  fullInstall: true,
});

const pinia = createPinia();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(Particles);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(VueSidebarMenu);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

// app.use(vuetify);
