<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        created() {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                this.$http.get('/auth', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then((response) => {
                    this.$store.dispatch('setUser', response)
                }).catch((error) => {
                    localStorage.removeItem('access_token');
                    this.$router.push('login')
                })
            }

        }
    };
</script>