import { createApp, provide, h } from 'vue';
import router from './router';
// import './style.css';
import App from './App.vue';
import './index.css';

import { DefaultApolloClient } from '@vue/apollo-composable';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { apolloClient } from './apolloClient';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faPlay,faCheck,faQuoteLeft,faArrowRight,faArrowLeft,
   faTimes, faUser } from '@fortawesome/free-solid-svg-icons';


import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import { createPinia } from 'pinia';
import { firebaseAmin } from './firebase';

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
