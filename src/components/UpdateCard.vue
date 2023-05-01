<template>
	<modal-wrapper class="w-3/5">
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
		<template #body>
			<div class="flex mt-8">
				<div class="flex-auto w-4/5 mr-4">
					<div class="flex flex-col items-start">
						<div class="main-title flex items-center mb-3">
							<description-icon class="text-gray-600 mr-3"></description-icon>
							<div class="text-lg font-medium">Description</div>
						</div>
						<div class="w-full pl-9">
							<div
								class="dummy-textarea rounded bg-gray-100 p-3 pb-8 hover:bg-gray-200 cursor-pointer"
								v-if="!isDescription"
								@click="isDescription = true"
							>
								Add a more detailed description...
							</div>
							<div v-else class="flex flex-col justify-start">
								<QuillEditor :options="options" />
								<div class="mt-2">
									<button
										class="rounded bg-blue-500 text-white px-4 py-2 text-sm"
									>
										Save
									</button>
									<button
										class="rounded px-3 py-2 text-sm hover:bg-gray-200 ml-1"
										@click="isDescription = false"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-auto w-1/5 bg-gray-100">Sidebar</div>
			</div>
		</template>
	</modal-wrapper>
</template>
<script setup lang="ts">
import ModalWrapper from "@/components/modal/generic.vue";
import WindowIcon from "@/assets/svg/window.vue";
import CloseIcon from "@/assets/svg/close.vue";
import DescriptionIcon from "@/assets/svg/description.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { onMounted, ref, computed } from "vue";
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

// DATA
const options = ref({
	debug: "info",
	modules: {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike", "code"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["image", "link"],
		],
	},
	placeholder: "Write a comment...",
	readOnly: false,
	theme: "snow",
});

const isDescription = ref(false);

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

<style lang="scss">
.ql-toolbar {
	font-family: inherit;
}
.ql-container {
	.ql-editor {
		padding-top: 20px;
		padding-bottom: 20px;
		font-size: 14px;
		font-family: inherit;
		&:before {
			font-style: inherit;
		}
	}
}
</style>
