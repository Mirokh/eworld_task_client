<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="First name"
                                            type="text"
                                            v-model="user.first_name"
                                            :error-messages="errors.collect('first_name')"
                                            data-vv-name="first_name"
                                            v-validate="'required|min:3|max:12'"
                                    />

                                    <v-text-field
                                            label="Last name"
                                            type="text"
                                            v-model="user.last_name"
                                            :error-messages="errors.collect('last_name')"
                                            data-vv-name="last_name"
                                            v-validate="'required|min:3|max:12'"
                                    />

                                    <v-text-field
                                            label="Email"
                                            type="text"
                                            v-model="user.email"
                                            :error-messages="errors.collect('email')"
                                            data-vv-name="email"
                                            v-validate="'required|email'"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            type="password"
                                            v-model="user.password"
                                            :error-messages="errors.collect('password')"
                                            data-vv-name="password"
                                            v-validate="'required|min:8'"
                                    />
                                    <v-text-field
                                            id="c_password"
                                            label="Confirm password"
                                            type="password"
                                            v-model="user.c_password"
                                            :error-messages="errors.collect('c_password')"
                                            data-vv-name="c_password"
                                            v-validate="'required|min:8'"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="submit">Register</v-btn>
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
        name: 'Register',
        data: () => ({
            user: {
                first_name: 'Mihran',
                last_name: 'Khachatryan',
                email: 'mirokhach@gmail.com',
                password: '123123123',
                c_password: '123123123',
            },
            snackbar: false,
            snackbar_message: '',
            timeout: 4000,
            snackbar_color: 'error',
        }),
        methods: {
            async submit() {
                const validate = await this.$validator.validateAll().then((result) => result);
                if (validate) {
                    const response = await this.$store.dispatch('register', this.user).then(res => res);
                    if (response.data.hasOwnProperty('errors')) {
                        this.snackbar = true;
                        this.snackbar_message = response.data.errors[Object.keys(response.data.errors)[0]][0];
                    }
                }
            }
        }
    }
</script>