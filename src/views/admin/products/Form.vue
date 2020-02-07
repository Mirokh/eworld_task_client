<template>
    <div>
        <v-banner
                single-line
        >
            <h2 class="px-8 py-2">
                Products - Add
            </h2>
        </v-banner>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col cols-12 md-6>
                        <v-col cols="12" md="9">
                            <v-text-field
                                    label="Product name"
                                    single-line
                                    outlined
                                    v-model="product.title"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="9">
                            <v-textarea
                                    label="Product description"
                                    v-model="product.description"
                                    single-line
                                    outlined
                            ></v-textarea>
                        </v-col>

                        <v-col cols="12" md="9">
                            <label for="gallery_picture" style="cursor: pointer">
                                <v-icon size="45">fa fa-camera</v-icon>
                                select gallery
                            </label>
                            <input id="gallery_picture" class="d-none" type="file" ref="gallery" multiple
                                   @change="selectGallery">
                        </v-col>

                        <v-row v-if="gallery.length">
                            <v-col cols="12" sm="6">
                                <v-card>
                                    <v-container fluid>
                                        <v-row>
                                            <v-col
                                                    v-for="(url, i) in gallery"
                                                    :key="i"
                                                    class="d-flex child-flex"
                                                    cols="4"
                                            >
                                                <v-card flat tile class="d-flex">
                                                    <v-img
                                                            :src="url"
                                                            aspect-ratio="1"
                                                            class="grey lighten-2"
                                                    >
                                                        <template v-slot:placeholder>
                                                            <v-row
                                                                    class="fill-height ma-0"
                                                                    align="center"
                                                                    justify="center"
                                                            >
                                                                <v-progress-circular indeterminate
                                                                                     color="grey lighten-5"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-col cols="12" offset="8" md="12">
                            <div class="my-2">
                                <v-btn color="primary" @click="save">Save</v-btn>
                            </div>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row>
                    <v-navigation-drawer
                            absolute
                            permanent
                            right
                    >
                        <v-card-title>Categories</v-card-title>
                        <v-data-table
                                v-model="product.categories"
                                :items="categories"
                                item-key="title"
                                :headers="headers"
                                show-select
                                loading="false"
                                :single-select="singleSelect"
                                :page.sync="page"
                                :items-per-page="itemsPerPage"
                                hide-default-footer
                                class="elevation-1"
                                @page-count="pageCount = $event"
                        >
                            <template v-slot:item.title="{ item }">
                                {{item.title}}
                            </template>
                        </v-data-table>
                    </v-navigation-drawer>
                </v-row>
            </v-container>
        </v-form>
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
        name: "Add",
        data: () => ({
            isEdit: false,
            product: {
                title: '',
                description: '',
                categories: [],
            },
            singleSelect: false,
            itemsPerPage: 50,
            page: 1,
            pageCount: 0,
            mainImage: null,
            gallery: [],
            categories: [],
            coverImageData: '',
            galleryData: '',
            selected: {},
            multiLine: true,
            snackbar: false,
            snackbar_message: '',
            timeout: 4000,
            snackbar_color: 'white',
            headers: [
                {
                    text: 'Categories',
                    align: 'left',
                    sortable: false,
                    value: 'title',
                },
            ],
        }),
        created() {
            this.getCategories();
            if (this.$route.params.id) {
                this.isEdit = true;
                this.getProduct()
            }
        },
        watch: {
            routeParam: {
                handler() {
                    this.productReset()
                }
            }
        },
        computed: {
            routeParam() {
                return this.$route.params.id;
            }
        },
        methods: {
            productReset() {
                this.product = {
                    title: '',
                    description: '',
                    categories: [],
                };
                this.$refs.form.resetValidation();
                this.gallery = []
                this.$refs.form.resetValidation();
            },
            selectGallery(e) {
                this.gallery = [];
                this.galleryFiels = e.target.files;
                this.galleryData = e.target.files;

                for (let i = 0; i < e.target.files.length; i++) {
                    this.gallery.push(URL.createObjectURL(this.galleryFiels[i]));
                }
            },
            getCategories() {
                this.$http.get('/categories', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(res => {
                    this.categories = res.data
                })
            },
            getProduct() {
                this.$http.get(`/products/${this.$route.params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(res => {
                    this.product = res.data;
                    this.gallery = [];
                    for (let image of this.product.gallery) {

                        // only for development mode
                        let url = image.url;
                        if (!this.validURL(url)) {
                            url = Vue.axios.defaults.serverUrl + '/storage' + url
                        }
                        this.gallery.push(url);
                    }
                })
            },
            async save() {
                const validate = await this.$validator.validateAll().then((result) => result);
                if (!validate) return;

                let form = new FormData();
                form.append("image", this.coverImageData);
                for (let image of this.galleryData) {
                    form.append("gallery[]", image);
                }
                form.append('title', this.product.title);
                form.append('description', this.product.description);

                let category_array = [];

                for (let category of this.product.categories) {
                    category_array.push(category.id)
                }

                for (let category of category_array) {
                    form.append('categories[]', category);
                }

                // update
                if (this.$route.params.id) {
                    Vue.axios.post(`/products/${this.$route.params.id}/update`, form, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        }
                    }).then(res => {
                        if (res.data.message) {
                            this.snackbar = true;
                            this.snackbar_message = res.data.message;
                            this.snackbar_color = 'success';
                        }
                    }).catch(err => err.response);
                } else {
                    // create new
                    Vue.axios.post("/products", form, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        }
                    }).then(res => {
                        if (res.data.message) {
                            this.snackbar = true;
                            this.snackbar_message = res.data.message;
                            this.snackbar_color = 'success';
                        }
                        this.productReset();
                    }).catch(err => {
                        let errors = err.response.data;
                        if (Object.keys(errors).length) {
                            this.snackbar = true;
                            this.snackbar_message = errors[Object.keys(errors)[0]][0];
                            this.snackbar_color = 'error';
                        }
                    });
                }
            },
            // only for development
            validURL(url) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return !!pattern.test(url);
            }
        }
    }
</script>

<style scoped>

</style>