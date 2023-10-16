// Deleted code link https://stackoverflow.com/questions/72250439/how-to-set-authentications-headers-with-vue-apollo-and-composition-api
// Current implementation https://www.newline.co/@kchan/building-a-graphql-application-with-vue-3-and-apollo--4679b402
// Guide https://www.apollographql.com/docs/react/networking/authentication/
// FIXME: Only solution working is to use localstorage,
// The pnly way to stay secure is to clear and set after every call

// Difference between vue2 and vue3
// https://www.apollographql.com/blog/frontend/getting-started-with-vue-apollo/

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from,
  concat,
  split,
} from '@apollo/client/core';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://51.20.136.216:5000/graphql',
  })
);

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://51.20.136.216:5000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  let authToken = localStorage.getItem('authToken');
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authtoken: authToken ? authToken : null,
    },
  }));
  return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // httpLink
  concat(authMiddleware, httpLink)
);

const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: link,
  cache,
});
