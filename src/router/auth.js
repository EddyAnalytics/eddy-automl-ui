import Authentication from '@/views/Authentication.vue';
import LoginForm from '@/components/LoginForm.vue';

const authRoutes = [
    {
        path: '/auth',
        component: Authentication,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginForm,
                meta: {
                    auth: false
                }
            }
        ]
    }
];

export default authRoutes;
