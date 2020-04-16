import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';
import { onErrorLink } from './links';

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = 'eddy-automl-ui-token';

// Config
const defaultOptions = {
    // Enable Automatic Query persisting with Apollo Engine
    persisting: false,
    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    websocketsOnly: false,
    // Token name
    tokenName: AUTH_TOKEN,
    // Is being rendered on the server?
    ssr: false,

    // Override default apollo link
    // note: don't override httpLink here, specify httpLink options in the
    // httpLinkOptions property of defaultOptions.
    link: onErrorLink

    // Override default cache
    // cache: myCache

    // Override the way the Authorization header is set
    // getAuth: (tokenName) => ...

    // Additional ApolloClient options
    // apollo: { ... }

    // Client local data (see apollo-link-state)
    // clientState: { resolvers: { ... }, defaults: { ... } }
};

function createClient(options = {}) {
    const { apolloClient, wsClient } = createApolloClient({
        ...defaultOptions,
        ...options
    });

    apolloClient.wsClient = wsClient;
    return apolloClient;
}

// Export the apollo clients for usage outside the Vue instance (.js files)
export let authClient;
export let dataClient;

// Call this in the Vue app file
export function createProvider(authClientOptions = {}, dataClientOptions = {}) {
    authClient = createClient(authClientOptions);
    dataClient = createClient(dataClientOptions);

    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        clients: {
            authClient,
            dataClient
        },
        defaultClient: dataClient,
        defaultOptions: {
            $query: {
                // fetchPolicy: 'cache-and-network',
            }
        },
        errorHandler(error) {
            // eslint-disable-next-line no-console
            console.log(
                '%cError',
                'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                error.message
            );
        }
    });

    return apolloProvider;
}

// Manually call this when user log in
export async function onLogin() {
    if (dataClient.wsClient) restartWebsockets(dataClient.wsClient);
    try {
        await dataClient.resetStore();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('%cError on cache reset (login)', 'color: orange;', e.message);
    }
}

// Manually call this when user log out
export async function onLogout() {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN);
    }
    if (dataClient.wsClient) restartWebsockets(dataClient.wsClient);
    try {
        await dataClient.resetStore();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
    }
}
