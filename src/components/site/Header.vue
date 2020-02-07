<template>
    <div>
        <v-app-bar
                absolute
                color="blue-grey darken-4"
                scroll-target="#scrolling-techniques"
                dark
        >

            <v-spacer></v-spacer>

            <template v-if="isLoggedIn">
                <v-btn text to="/admin">
                    <span>Admin</span>
                </v-btn>
                <v-btn text @click="$store.dispatch('logout')">
                    <span>Logout</span>
                </v-btn>
            </template>
            <template v-else>
                <v-btn text :to="{name: 'login'}">
                    <span>Login</span>
                </v-btn>

                <v-btn text :to="{name: 'register'}">
                    <span>Register</span>
                </v-btn>
            </template>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            isLoggedIn() {
                return !!this.$store.getters.user
            }
        }
    }
</script>

<style scoped>

</style>