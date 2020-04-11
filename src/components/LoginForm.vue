<template>
    <section>
        <h2 class="is-size-2 has-text-weight-semibold has-text-centered">
            Log in with
            <strong>email</strong>
            and
            <strong>password</strong>
        </h2>
        <hr />

        <b-field label="Email">
            <b-input v-model="email" type="email" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="password" type="password" password-reveal></b-input>
        </b-field>

        <b-button type="is-primary" class="m-t-md" @click="login">
            Log in
        </b-button>
    </section>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { AUTH } from '@/store/auth';

@Component()
export default class LoginForm extends Vue {
    email = '';
    password = '';

    async login() {
        const credentials = {
            email: this.email,
            password: this.password
        };

        this.$store.dispatch(AUTH.LOGIN, credentials).then(() => {
            const redirect = this.$route.query.redirect;
            if (redirect) {
                this.$router.replace(redirect);
            } else {
                this.$router.replace({
                    name: 'Jobs'
                });
            }
        });
    }
}
</script>
