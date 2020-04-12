import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from './router';
import { api } from '@/services/rest';
import { createProvider } from '@/services/graphql';
import Buefy from 'buefy';

Vue.config.productionTip = false;

Vue.use(Buefy);
const configFileName =
    process.env.NODE_ENV === 'production' ? 'config.json' : process.env.NODE_ENV + '.json';

api.get('/config/' + configFileName).then(res => {
    const config = res.data;
    Vue.prototype.$config = {
        ...config,
        debug: config.debug || process.env.NODE_ENV === 'development'
    };

    // Set Apollo clients settings
    const authClientOptions = {
        httpEndpoint: config.dataGraphQLClient.httpEndpoint
    };

    const dataClientOptions = {
        httpEndpoint: config.dataGraphQLClient.httpEndpoint,
        wsEndpoint: config.dataGraphQLClient.wsEndpoint
    };

    new Vue({
        el: '#app',
        router,
        store,
        apolloProvider: createProvider(authClientOptions, dataClientOptions),
        render: h => h(App)
    });
});
