import { ref, watch } from "vue";

export function useTheme() {
    if (localStorage.getItem('theme') == 'dark') {
        document.querySelector('html').classList.add('dark');
    }

    function toggleDark() {
        let theme = localStorage.getItem('theme');
        if (theme == 'dark') {
            document.querySelector('html').classList.remove('dark')
            localStorage.removeItem('theme');
        } else {
            document.querySelector('html').classList.add('dark')
            localStorage.setItem('theme', 'dark');
        }
    }
    return { toggleDark };
}

export function usePlayer() {
    const playing = ref(1);

    return playing;
}

export function targetSura() {
    const suraForRander = ref([]);

    return suraForRander
}