import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri:
    "https://vercel-apollo-endpoint-one.vercel.app/" ||
    "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      AttributeSet: { keyFields: false },
      Attribute: { keyFields: false },
    },
  }),
});

export default client;
