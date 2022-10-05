import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

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
            sajda: [],
            selectedSura: 1,
            limit: {
                start: 0,
                end: 0
            }
        }
    },
    mutations: {
        setsajda(state, bool) {
            state.sajda = bool;
        },
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
        renderSura(state, no) {
            state.selectedSura = no;
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
app.mount('#app')