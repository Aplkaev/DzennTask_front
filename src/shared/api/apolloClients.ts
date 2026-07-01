import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { onError } from '@apollo/client/link/error';



const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_GRAPHQL_URL}`,   // ← очень важно!
});

// Auth Link — добавляет JWT токен
const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// =========================
// ERROR LINK
// =========================
const errorLink = onError(({ error, operation, forward }) => {
  if (
    error &&
    'message' in error &&
    error.message.includes('Received status code 401')
  ) {
    useAuthStore.getState().logout();

    window.location.href = '/login';
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    // Опционально: как обрабатывать ID (особенно важно для Relay-style pagination)
    typePolicies: {
      Query: {
        fields: {
          projects: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});