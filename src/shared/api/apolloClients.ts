import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { onError } from '@apollo/client/link/error';
import { ServerError } from '@apollo/client/errors';



const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_GRAPHQL_URL}`,   // ← очень важно!
});

// Auth Link — добавляет JWT токен
const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token;

  // Без токена заголовок не шлём: loginUser/registerUser работают анонимно,
  // а протухший токен дал бы 401 ещё до мутации.
  return {
    headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
  };
});

// =========================
// ERROR LINK
// =========================
// 401 приходит только от JWT-фаервола (протух/битый токен). Неверный пароль в loginUser —
// обычная GraphQL-ошибка с HTTP 200, сюда не попадает.
const errorLink = onError(({ error }) => {
  if (ServerError.is(error) && error.statusCode === 401) {
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
            merge(_existing, incoming) {
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