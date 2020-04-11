<template>
    <section class="section">
        <h1 class="title">Job</h1>
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class Job extends Vue {
    job = {
        id: 1,
        name: 'dsa'
    };
}
</script>
