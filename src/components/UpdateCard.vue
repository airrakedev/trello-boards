<template>
	<modal-wrapper class="w-2/4">
		<template #title>
			<div class="flex justify-between items-center">
				<div class="main-title flex items-center">
					<window-icon class="text-gray-600 mr-3"></window-icon>
					<div class="text-xl font-medium">{{ theCard?.title }}</div>
				</div>
				<div class="close">
					<close-icon
						@click="hideModal"
						class="text-gray-600 hover:cursor-pointer hover:text-gray-700"
					></close-icon>
				</div>
			</div>
		</template>
	</modal-wrapper>
</template>
<script setup lang="ts">
import ModalWrapper from "@/components/modal/generic.vue";
import WindowIcon from "@/assets/svg/window.vue";
import CloseIcon from "@/assets/svg/close.vue";

import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import cardModalState from "@/composables/updateModalState";

const { close } = cardModalState();

import { storeToRefs } from "pinia";
import { useCardStore } from "@/stores/card";

const { getTheCard, theCard } = storeToRefs(useCardStore());
const { fetchCard } = useCardStore();

const router = useRouter();

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

// METHODS
const hideModal = async () => {
	await router.push({ name: "Board" });
	close();
};

onMounted(() => {
	console.log(props.columnId, props.cardId, "ubnsa god ni");
	fetchCard(props.columnId, props.cardId);
	console.log(getTheCard, "The cards selected");
});
</script>
