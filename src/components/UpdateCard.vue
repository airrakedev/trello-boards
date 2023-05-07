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
								<QuillEditor
									v-model:content="theDescription"
									contentType="html"
									placeholder="Add a more detailed description..."
									:options="options"
									class="the-editor"
								/>
								<div class="mt-2">
									<button
										class="rounded bg-blue-500 text-white px-4 py-2 text-sm"
										@click="saveDescription"
										:disabled="isLoading"
										:class="{ 'bg-blue-200': isLoading }"
									>
										{{ isLoading ? "Wait" : "Save" }}
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

import { onMounted, ref, computed, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import cardModalState from "@/composables/updateModalState";

const { close } = cardModalState();

import { storeToRefs } from "pinia";
import { useCardStore } from "@/stores/card";

const store = useCardStore();
const { getTheCard, theCard, theColumnId } = storeToRefs(useCardStore());
const { fetchCard, saveCurrentCard } = useCardStore();

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
const theDescription = ref("");
const isLoading = ref(false);

// COMPUTED

// WATCH
// watch(
// 	() => theCard,
// 	(v) => {
// 		console.log(v.value, "ist watcher");
// 	},
// 	{ immediate: true }
// );

// METHODS
const hideModal = async () => {
	await router.push({ name: "Board" });
	close();
};

const saveDescription = (): void => {
	if (store.theCard.description === theDescription.value) return;

	isLoading.value = true;
	store.$patch(({ theCard }) => (theCard.description = theDescription.value));
	saveCurrentCard(props.columnId);

	setTimeout(() => {
		isLoading.value = false;
	}, 750);
};

onMounted(async () => {
	const fetch = await fetchCard(props.columnId, props.cardId);
	if (theCard.value?.description && theCard.value.description.length) {
		theDescription.value = theCard.value.description;
	}

	if (!fetch) {
		await hideModal();
	}
});
</script>

<style lang="scss">
.ql-toolbar {
	font-family: inherit;
	@apply bg-white;
}
.ql-container {
	@apply bg-white;
	.ql-editor {
		padding-top: 20px;
		padding-bottom: 20px;
		font-size: 14px;
		font-family: inherit;
		min-height: 200px;
		&:before {
			font-style: inherit;
		}
	}
}
</style>
