import Vue from 'vue';
import VueRouter from 'vue-router';
import Jobs from '@/views/Jobs.vue';
import Job from '@/views/Job.vue';
import NewJob from '@/views/NewJob.vue';

import authRoutes from './auth';

import store from '@/store';
import { AUTH } from '@/store/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/jobs'
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs,
        meta: {
            auth: true
        }
    },
    {
        path: '/jobs/new',
        name: 'NewJob',
        component: NewJob,
        meta: {
            auth: true
        }
    },
    {
        path: '/jobs/:jobId',
        name: 'Job',
        component: Job,
        meta: {
            auth: true
        }
    },
    ...authRoutes
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, _, next) => {
    if (to.meta !== undefined && to.meta.auth) {
        if (!store.getters[AUTH.IS_AUTHENTICATED]) {
            next({
                name: 'Login',
                query: {
                    redirect: to.path
                }
            });
            return;
        }
    }
    next();
});

export default router;
