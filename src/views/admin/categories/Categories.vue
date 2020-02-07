<template>
    <div>
        <v-banner
                single-line
        >
            <h2 class="px-8 py-2">
                Categories
            </h2>
        </v-banner>
        <v-data-table
                :headers="headers"
                :items="categories"
                class="elevation-1 ma-10"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">

                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.title" label="Title"
                                                          :error-messages="errors.collect('title')"
                                                          data-vv-name="title"
                                                          v-validate="'required'"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="8">
                                            <v-text-field v-model="editedItem.description" label="Description"
                                                          :error-messages="errors.collect('description')"
                                                          data-vv-name="description"
                                                          v-validate="'required'"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    fa-edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    fa-trash
                </v-icon>
            </template>
        </v-data-table>
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate'

    Vue.use(VeeValidate);
    export default {
        $_veeValidate: {
            validator: 'new',
        },
        name: "Categories",
        data: () => ({
            valid: true,
            category: {
                title: '',
                description: '',
            },
            snackbar: false,
            snackbar_message: '',
            timeout: 4000,
            snackbar_color: 'error',
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            dialog: false,
            editedIndex: -1,
            editedItem: {
                title: '',
                description: '',
            },
            defaultItem: {
                title: '',
                description: '',
            },
            headers: [
                {
                    text: 'Title',
                    align: 'left',
                    sortable: true,
                    value: 'title',
                    width: "30%"
                },
                {text: 'Description', value: 'description', sortable: false},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            categories: [],
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
        created() {
            this.getCategories();
        },
        methods: {
            getCategories() {
                this.$http.get('/categories', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(res => {
                    this.categories = res.data
                });
            },
            editItem(item) {
                this.editedIndex = this.categories.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.categories.indexOf(item);
                if (confirm('Are you sure you want to delete this item?')) {
                    Vue.axios.delete(`/categories/${item.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    }).then(res => {
                        this.categories.splice(index, 1)
                    }).catch(err => err.response);
                }
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                this.$validator.validateAll().then((success) => {
                    if (success) {
                        if (this.editedIndex > -1) {
                            Vue.axios.put(`/categories/${this.editedItem.id}`, this.editedItem, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                }
                            }).then(res => {
                                if (res.data.message) {
                                    this.snackbar = true;
                                    this.snackbar_message = res.data.message;
                                    this.snackbar_color = 'success';
                                }
                            }).catch(err => err.response);
                            Object.assign(this.categories[this.editedIndex], this.editedItem)
                        } else {
                            Vue.axios.post('/categories', this.editedItem, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                }
                            }).then(res => {
                                this.categories.push(res.data.category)
                                if (res.data.message) {
                                    this.snackbar = true;
                                    this.snackbar_message = res.data.message;
                                    this.snackbar_color = 'success';
                                }
                            }).catch(err => {
                                let errors = err.response.data;
                                if (Object.keys(errors).length) {
                                    this.snackbar = true;
                                    this.snackbar_message = errors[Object.keys(errors)[0]][0];
                                    this.snackbar_color = 'error';
                                }
                            });
                        }
                        this.close()
                    }
                });

            },
        }
    }
</script>

<style scoped>

</style>