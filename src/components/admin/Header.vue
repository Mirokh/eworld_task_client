<template>
    <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue-grey darken-4"
            dark
    >
<!--        <v-app-bar-nav-icon @click.stop="toggleDrawer"/>-->
        <v-app-bar-nav-icon :to="{name: 'admin.home'}" active-class="ss"/>
        <v-toolbar-title
                style="width: 300px"
                class="ml-0 pl-4"
        >
            <span class="hidden-sm-and-down">Dashboard</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn icon :to="{name: 'site.products'}">
            <v-icon>fa-globe-americas</v-icon>
        </v-btn>
        <v-btn icon @click="$store.dispatch('logout')">
            <v-icon>fa-sign-out-alt</v-icon>
        </v-btn>
    </v-app-bar>

</template>

<script>
    export default {
        data: () => ({
            drawer: true,
            items: [
                {icon: 'mdi-content-copy', text: 'Duplicates'},
                {
                    icon: 'mdi-chevron-up',
                    'icon-alt': 'mdi-chevron-down',
                    text: 'Labels',
                    model: true,
                    children: [
                        {icon: 'mdi-plus', text: 'Create label'},
                    ],
                },
                {
                    icon: 'mdi-chevron-up',
                    'icon-alt': 'mdi-chevron-down',
                    text: 'More',
                    model: false,
                    children: [
                        {text: 'Import'},
                        {text: 'Export'},
                        {text: 'Print'},
                        {text: 'Undo changes'},
                        {text: 'Other contacts'},
                    ],
                },
                {icon: 'mdi-settings', text: 'Settings'},
            ],
        }),
    }
</script>

<style scoped>

</style>