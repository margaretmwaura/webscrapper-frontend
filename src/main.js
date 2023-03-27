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
  faPaperclip
);

import { DefaultApolloClient } from '@vue/apollo-composable';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from '@apollo/client/core';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5000/graphql',
});

let token = localStorage.getItem('authToken');

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authtoken: token ? token : null,
      },
    }));
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  httpLink,
]);

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: additiveLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.use(VueSidebarMenu);
// app.use(vuetify);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');
