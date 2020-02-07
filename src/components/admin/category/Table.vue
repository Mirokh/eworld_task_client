<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="categories"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-1 ma-12"
                @page-count="pageCount = $event"
        ></v-data-table>
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: ['newCategory'],
        watch: {
            toCategory: {
                handler(data) {
                    console.log(data);
                    this.categories.push(data)
                }
            }
        },
        data() {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                headers: [
                    {text: 'Image', value: 'imageUrl', sortable: false, width: 40},
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'title',
                        width: "30%"
                    },
                    {text: 'Description', value: 'description', sortable: false},
                ],
                categories: [
                    {
                        title: 'Frozen Yogurt',
                        description: 159,
                        imageUrl: '',
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>