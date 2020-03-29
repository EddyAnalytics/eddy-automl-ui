import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@/services/graphql';
import Buefy from 'buefy';

Vue.config.productionTip = false;

Vue.use(Buefy);
const configFileName =
    process.env.NODE_ENV === 'production' ? 'config.json' : process.env.NODE_ENV + '.json';

import { api } from '@/services/rest';

api.get('/config/' + configFileName).then(res => {
    const config = res.data;
    Vue.prototype.$config = {
        ...config,
        debug: config.debug || process.env.NODE_ENV === 'development'
    };

    // Set the REST API default URL
    api.defaults.baseURL = config.api.url;

    // Set Apollo client settings
    const apolloOptions = {
        httpEndpoint: config.graphql.httpEndpoint,
        wsEndpoint: config.graphql.wsEndpoint
    };

    new Vue({
        el: '#app',
        router,
        apolloProvider: createProvider(apolloOptions),
        render: h => h(App)
    });
});
