<template>
    <div>
        <v-banner
                single-line
        >
            <h2 class="px-8 py-2">
                Products
            </h2>
        </v-banner>
        <v-data-table
                :headers="headers"
                :items="products"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-1 ma-12"
                :loading="loading"
                loading-text="Loading... Please wait"
                @page-count="pageCount = $event"
        >
            <template v-slot:item.image.url="{ item }">
                <img width="40px" v-if="item.gallery.length" :src="imageUrl(item.gallery[0].url)" alt="">
                <v-icon v-else>fa-image</v-icon>
            </template>
            <template v-slot:item.categories="{ item }">
                {{categoryAppear(item.categories)}}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="$router.push({name: 'products.update', params: {id: item.id}})"
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
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Products",
        data() {
            return {
                loading: false,
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                headers: [
                    {
                        text: 'Picture',
                        align: 'left',
                        sortable: false,
                        value: 'image.url',
                        width: 40
                    },
                    {
                        text: 'Title',
                        align: 'left',
                        sortable: true,
                        value: 'title',
                        width: '20%'
                    },
                    {
                        text: 'Descriptions',
                        align: 'left',
                        sortable: false,
                        value: 'description',
                        width: '50%'
                    },
                    {
                        text: 'Categories',
                        align: 'left',
                        sortable: false,
                        value: 'categories',
                    },
                    {text: 'Actions', value: 'action', sortable: false},
                ],
                products: [],
            }
        },
        created() {
            this.getProducts();
        },
        methods: {
            getProducts() {
                this.loading = true;
                this.$http.get('/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(res => {
                    this.products = res.data;
                    this.loading = false
                });
            },
            categoryAppear(categories) {
                let string = '';
                for (let category of categories) {
                    string += category.title + ', '
                }
                return string.substring(0, string.length - 2);
            },
            deleteItem(item) {
                const index = this.products.indexOf(item);
                if (confirm('Are you sure you want to delete this item?')) {
                    Vue.axios.delete(`/products/${item.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    }).then(res => {
                        this.products.splice(index, 1)
                    }).catch(err => {

                    });
                }
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