import { authClient, onLogin, onLogout } from '@/services/graphql';
import LOGIN_MUTATION from '@/graphql/mutations/login.gql';

const namespace = 'auth/';

export const AUTH = Object.freeze({
    SET_USER: namespace + 'set_user',
    LOGIN: namespace + 'login',
    LOGOUT: namespace + 'logout',
    IS_AUTHENTICATED: namespace + 'is_authenticated',
    GET_USERNAME: namespace + 'username'
});

export default {
    state: () => {
        return {
            token: localStorage.getItem('eddy-automl-ui-token'),
            username: localStorage.getItem('username')
        };
    },
    mutations: {
        [AUTH.SET_USER]: (state, details) => {
            if (details) {
                state.token = details.token;
                state.username = details.name;
                localStorage.setItem('eddy-automl-ui-token', details.token);
                localStorage.setItem('username', details.username);
            } else {
                state.token = false;
                state.username = null;
                localStorage.removeItem('eddy-automl-ui-token');
                localStorage.removeItem('username');
            }
        }
    },
    actions: {
        [AUTH.LOGIN]: ({ commit }, { email, password }) => {
            return authClient
                .mutate({
                    mutation: LOGIN_MUTATION,
                    variables: {
                        username: email,
                        password: password
                    }
                })
                .then(res => {
                    onLogin();
                    commit(AUTH.SET_USER, {
                        token: res.data.tokenAuth.token,
                        username: email
                    });
                })
                .catch(error => {
                    commit(AUTH.SET_USER, null);
                    throw error;
                });
        },
        [AUTH.LOGOUT]: ({ commit }) => {
            commit(AUTH.SET_USER, null);
            onLogout();
        }
    },
    getters: {
        [AUTH.IS_AUTHENTICATED]: state => !!state.token,
        [AUTH.GET_USERNAME]: state => state.username
    }
};
