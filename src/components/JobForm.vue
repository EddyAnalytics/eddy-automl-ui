<template>
    <form @submit.prevent="save()">
        <b-field label="Name">
            <b-input v-model="model.jobName" />
        </b-field>
        <topic-selector v-model="model.inputTopic" label="Input topic" />

        <b-field v-if="model.inputTopic" label="Sample events">
            <sample-events :topic="model.inputTopic" />
        </b-field>
        <b-field label="Target column index">
            <b-numberinput v-model="model.targetColumnIndex" min="0"></b-numberinput>
        </b-field>
        <b-field label="Output topic">
            <b-input v-model="model.outputTopic"></b-input>
        </b-field>
        <div class="buttons">
            <button class="button is-primary" :disabled="isDisabled">Deploy</button>
            <button class="button" type="button" @click="cancel()">Cancel</button>
        </div>
    </form>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopicSelector from '@/components/TopicSelector.vue';
import SampleEvents from '@/components/SampleEvents.vue';

@Component({
    components: { TopicSelector, SampleEvents }
})
export default class JobForm extends Vue {
    @Prop() job;

    model = {
        jobName: '',
        inputTopic: '',
        outputTopic: '',
        targetColumnIndex: 0
    };

    loading = false;

    created() {
        if (this.job) {
            this.model = JSON.parse(JSON.stringify(this.job));
        }
    }

    save() {
        this.$emit('save', { ...this.model });
    }

    cancel() {
        this.$emit('cancel');
    }

    get isDisabled() {
        return !(this.model.inputTopic && this.model.outputTopic);
    }
}
</script>
