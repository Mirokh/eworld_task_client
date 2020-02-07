import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        loginUser(state, payload) {
            localStorage.setItem('access_token', payload.token);
            state.user = payload.user;
        },
        logoutUser(state, payload) {
            localStorage.removeItem('access_token');
            state.user = null;
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async register({commit}, payload) {
            const result = await Vue.axios.post('/register', payload).then(res => res).catch(err => err.response);
            if (result.status === 200) {
                commit('loginUser', result.data);
                await router.push('admin')
            }
            return result;
        },
        async login({commit}, payload) {
            const result = await Vue.axios.post('/login', payload).then(res => res).catch(err => err.response);
            if (result.status === 200) {
                commit('loginUser', result.data);
                await router.push('admin')
            }
            return result;
        },
        async logout({commit}) {
            const result = await Vue.axios.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then(res => res).catch(err => err.response);
            commit('logoutUser');
            await router.push('/login')
        },
        setUser({commit}, payload) {
            commit("setUser", payload);
        },
    },
    getters: {
        user: state => {
            return state.user
        },
    },
})
