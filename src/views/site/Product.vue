<template>
    <div>
        <br>
        <br>
        <br>
        <v-container>
            <v-row>
                <v-col cols="12" md="3" sm="3" lg="3">
                    <v-select
                            v-model="select"
                            :items="categories"
                            label="Filter by category"
                            item-value="id"
                            item-text="title"
                            required
                            @input="filterProducts($event)"
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col v-for="product of products">
                    <v-card
                            class="mx-auto"
                            max-width="344"
                    >
                        <v-img
                                v-if="product.gallery.length"
                                :src="imageUrl(product.gallery[0].url)"
                                height="200px"
                        ></v-img>

                        <v-card-title>
                            {{product.title}}
                        </v-card-title>

                        <v-card-actions>
                            <v-btn text>Share</v-btn>

                            <v-btn
                                    color="purple"
                                    text
                            >
                                Explore
                            </v-btn>

                            <v-spacer></v-spacer>

                        </v-card-actions>

                        <v-expand-transition>
                            <div>
                                <v-divider></v-divider>

                                <v-card-text>
                                    {{product.description}}
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "Product",
        data: () => ({
            select: null,
            show: false,
            categories: [],
            products: []
        }),
        created() {
            this.getCategories();
        },
        methods: {
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
            filterProducts(id) {
                this.loading = true;
                this.$http.get(`/products/${id}/filter`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(res => {
                    this.products = res.data;
                });
            },
            imageUrl(url) {
                // only for development mode
                if (!this.validURL(url)) {
                    url = Vue.axios.defaults.serverUrl + '/storage' + url
                }
                return url;
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