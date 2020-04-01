<template>
    <div>
        <topic-selector v-model="inputTopic" label="Input topic" />
        <b-field label="Output topic" expanded>
            <b-input v-model="outputTopic" expanded></b-input>
        </b-field>
        <sample-events :topic="inputTopic" />
        <b-field label="Target column index" expanded>
            <b-numberinput v-model="targetColumnIndex" min="0"></b-numberinput>
        </b-field>
        <b-button
            type="is-primary"
            class="is-pulled-right"
            outlined
            :loading="loading"
            @click="deploy"
        >
            Deploy
        </b-button>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import TopicSelector from '@/components/TopicSelector.vue';
import SampleEvents from '@/components/SampleEvents.vue';

@Component({
    components: { TopicSelector, SampleEvents }
})
export default class Home extends Vue {
    inputTopic = '';
    outputTopic = '';
    targetColumnIndex = 0;
    loading = false;

    deploy() {
        // Perform GraphQL mutation
    }
}
</script>
