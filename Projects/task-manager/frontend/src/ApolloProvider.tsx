import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // URL of your GraphQL server
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider client={client}>
    {children}
  </Provider>
);