<template>
    <b-navbar fixed-top>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ name: isLoggedIn ? 'Jobs' : 'Login' }">
                <img src="@/assets/img/logo-brand.svg" alt="Eddy AutoML Logo" />
                <h1 class="subtitle has-text-weight-semibold has-text-black">- AutoML</h1>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item>
                {{ username }}
            </b-navbar-item>

            <b-navbar-item tag="div">
                <div class="buttons">
                    <a v-if="isLoggedIn" class="button is-light" @click="logOut">
                        Log out
                    </a>
                    <template v-else>
                        <a class="button is-primary" @click="goToLogin">
                            <strong>Log in</strong>
                        </a>
                    </template>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<style lang="scss" scoped>
.navbar {
    box-shadow: 0 2px 0 0 whitesmoke;

    .navbar-item.is-active {
        font-weight: 500;
    }
}
</style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { AUTH } from '@/store/auth';

@Component({
    components: {}
})
export default class TheHeader extends Vue {
    goToLogin() {
        this.$router.push({
            name: 'Login'
        });
    }

    logOut() {
        this.$store.dispatch(AUTH.LOGOUT).then(() => {
            this.$router.replace({
                name: 'Login'
            });
        });
    }

    get username() {
        return this.$store.getters[AUTH.GET_USERNAME];
    }

    get isLoggedIn() {
        return this.$store.getters[AUTH.IS_AUTHENTICATED];
    }
}
</script>
