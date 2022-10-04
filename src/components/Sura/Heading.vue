<script setup>
import { defineProps } from 'vue'

defineProps({
    info: Object,
});
</script>
<template>
    <div class="items-center justify-center gap-5 flex">
        <span class="bg-green-100 text-green-800 text-2xl font-bold px-3 flex items-center justify-center py-4 rounded-full w-16 h-16">
            {{ info.number }}
        </span>
        <div class="flex-1">
            <h2 class="text-3xl font-bold">{{ info.englishName }}</h2>
            <h3 class="text-xl mt-2 font-bold mb-4 font-nh">{{ info.name }}</h3>
            <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                {{ info.englishNameTranslation }}
            </span>
            <span class="bg-green-700 text-green-100 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {{ info.revelationType }}
            </span>
        </div>
    </div>
</template>