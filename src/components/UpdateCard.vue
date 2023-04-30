<template>
	<!-- <modal-wrapper>
		<template #title> Modal Wrapper </template>
	</modal-wrapper> -->
	<!-- <router-view> -->
	<p>{{ record }}</p>
	<h1>Unsa go ni UY! Ambot lang</h1>
	<!-- </router-view> -->
</template>
<script setup lang="ts">
// import ModalWrapper from "@/components/modal/generic.vue";
import { onMounted, computed } from "vue";

import { storeToRefs } from "pinia";
import { useCardStore } from "@/stores/card";

const { getTheCard, theCard } = storeToRefs(useCardStore());
const { fetchCard } = useCardStore();

const props = defineProps({
	columnId: {
		type: Number,
		required: true,
	},
	cardId: {
		type: Number,
		required: true,
	},
});

// COMPUTED
const record = computed(() => theCard);

onMounted(() => {
	console.log(props.columnId, props.cardId, "ubnsa god ni");
	fetchCard(props.columnId, props.cardId);
	console.log(getTheCard, "The cards selected");
});
</script>
