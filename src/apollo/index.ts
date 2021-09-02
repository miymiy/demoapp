import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          orders: {
            merge(_, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
});

export default client;
