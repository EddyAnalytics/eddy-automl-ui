<template>
    <article class="column is-narrow">
        <div v-if="job" class="card job-card">
            <div class="card-image">
                <b-icon icon="database" size="is-large" type="is-grey"></b-icon>
            </div>

            <div class="card-content">
                <div class="content has-text-centered">
                    <div>{{ job.jobName ? job.jobName : job.id }}</div>
                </div>
            </div>
        </div>

        <div v-else class="card job-card">
            <div class="card-image has-text-centered">
                <b-icon icon="plus" size="is-large" type="is-primary"></b-icon>
            </div>
            <div class="card-content">
                <div class="content has-text-centered">
                    <div>Add new</div>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.job-card {
    min-width: 10rem;
    cursor: pointer;

    .card-image {
        text-align: center;
        height: 4rem;
        overflow: hidden;
        padding-top: 1rem;
    }
}
</style>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class JobBlock extends Vue {
    @Prop() job;
}
</script>
