<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex';

const props = defineProps({
    ayah_ar: Object,
    ayah_bn: Object,
    playing: {
        type: Number
    }
});

let store = useStore();

// let loading = ref(false);

let current = computed(() => {
    return props.playing == props.ayah_ar.number;
});


// store.commit('setsajda', props.ayah_ar.sajda);
// sajda

</script>

<template>
    <div class="bg-slate-100 dark:bg-slate-800 dark:border-slate-600 py-2 px-4 rounded-md border-2" :class="{
                'border-slate-300': !playing,
                'border-green-600 dark:border-green-600': current,
                '!bg-sky-900 !border-blue-500 !text-white': ayah_ar.sajda
            }">
        <p v-if="ayah_ar.sajda">
            <strong class="py-1 rounded-full px-2 bg-green-500 text-white">SAJDA</strong>
        </p>
        <p class="text-xl md:text-3xl text-right leading-[40px] md:leading-[60px] font-nh">{{ ayah_ar.text }}</p>
        <p class="text-xl md:text-3xl text-right leading-[40px] md:leading-[60px] bangla_font">{{ ayah_bn.text }}</p>
        <button type="button" @click="$emit('startPlay', ayah_ar.number)" class="py-1 flex items-center gap-2 rounded-full px-2 bg-green-200 text-green-800">
            <template v-if="current && store.state.loading">
                <svg class="animate-spin h-5 w-5 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </template>
            <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" v-show="!current" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 4v16l13 -8z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" v-show="current && !store.state.isPlaying" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 4v16l13 -8z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" v-show="current && store.state.isPlaying" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                    <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                </svg>
            </template>
            Play
        </button>
    </div>
</template>
