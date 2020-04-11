import Vue from 'vue';
import VueRouter from 'vue-router';
import Jobs from '@/views/Jobs.vue';
import Job from '@/views/Job.vue';
import NewJob from '@/views/NewJob.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/jobs'
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
    },
    {
        path: '/jobs/new',
        name: 'NewJob',
        component: NewJob
    },
    {
        path: '/jobs/:jobId',
        name: 'Job',
        component: Job
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
