<template>
    <div>
        <header-component></header-component>
        <transition name="page" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import Header from '../../components/site/Header';

    export default {
        components: {
            'header-component': Header,
        },
        name: "Site",
    }
</script>

<style scoped>
    .page-enter-active, .page-leave-active {
        transition: opacity .2s, transform .2s;
    }
    .page-enter, .page-leave-to {
        opacity: 0;
        transform: translateY(-1%);
    }
</style>