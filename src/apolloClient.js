// apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
// FIXME: Change this to be using the bearer token format
function getHeaders() {
  const headers = {};
  if (localStorage.getItem('authtoken')) {
    headers['authtoken'] = localStorage.getItem('authtoken');
  }
  headers['Content-Type'] = 'application/json';
  return headers;
}

// Create an http link:
// FIXME: Move this to the env
const httpLink = new HttpLink({
  uri: `http://localhost:5000/graphql`,
  fetch: (uri, options) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
