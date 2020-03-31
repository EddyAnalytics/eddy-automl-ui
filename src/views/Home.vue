<template>
    <div>
        <topic-selector v-model="topic" />
        <sample-events :topic="topic" />
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
    topic = null;
}
</script>
