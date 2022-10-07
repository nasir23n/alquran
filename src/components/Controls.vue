<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { targetSura, usePlayer, useTheme, isMobile, getLeng } from '../Composables/useData.js';
const { toggleDark } = useTheme();

const suraForRander = targetSura();
const store = useStore();
let link = ref(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`)
let player = ref();
let currentPlaying = ref(store.state.playing)
let isPlaying = ref(false);

function playNew() {
    if (player.value) {
        player.value.pause();
        player.value.currentTime = 0;
    }
    player.value = new Audio(link.value);
    store.commit('setLoading', true);
    player.value.addEventListener('loadeddata', (event) => {
        store.commit('setPlaying', true);
        store.commit('setLoading', false);
        player.value.play();
        if (isMobile()) {
            player.value.pause();
            let timeout = setTimeout(() => {
                player.value.play();
                clearTimeout(timeout);
            }, 500);
        }
    });
    player.value.addEventListener('ended', (event) => {
        if (store.state.sajda[store.state.playing]) {
            console.log(store.state.sajda);
            return;
        }
        if (store.state.playing < store.state.limit.end) {
            store.commit('play', store.state.playing+1)
        } else {
            store.commit('play', 0);
            store.commit('setPlaying', false);
        }
    });
}

function playNext() {
    if (store.state.playing < store.state.limit.end) {
        store.commit('play', store.state.playing+1)
    } else {
        store.commit('play', 0)
    }
}
function playPrev() {
    if (store.state.playing > store.state.limit.start+1) {
        store.commit('play', store.state.playing-1)
    } else {
        store.commit('play', store.state.limit.start)
    }
}

function pausePlayer() {
    store.commit('setPlaying', false);
    if (player.value) {
        player.value.pause();
    }
}
function resumePlayer() {
    store.commit('setPlaying', true);
    if (player.value) {
        player.value.play();
    }
}
function startOver() {
    store.commit('setPlaying', false);
    if (player.value) {
        player.value.pause();
        player.value.currentTime = 0;
        store.commit('play', 0);
    }
}

store.subscribe((mutation, state) => {
    if (mutation.type == 'play') {
        if (currentPlaying.value == state.playing) {
            if (state.isPlaying) {
                pausePlayer();
            } else {
                resumePlayer();
            }
            return;
        }
        if (state.playing <= state.limit.end && state.playing >= state.limit.start) {
            link.value = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${state.playing}.mp3`;
            currentPlaying.value = state.playing;
            playNew();
        }
    }
});

watch(
	() => store.state.selectedSura,
	async newId => {
        startOver();
	}
);

</script>

<template>
    <div 
        class="
            aside_controls
        "
    >
        <!-- <h2 class="text-xl py-3 font-bold text-center mb-4 sticky top-0 bg-white dark:bg-slate-900">Controls</h2> -->
        <div class="w-full xl:divide-y dark:divide-slate-700 xl:pt-4 flex justify-between items-center xl:block">
            <button
                type="button"
                aria-label="Aside toggle"
                title="Aside toggle"
                class="py-2 px-2 bg-slate-200 dark:bg-slate-700 ml-2 rounded-full block md:hidden"
                @click="store.commit('asideToggle')"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>
            </button>
            <div class="xl:mt-4 p-3">
                <div class="flex justify-center gap-3">
                    <button
                        type="button"
                        aria-label="Previous ayah"
                        name="Previous ayah"
                        class="py-2 px-3 bg-slate-300 dark:bg-slate-700 rounded-full active:scale-95 disabled:dark:bg-red-500/20 disabled:bg-red-500/20"
                        @click="playPrev"
                        :disabled="store.state.playing == store.state.limit.start"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
                        aria-label="Play/pause"
                        name="Play/pause"
                        type="button"
                        class="py-2 px-3 bg-slate-300 dark:bg-slate-700 rounded-full active:scale-95"
                        @click="store.commit('play', store.state.playing || store.state.limit.start)"
                    >
                            <svg xmlns="http://www.w3.org/2000/svg" v-show="!store.state.isPlaying" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7 4v16l13 -8z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" v-show="store.state.isPlaying" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                                <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                            </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next Ayah"
                        name="Next Ayah"
                        class="py-2 px-3 bg-slate-300 dark:bg-slate-700 rounded-full active:scale-95 disabled:dark:bg-red-500/20 disabled:bg-red-500/20"
                        @click="playNext"
                        :disabled="store.state.playing == store.state.limit.end"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

            <div class="xl:mt-10 flex justify-center items-center xl:pt-5 pr-3 xl:pr-0">
                <button 
                    type="button"
                    aria-label="Toggle Dark"
                    name="Toggle Dark"
                    @click="toggleDark" 
                    class="flex gap-2 py-2 dark:bg-slate-700 px-3 bg-slate-300 hover:bg-slate-400 active:scale-95 rounded-md"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span class="md:block hidden">
                        Toggle dark
                    </span>
                </button>
            </div>

        </div> 

    </div>
</template>
