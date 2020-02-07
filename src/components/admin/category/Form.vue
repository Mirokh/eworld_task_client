<template>
    <v-form>

        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                            label="Title"
                            outlined
                            v-model="category.title"
                            :error-messages="errors.collect('title')"
                            data-vv-name="title"
                            v-validate="'required'"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-file-input label="File input"></v-file-input>
                </v-col>

                <v-col cols="12" md="12">
                    <v-textarea
                            label="Description"
                            outlined
                            v-model="category.description"
                            :error-messages="errors.collect('description')"
                            data-vv-name="description"
                            v-validate="'required'"
                    ></v-textarea>
                </v-col>

                <v-col cols="12" md="1" offset="11">
                    <div class="my-2">
                        <v-btn color="primary" @click="submit">Save</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
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
            valid: true,
            category: {
                title: '',
                description: '',
            },
            image: null,
        }),
        methods: {
            submit() {
                this.$validator.validateAll().then((result) => {
                    Vue.axios.post('/categories', this.category, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    }).then(res => {
                        this.$emit('newCategory', res);
                        console.log(res);
                    }).catch(err => err.response);
                });
            }
        },
    }
</script>

<style scoped>

</style>