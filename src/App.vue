<template>
    <div>
        <the-header />
        <main class="main container">
            <transition>
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from '@/components/TheHeader';

@Component({
    components: { TheHeader }
})
export default class Job extends Vue {
    job = {
        id: 1,
        name: 'dsa'
    };
}
</script>

<style lang="scss">
@import '~@mdi/font/css/materialdesignicons.min.css';
@import '@/assets/scss/bulma.scss';
</style>
