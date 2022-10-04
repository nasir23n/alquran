<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex';

const router = useRoute();
const store = useStore();


defineProps({
    suras: Array,
    selected: {
        type: Number,
        default: 1
    }
});

</script>

<template>
    <div 
        class="sura_list h-screen hidden md:block overflow-y-auto w-[300px] border-r bg-slate-100 border-slate-200 dark:border-slate-800 dark:bg-slate-800"
        :class="{'aside_open': store.state.asideOpen}"
    >
        <RouterLink to="/alquran">
            <h2 class="text-xl py-3 font-bold text-center mb-4 sticky top-0 bg-white dark:bg-slate-900">Sura List</h2>
        </RouterLink>

        <div class="w-full px-2">
            <!-- @click="$emit('renderSura', item.number)"  -->
            <RouterLink 
                v-for="item in suras" 
                :key="item.number"
                :to="`/alquran/${item.number}`"
                class="py-2 flex px-3 select-none rounded-md cursor-pointer divide-y"
                :class="{
                    'bg-green-500 text-white hover:bg-green-600': item.number === selected,
                    'hover:bg-slate-200 dark:hover:bg-slate-600': item.number != selected,
                }"
            >
                <span class="bg-green-300 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    {{ item.number }}
                </span>
                {{ item.englishName }}
            </RouterLink>
        </div> 

    </div>
</template>