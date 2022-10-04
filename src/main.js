import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/font.css'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            playing: 0,
            max: 0,
            isPlaying: false,
            asideOpen: false,
            loading: false,
            limit: {
                start: 0,
                end: 0
            }
        }
    },
    mutations: {
        setLimit(state, val) {
            state.limit = val;
        },
        play(state, num) {
            state.playing = num;
        },
        playNext(state) {
            state.playing = state.playing+1;
        },
        setMax(state, max) {
            state.max = max;
        },
        setPlaying(state, bool) {
            state.isPlaying = bool;
        },
        asideToggle(state) {
            state.asideOpen = !state.asideOpen;
        },
        setLoading(state, val) {
            state.loading = val;
        }
    }
})

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')