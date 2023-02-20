import { createApp, provide, h } from 'vue';
import router from './router';
// import './style.css';
import App from './App.vue';
import './index.css';

import { DefaultApolloClient } from '@vue/apollo-composable';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from '@apollo/client/core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faPlay,
  faCheck,
  faQuoteLeft,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';

import { createPinia } from 'pinia';

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
  faEyeSlash
);

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
// app.use(vuetify);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');
