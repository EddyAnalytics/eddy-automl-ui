<template>
    <div>
        <b-field label="Topic">
            <b-autocomplete
                v-model="topicAutocompleteModel"
                open-on-focus
                :data="filteredTopics"
                @select="selectTopic"
            ></b-autocomplete>
        </b-field>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import KAFKA_TOPICS from '@/graphql/subscriptions/kafkaTopics.gql';

@Component()
export default class TopicsSelector extends Vue {
    topics = [];
    topicAutocompleteModel = '';
    created() {
        this.$apollo.addSmartSubscription('topics', {
            query: KAFKA_TOPICS,
            result({ data: { topics } }) {
                this.topics = topics;
            }
        });
    }

    get filteredTopics() {
        if (!this.topics) return [];
        return this.topics.filter(topic => topic.includes(this.topicAutocompleteModel));
    }

    selectTopic(topic) {
        this.$emit('select', topic);
    }
}
</script>

<style></style>
