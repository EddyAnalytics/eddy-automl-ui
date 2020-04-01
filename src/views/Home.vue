<template>
    <div>
        <topic-selector v-model="inputTopic" label="Input topic" />
        <b-field label="Output topic" expanded>
            <b-input v-model="outputTopic" expanded></b-input>
        </b-field>
        <sample-events :topic="inputTopic" />
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
}
</script>
