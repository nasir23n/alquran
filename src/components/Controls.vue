<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { targetSura, usePlayer, useTheme } from '../Composables/useData.js';
const { toggleDark } = useTheme();

let leng_code = [
  { code: 'ab', name: 'Abkhazian' },
  { code: 'aa', name: 'Afar' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'ak', name: 'Akan' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'an', name: 'Aragonese' },
  { code: 'hy', name: 'Armenian' },
  { code: 'as', name: 'Assamese' },
  { code: 'av', name: 'Avaric' },
  { code: 'ae', name: 'Avestan' },
  { code: 'ay', name: 'Aymara' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'bm', name: 'Bambara' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali (Bangla)' },
  { code: 'bh', name: 'Bihari' },
  { code: 'bi', name: 'Bislama' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'br', name: 'Breton' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'my', name: 'Burmese' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ch', name: 'Chamorro' },
  { code: 'ce', name: 'Chechen' },
  { code: 'ny', name: 'Chichewa, Chewa, Nyanja' },
  { code: 'zh', name: 'Chinese' },
  { code: 'zh-Hans', name: 'Chinese (Simplified)' },
  { code: 'zh-Hant', name: 'Chinese (Traditional)' },
  { code: 'cv', name: 'Chuvash' },
  { code: 'kw', name: 'Cornish' },
  { code: 'co', name: 'Corsican' },
  { code: 'cr', name: 'Cree' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'dv', name: 'Divehi, Dhivehi, Maldivian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'dz', name: 'Dzongkha' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'ee', name: 'Ewe' },
  { code: 'fo', name: 'Faroese' },
  { code: 'fj', name: 'Fijian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'ff', name: 'Fula, Fulah, Pulaar, Pular' },
  { code: 'gl', name: 'Galician' },
  { code: 'gd', name: 'Gaelic (Scottish)' },
  { code: 'gv', name: 'Gaelic (Manx)' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'kl', name: 'Greenlandic' },
  { code: 'gn', name: 'Guarani' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hz', name: 'Herero' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ho', name: 'Hiri Motu' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'io', name: 'Ido' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id, in', name: 'Indonesian' },
  { code: 'ia', name: 'Interlingua' },
  { code: 'ie', name: 'Interlingue' },
  { code: 'iu', name: 'Inuktitut' },
  { code: 'ik', name: 'Inupiak' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kl', name: 'Kalaallisut, Greenlandic' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kr', name: 'Kanuri' },
  { code: 'ks', name: 'Kashmiri' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'ki', name: 'Kikuyu' },
  { code: 'rw', name: 'Kinyarwanda (Rwanda)' },
  { code: 'rn', name: 'Kirundi' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'kv', name: 'Komi' },
  { code: 'kg', name: 'Kongo' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'kj', name: 'Kwanyama' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian (Lettish)' },
  { code: 'li', name: 'Limburgish ( Limburger)' },
  { code: 'ln', name: 'Lingala' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lu', name: 'Luga-Katanga' },
  { code: 'lg', name: 'Luganda, Ganda' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'gv', name: 'Manx' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mh', name: 'Marshallese' },
  { code: 'mo', name: 'Moldavian' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'na', name: 'Nauru' },
  { code: 'nv', name: 'Navajo' },
  { code: 'ng', name: 'Ndonga' },
  { code: 'nd', name: 'Northern Ndebele' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'nb', name: 'Norwegian bokmål' },
  { code: 'nn', name: 'Norwegian nynorsk' },
  { code: 'ii', name: 'Nuosu' },
  { code: 'oc', name: 'Occitan' },
  { code: 'oj', name: 'Ojibwe' },
  { code: 'cu', name: 'Old Church Slavonic, Old Bulgarian' },
  { code: 'or', name: 'Oriya' },
  { code: 'om', name: 'Oromo (Afaan Oromo)' },
  { code: 'os', name: 'Ossetian' },
  { code: 'pi', name: 'Pāli' },
  { code: 'ps', name: 'Pashto, Pushto' },
  { code: 'fa', name: 'Persian (Farsi)' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi (Eastern)' },
  { code: 'qu', name: 'Quechua' },
  { code: 'rm', name: 'Romansh' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'se', name: 'Sami' },
  { code: 'sm', name: 'Samoan' },
  { code: 'sg', name: 'Sango' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'sr', name: 'Serbian' },
  { code: 'sh', name: 'Serbo-Croatian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'tn', name: 'Setswana' },
  { code: 'sn', name: 'Shona' },
  { code: 'ii', name: 'Sichuan Yi' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhalese' },
  { code: 'ss', name: 'Siswati' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'nr', name: 'Southern Ndebele' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili (Kiswahili)' },
  { code: 'ss', name: 'Swati' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ty', name: 'Tahitian' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'to', name: 'Tonga' },
  { code: 'ts', name: 'Tsonga' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'tw', name: 'Twi' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'uz', name: 'Uzbek' },
  { code: 've', name: 'Venda' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'vo', name: 'Volapük' },
  { code: 'wa', name: 'Wallon' },
  { code: 'cy', name: 'Welsh' },
  { code: 'wo', name: 'Wolof' },
  { code: 'fy', name: 'Western Frisian' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi, ji', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'za', name: 'Zhuang, Chuang' },
  { code: 'zu', name: 'Zulu' },
];

function getLeng(short) {
    let find;
    leng_code.forEach(item => item.code == short ? find = item.name : null);
    return find ? find : short;
}
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
    });
    player.value.addEventListener('ended', (event) => {
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

const route = useRoute();

watch(
	() => route.params.id,
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
                class="py-2 px-2 bg-slate-200 dark:bg-slate-700 ml-2 rounded-full block md:hidden"
                @click="store.commit('asideToggle')"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>
            </button>
            <div class="xl:mt-4 p-3">
                <div class="flex justify-center gap-3">
                    <button
                        class="py-2 px-3 bg-slate-300 dark:bg-slate-700 rounded-full active:scale-95 disabled:dark:bg-red-500/20 disabled:bg-red-500/20"
                        @click="playPrev"
                        :disabled="store.state.playing == store.state.limit.start"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
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
                    class="py-2 px-3 bg-slate-300 dark:bg-slate-700 rounded-full active:scale-95 disabled:dark:bg-red-500/20 disabled:bg-red-500/20"
                        @click="playNext"
                        :disabled="store.state.playing == store.state.limit.end"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

            <div class="xl:mt-10 flex justify-center items-center xl:pt-5 pr-3 xl:pr-0">
                <button @click="toggleDark" class="flex gap-2 py-2 dark:bg-slate-700 px-3 bg-slate-300 hover:bg-slate-400 active:scale-95 rounded-md">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span class="md:block hidden">
                        Toggle dark
                    </span>
                </button>
            </div>

        </div> 
    </div>
</template>
