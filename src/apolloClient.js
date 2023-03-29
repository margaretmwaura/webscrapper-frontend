// Deleted code link https://stackoverflow.com/questions/72250439/how-to-set-authentications-headers-with-vue-apollo-and-composition-api
// Current implementation https://www.newline.co/@kchan/building-a-graphql-application-with-vue-3-and-apollo--4679b402
// Guide https://www.apollographql.com/docs/react/networking/authentication/
// FIXME: Only solution working is to use localstorage,
// The pnly way to stay secure is to clear and set after every call

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from,
  concat,
} from '@apollo/client/core';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5000/graphql',
});

const authMiddleware =
  //  from([
  new ApolloLink((operation, forward) => {
    let authToken = localStorage.getItem('authToken');
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authtoken: authToken ? authToken : null,
      },
    }));
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  });
//   httpLink,
// ]);

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});
