<template>
    <section class="section">
        <h1 class="title">New Job</h1>
        <job-form @save="saveJob" @cancel="cancel" />
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JobForm from '@/components/JobForm.vue';

@Component({
    components: { JobForm }
})
export default class Jobs extends Vue {
    jobs = [
        {
            id: 1,
            name: 'dsa'
        }
    ];

    saveJob(job) {
        this.jobs.push(job);
    }

    cancel() {
        this.$router.replace({ name: 'Jobs' });
    }

    goToJob(job) {
        this.$router.push({ name: 'Job', params: { jobId: job.id } });
    }
}
</script>
