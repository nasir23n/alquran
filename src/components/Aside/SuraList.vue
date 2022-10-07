<script setup>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();

defineProps({
    suras: Array,
    selected: {
        type: Number,
        default: 1
    }
});

let deferredPrompt = ref();
let addBtn = ref();
let modal_open = ref(false);
window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
    modal_open.value = true;
    // Update UI to notify the user they can add to home screen

    addBtn.value.addEventListener("click", (e) => {
        // hide our user interface that shows our A2HS button
        // addBtn.style.display = "none";
        // Show the prompt
        deferredPrompt.value.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.value.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt.value = null;
        });
    });
});

</script>

<template>
    <div 
        class="sura_list h-screen hidden md:block overflow-y-auto w-[300px] border-r bg-slate-100 border-slate-200 dark:border-slate-800 dark:bg-slate-800"
        :class="{'aside_open': store.state.asideOpen}"
    >
        <button v-if="modal_open" ref="addBtn" class="flex gap-2 w-full text-[18px] py-2 px-3 text-center bg-emerald-500 justify-center items-center">
            Add to homescreen
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
        <h2 class="select-none text-xl py-3 font-bold text-center mb-4 sticky top-0 bg-white dark:bg-slate-900">Sura List</h2>
        <div class="w-full px-2">
            <!-- @click="$emit('renderSura', item.number)"  -->
            <div 
                v-for="item in suras" 
                :key="item.number"
                class="py-2 flex px-3 select-none rounded-md cursor-pointer divide-y"
                @click="store.commit('renderSura', item.number)"
                :class="{
                    'bg-green-500 text-white hover:bg-green-600': item.number === selected,
                    'hover:bg-slate-200 dark:hover:bg-slate-600': item.number != selected,
                }"
            >
                <span class="bg-green-300 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    {{ item.number }}
                </span>
                {{ item.englishName }}
            </div>
        </div> 

    </div>
</template>