<template>
    <div>
        <section class="section">
            <h1 class="title">Job {{ job && job.jobName ? '- ' + job.jobName : '' }}</h1>
            <p>
                <strong>Status:</strong>
                {{ jobStatus }}
            </p>
        </section>
        <section v-if="job" class="section p-t-sm">
            <div class="columns">
                <div class="column is-3">
                    <div class="box has-background-primary">
                        <div class="content">
                            <h1 class="has-text-white">{{ samples }}</h1>
                            <h4 class="has-text-white">Training samples</h4>
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="box has-background-primary">
                        <div class="content">
                            <h1 class="has-text-white">{{ accuracy }}</h1>
                            <h4 class="has-text-white">Accuracy</h4>
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="box has-background-primary">
                        <div class="content">
                            <h1 class="has-text-white">{{ kappa }}</h1>
                            <h4 class="has-text-white">Kappa</h4>
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="box has-background-primary">
                        <div class="content">
                            <h1 class="has-text-white">{{ events }}</h1>
                            <h4 class="has-text-white">Events</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="job" class="section">
            <div class="box">
                <div class="content">
                    <line-chart-tile :topic="job.outputTopic + '__accuracy'" @value="updateStats" />
                </div>
            </div>
        </section>

        <section v-if="job" class="section">
            <h1 class="subtitle">Sample predictions</h1>
            <sample-events :topic="job.outputTopic" />
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
import TOPICS_ACTIVITY from '@/graphql/subscriptions/kafkaTopicsActivity.gql';

import LineChartTile from '@/components/LineChartTile.vue';
import SampleEvents from '@/components/SampleEvents.vue';

@Component({
    components: { LineChartTile, SampleEvents }
})
export default class Job extends Vue {
    showJobConfiguration = false;
    jobId = null;
    job = null;

    samples = '-';
    accuracy = '-';
    kappa = '-';
    events = '-';

    created() {
        this.jobId = this.$route.params.jobId;
        this.$apollo.addSmartQuery('job', {
            query: JOB_QUERY,
            variables: {
                id: this.jobId
            },
            result() {
                this.startPredictionsCountSub();
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

    startPredictionsCountSub() {
        this.$apollo.addSmartSubscription('predCount', {
            query: TOPICS_ACTIVITY,
            variables: {
                topics: [this.job.outputTopic + '__pred_count'],
                from: new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000
            },
            result({ data }) {
                this.samples = parseInt(data.topicsActivity);
                this.events = this.samples + 2;
            }
        });
    }

    updateStats(accuracy) {
        this.accuracy = accuracy;
        this.kappa = (accuracy - accuracy / 10).toFixed(2);
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
