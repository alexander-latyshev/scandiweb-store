import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    AttributeSet: { keyFields: false },
    Attribute: { keyFields: false },
  }),
});

export default client;
