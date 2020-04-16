<template>
    <div>
        <section class="section">
            <h1 class="title">Job</h1>
            <p>
                <strong>Status:</strong>
                {{ jobStatus }}
            </p>
        </section>
        <section class="section">
            <h1 class="subtitle">Job management</h1>
            <div class="buttons">
                <b-button icon-left="pencil" @click="showJobConfiguration = !showJobConfiguration">
                    {{ showJobConfiguration ? 'Hide' : 'Show' }} configuration
                </b-button>
                <b-button type="is-warning" @click="openStopJobModal()">
                    Stop job
                </b-button>
                <b-button type="is-danger" @click="openDeleteJobModal()">
                    Delete job
                </b-button>
            </div>
            <template v-if="showJobConfiguration">
                <strong>Job configuation</strong>
                <pre class="sample-event">{{ job }}</pre>
            </template>
        </section>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JOB_QUERY from '@/graphql/queries/job.gql';
import STOP_JOB from '@/graphql/mutations/stopJob.gql';
import DELETE_JOB from '@/graphql/mutations/deleteJob.gql';

@Component({
    components: {}
})
export default class Job extends Vue {
    showJobConfiguration = false;
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

    get jobStatus() {
        if (!this.job) return 'N/A';
        switch (this.job.status) {
            case 1:
                return 'running';
            case 2:
                return 'stopped';
            case -1:
                return 'failed';
            default:
                return 'waiting';
        }
    }

    openStopJobModal() {
        this.$buefy.dialog.confirm({
            title: 'Stopping job',
            message: 'Are you sure you want to <b>stop</b> this job?',
            confirmText: 'Stop',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => this.stopJob()
        });
    }

    async stopJob() {
        await this.$apollo.mutate({
            mutation: STOP_JOB,
            variables: {
                jobId: this.jobId
            }
        });

        this.$buefy.toast.open('Job stopped');
    }

    openDeleteJobModal() {
        this.$buefy.dialog.confirm({
            title: 'Deletting job',
            message: 'Are you sure you want to <b>delete</b> this job?',
            confirmText: 'Delete',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => this.deleteJob()
        });
    }

    async deleteJob() {
        await this.$apollo.mutate({
            mutation: DELETE_JOB,
            variables: {
                jobId: this.jobId
            }
        });

        this.$buefy.toast.open('Job deleted');
        this.$router.replace({ name: 'Jobs' });
    }
}
</script>
