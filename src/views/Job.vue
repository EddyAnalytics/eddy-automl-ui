<template>
    <section class="section">
        <h1 class="title">Job</h1>
        <p>{{ job }}</p>
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JOB_QUERY from '@/graphql/queries/job.gql';

@Component({
    components: {}
})
export default class Job extends Vue {
    jobId = null;
    job = null;

    created() {
        this.jobId = this.$route.params.jobId;
        this.$apollo.addSmartQuery('job', {
            query: JOB_QUERY,
            variables: {
                id: this.jobId
            }
        });
    }
}
</script>
