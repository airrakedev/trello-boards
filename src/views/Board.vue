<template>
	<div class="boards">
		<div class="extra-width h-screen flex pr-6 bg-teal-500">
			<!-- <template v-for="(column, index) in getCards" :key="index"> -->
			<draggable
				v-model="getCards"
				item-key="index"
				class="w-full px-6 overflow-x-auto mx-auto py-6 flex justify-start gap-6"
				@change.self="columnChange"
			>
				<template #item="{ element, index }">
					<div class="list col-width">
						<div class="main-card">
							<div class="list-header flex justify-between items-center">
								{{ element.title }}
								<button>
									<circle-close-icon
										class="text-gray-300 hover:text-gray-400"
									/>
								</button>
							</div>
							<div class="list-card-body">
								<!-- <template v-for="(card, ci) in element.cards" :key="ci"> -->
								<draggable v-model="element.cards" item-key="id" group="a">
									<template #item="card">
										<div
											class="list-cards flex justify-between items-center group"
										>
											<a
												href="#"
												@click.prevent="updateCard(element.id, card.element.id)"
											>
												{{ card.element.title }}
											</a>
											<button>
												<close-icon
													class="hidden group-hover:block w-4 h-4 text-gray-300 hover:text-gray-400"
												/>
											</button>
										</div>
									</template>
								</draggable>
								<!-- </template> -->
							</div>
							<div class="list-card-footer">
								<button
									v-if="!element.isAddActive"
									class="add-card"
									@click.prevent="toggleAddCard(index)"
								>
									<span class="icon-add">
										<plus-icon />
									</span>
									<span class="add-card"> Add a card </span>
								</button>
								<!-- Adding Card deck -->
								<template v-else>
									<add-card-form
										@submit="submitCardInput(index)"
										@toggleCard="toggleAddCard(index)"
										v-model="element.cardValue"
									></add-card-form>
								</template>
							</div>
						</div>
					</div>
				</template>

				<template #footer>
					<add-board @submit-board="addColumn"></add-board>
				</template>
			</draggable>
			<!-- </template> -->
		</div>
	</div>

	<modal-dialog ref="cardDialog">
		<template #body>
			<router-view :key="route.path"></router-view>
		</template>
	</modal-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import draggable from "vuedraggable";

import PlusIcon from "@/assets/svg/plus.vue";
import CircleCloseIcon from "@/assets/svg/circleClose.vue";
import CloseIcon from "@/assets/svg/close.vue";

import AddBoard from "@/components/AddBoard.vue";
import ModalDialog from "@/components/modal/generic.vue";
import AddCardForm from "@/components/forms/AddCardForm.vue";

import modalState from "@/composables/updateModalState.ts";

import { storeToRefs } from "pinia";
import { useCardStore } from "@/stores/card";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const { isVisible, open, close } = modalState();
const { getCards } = storeToRefs(useCardStore());
const { toggleCardForm, submitCard, addColumn, moveColumn } = useCardStore();

const cardDialog = ref<InstanceType<typeof ModalDialog> | null>(null);

// METHODS
const updateCard = async (columnId: string, cardId: string) => {
	await router.push({ name: "UpdateCard", params: { columnId, cardId } });
};

const columnChange = ({ moved }) => {
	console.log(moved, "column event");
	moveColumn(moved);
};

const toggleAddCard = async (index: string) => {
	console.log(index, "unsay index diay");
	toggleCardForm(index);
};

const submitCardInput = async (i) => {
	submitCard(i);
};

// WATCH
watch(
	() => route.name,
	(nv) => {
		if (nv === "UpdateCard") {
			open();
		}

		if (nv === "Board" && isVisible.value) {
			close();
		}
	},
	{ deep: true, immediate: true }
);
// MOUNTED
onMounted(() => {
	// console.log(isVisible.value, "modal State");
});
</script>
<style scoped lang="scss">
.boards {
	.list {
		.main-card {
			@apply rounded-lg text-gray-700 bg-gray-50 text-sm;
			.list-header {
				@apply py-2.5 px-2 relative font-semibold;
			}
			.list-card-body {
				@apply mx-1 px-1 pt-1 pb-1;
				.list-cards {
					@apply rounded-md mb-2 relative bg-white shadow py-2 px-2.5;
				}
				.list-cards:last-child {
					@apply mb-0;
				}
			}
			.list-card-footer {
				@apply w-full p-1.5;
				button.add-card {
					@apply p-1.5 rounded-lg hover:bg-gray-300 w-full text-left;
					display: flex;
					align-items: center;
					span.icon-add {
						@apply mr-1.5 text-xl pl-1;
					}
				}
			}
		}
	}
}
</style>
