<template>
    <div v-if="topic">
        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <template v-if="samples.length">
                <div class="buttons m-t-md">
                    <b-button
                        outlined
                        icon-left="chevron-left"
                        :disabled="sampleIndex <= 0"
                        @click="sampleIndex--"
                    >
                        Previous
                    </b-button>
                    <b-button
                        outlined
                        icon-right="chevron-right"
                        :disabled="sampleIndex >= samples.length - 1"
                        @click="sampleIndex++"
                    >
                        Next
                    </b-button>
                </div>
                <pre class="sample-event">{{ samples[sampleIndex] }}</pre>
            </template>
            <template v-else>
                There are no samples for the selected topic
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sample-event {
    text-overflow: wrap;
    overflow: auto;
    overflow-y: scroll;
}
</style>

<script>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SAMPLE_SUBSCRIPTION from '@/graphql/subscriptions/sample.gql';

@Component
export default class SampleEvents extends Vue {
    @Prop() topic;

    samples = [];
    loading = true;
    sampleIndex = 0;
    @Watch('topic', { immediate: true })
    onTopicChange(topic) {
        if (!topic) return;
        this.samples = [];
        this.loading = true;
        this.$apollo.addSmartSubscription('sample', {
            query: SAMPLE_SUBSCRIPTION,
            variables: {
                topic,
                rate: 1
            },
            result({ data: { sample } }) {
                this.loading = false;
                this.samples.push(sample);
            }
        });
    }
}
</script>

<style></style>
