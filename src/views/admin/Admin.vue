<template>
    <div>
        <header-component @drawer="toggleDrawer"></header-component>
        <sidebar-component :drawer="drawer"></sidebar-component>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from '../../components/admin/Header';
    import Sidebar from '../../components/admin/Sidebar';

    export default {
        name: "Admin",
        components: {
            'header-component': Header,
            'sidebar-component': Sidebar,
        },
        data: () => ({
            drawer: null,
        }),
        methods: {
            toggleDrawer() {
                this.drawer = !this.drawer
            }
        }
    }
</script>

<style scoped>

</style>