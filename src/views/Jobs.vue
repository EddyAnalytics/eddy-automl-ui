<template>
    <section class="section">
        <h1 class="title">Jobs</h1>

        <div v-if="jobs" class="columns is-multiline">
            <job-block
                v-for="job in jobs"
                :key="job.id"
                :job="job"
                @click.native="goToJob(job)"
            ></job-block>
            <job-block @click.native="addNewJob()" />
        </div>
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JobBlock from '@/components/JobBlock.vue';
import JOBS_QUERY from '@/graphql/queries/jobs.gql';

@Component({
    components: { JobBlock }
})
export default class Jobs extends Vue {
    jobs = [];

    created() {
        this.$apollo.addSmartQuery('jobs', {
            query: JOBS_QUERY,
            fetchPolicy: 'cache-and-network',
            result(res) {
                if (res && res.data && res.data.jobs) {
                    this.jobs = res.data.jobs.edges.map(edge => edge.node);
                }
            }
        });
    }

    addNewJob() {
        this.$router.push({ name: 'NewJob' });
    }

    goToJob(job) {
        this.$router.push({ name: 'Job', params: { jobId: job.id } });
    }
}
</script>
