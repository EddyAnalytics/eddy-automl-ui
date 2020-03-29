import { api } from './index';

// Add a request interceptor
api.interceptors.request.use(
    request => {
        // Assign the refreshed token on every request.
        const token = localStorage.getItem('eddy-automl-ui-token');
        const lang = localStorage.getItem('lang');
        if (token) request.headers['Authorization'] = 'Bearer ' + token;
        request.headers['Accept-Language'] = lang || 'en';
        return Promise.resolve(request);
    },
    error => {
        return Promise.reject(error);
    }
);
