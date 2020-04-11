<template>
    <section class="section">
        <h1 class="title">Jobs</h1>

        <div class="columns is-multiline">
            <job-block
                v-for="job in jobs"
                :key="job.id"
                :job="job"
                @click.native="goToJob(job)"
            ></job-block>
            <job-block @click.native="addNewJob()" />
        </div>
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import JobBlock from '@/components/JobBlock.vue';

@Component({
    components: { JobBlock }
})
export default class Jobs extends Vue {
    jobs = [
        {
            id: 1,
            name: 'dsa'
        }
    ];

    addNewJob() {
        this.$router.push({ name: 'NewJob' });
    }

    goToJob(job) {
        this.$router.push({ name: 'Job', params: { jobId: job.id } });
    }
}
</script>
