<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Email"
                                            prepend-icon="fa-at"
                                            type="text"
                                            v-model="credentials.email"
                                            :error-messages="errors.collect('email')"
                                            data-vv-name="email"
                                            v-validate="'required'"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            prepend-icon="fa-lock"
                                            type="password"
                                            v-model="credentials.password"
                                            :error-messages="errors.collect('password')"
                                            data-vv-name="password"
                                            v-validate="'required'"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="submit">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                style="z-index: 10000"
                left
                :color="snackbar_color"
        >
            {{ snackbar_message }}
            <v-btn
                    color="white"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate'

    Vue.use(VeeValidate);
    export default {
        $_veeValidate: {
            validator: 'new',
        },
        data: () => ({
            credentials: {
                email: 'mirokhach@gmail.com',
                password: '123123123',
            },
            snackbar: false,
            snackbar_message: '',
            timeout: 4000,
            snackbar_color: 'error',
        }),
        name: 'Login',
        methods: {
            async submit() {
                const validate = await this.$validator.validateAll().then((result) => result);
                if (validate) {
                    const response = await this.$store.dispatch('login', this.credentials).then(res => res);
                    let errors = response.data;
                    if (errors.hasOwnProperty('error')) {
                        this.snackbar = true;
                        this.snackbar_message = errors.error;
                    }
                }
            }
        },
    }
</script>