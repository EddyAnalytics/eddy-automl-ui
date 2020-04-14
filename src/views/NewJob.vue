<template>
    <section class="section">
        <h1 class="title">New Job</h1>
        <job-form @save="saveJob" @cancel="cancel" />
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JobForm from '@/components/JobForm.vue';
import CREATE_JOB from '@/graphql/mutations/createJob.gql';

@Component({
    components: { JobForm }
})
export default class Jobs extends Vue {
    async saveJob(job) {
        job = { ...job, targetColumn: job.targetColumnIndex + '' };
        await this.$apollo.mutate({
            mutation: CREATE_JOB,
            variables: {
                ...job
            }
        });
        this.$router.replace({ name: 'Jobs' });
    }

    cancel() {
        this.$router.replace({ name: 'Jobs' });
    }

    goToJob(job) {
        this.$router.push({ name: 'Job', params: { jobId: job.id } });
    }
}
</script>
