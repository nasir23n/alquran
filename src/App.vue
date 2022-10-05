<script setup>
	import axios from 'axios';
	import { onBeforeMount, reactive, ref, watch } from 'vue';
	import Controls from './components/Controls.vue';
	import SuraList from './components/Aside/SuraList.vue';
	import { useStore } from 'vuex';
import HomeView from './views/HomeView.vue';
	const suraList = ref([]);
	const selectedSura = ref(1);
	const store = useStore();

	watch(
		() => store.state.selectedSura,
		async newId => {
			selectedSura.value = newId ? Number(newId) : 1;
			store.commit('asideToggle');
		}
	);
	
	onBeforeMount(() => {
		axios.get('https://api.alquran.cloud/v1/surah')
			.then(result => {
				suraList.value = result.data.data;
			});
	});
	
	</script>
	
	<template>
		<div class="min-h-full flex">
			<!-- left sidebar -->
			<SuraList
				:suras="suraList"
				:selected="selectedSura"
			/>

			<HomeView />
			<!-- right sidebar -->
	
			<Controls />
		</div>
	</template>
	