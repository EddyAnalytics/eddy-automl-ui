import { config } from '@vue/test-utils';
import testingConfig from '../../public/config/testing.json';

config.mocks.$config = testingConfig;
config.mocks['$apollo'] = {
    query: () => {},
    addSmartSubscription: () => {}
};
