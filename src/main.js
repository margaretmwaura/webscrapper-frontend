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
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { createPinia } from 'pinia';
import { firebaseAmin } from './firebase';

// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

// const vuetify = createVuetify({
//   components,
//   directives,
// });

/* add icons to the library */
library.add(
  faPlay,
  faCheck,
  faQuoteLeft,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUser,
  faEnvelope
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
