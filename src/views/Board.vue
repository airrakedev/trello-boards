<template>
	<div class="boards">
		<div
			class="extra-width h-screen px-6 bg-teal-500 overflow-x-auto mx-auto py-6 flex justify-start gap-6"
		>
			<template v-for="(column, index) in columns" :key="index">
				<div class="list col-width">
					<div class="main-card">
						<div class="list-header">{{ column.title }}</div>
						<div class="list-card-body">
							<template v-for="(card, ci) in column.cards" :key="ci">
								<div class="list-cards">
									<a href="#" @click.prevent="updateCard(column.id, card.id)">
										{{ card.title }}
									</a>
								</div>
							</template>
						</div>
						<div class="list-card-footer">
							<button
								v-if="!column.isAddActive"
								class="add-card"
								@click.prevent="toggleCardForm(index)"
							>
								<span class="icon-add">
									<plus-icon />
								</span>
								<span class="add-card"> Add a card </span>
							</button>
							<div v-else class="add-card-form">
								<form @submit.prevent="submitCard(index)">
									<div class="input-wrapper">
										<textarea
											placeholder="Enter a title for this card..."
											cols="30"
											rows="4"
											:autofocus="column.isAddActive"
											v-model="column.cardValue"
										></textarea>
									</div>
									<div class="form-btn flex">
										<input
											type="submit"
											class="form-add-btn"
											value="Add card"
										/>
										<button
											@click.prevent="toggleCardForm(index)"
											class="form-cancel-btn"
										>
											<close-icon></close-icon>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</template>
			<add-board @submit-board="addColumn"></add-board>
		</div>
	</div>
	<modal-dialog ref="cardDialog">
		<template #body>
			<router-view :key="route.path"></router-view>
		</template>
	</modal-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { randomId } from "./../helpers/various";

import type { Columns, Cards } from "./../models/index.ts";

import CloseIcon from "@/assets/svg/close.vue";
import PlusIcon from "@/assets/svg/plus.vue";
import AddBoard from "@/components/AddBoard.vue";
import ModalDialog from "@/components/modal/generic.vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const cardDialog = ref<InstanceType<typeof ModalDialog> | null>(null);
const columns = ref([
	{
		id: randomId(),
		title: "Goals",
		isAddActive: false,
		cardValue: "",
		cards: [
			{
				id: randomId(),
				title: "Road Map",
				description: "first description",
			},
			{
				id: randomId(),
				title: "MVP for Apheleia SLP usage",
				description: "first description",
			},
			{
				id: randomId(),
				title: "MVP for exernal Beta Testers",
				description: "first description",
			},
		],
	},
	{
		id: randomId(),
		title: "Backlog",
		isAddActive: false,
		cardValue: "",
		cards: [
			{
				id: randomId(),
				title: "Add and edit resources",
				description: "first description",
			},
			{
				id: randomId(),
				title: "Do more research about market competitors",
				description: "first description",
			},
			{
				id: randomId(),
				title: "Search page & detailed card view page - implement figma design",
				description: "first description",
			},
		],
	},
	{
		id: randomId(),
		title: "Sprint - Ready to implement",
		isAddActive: false,
		cardValue: "",
		cards: [
			{
				id: randomId(),
				title: "Install Google Analytics and TruConversion heat tracking",
				description: "first description",
			},
		],
	},
	{
		id: randomId(),
		title: "In Progress",
		isAddActive: false,
		cardValue: "",
		cards: [],
	},
]);

// METHODS
const toggleCardForm = (index: number) => {
	columns.value[index].isAddActive = !columns.value[index].isAddActive;
};

const submitCard = (index: number) => {
	const col = columns.value[index] as Columns;
	if (!col.cardValue.length) return;

	const newCards = {
		id: randomId(),
		title: col.cardValue,
	} as Cards;

	columns.value[index].cards.push(newCards);
	col.cardValue = "";
};
const addColumn = (title: string) => {
	if (!title.length) return;
	const col = {
		id: randomId(),
		title: title,
		isAddActive: false,
		cardValue: "",
		cards: [],
	};
	columns.value.push(col);
};

const updateCard = async (colId: string, cardId: string) => {
	console.log(colId, cardId, "column and card Id");
	// cardDialog.value?.open();
	await router.push({ name: "UpdateCard", params: { cardId } });

	console.log("mupalos ba ining open");
};

// MOUNTED
onMounted(() => {
	console.log("unday value");
	// cardDialog.value?.close();
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
				@apply mx-1 px-1;
				.list-cards {
					@apply rounded-md mb-2 relative bg-white shadow py-2 px-2.5;
				}
				.list-cards:last-child {
					@apply mb-0;
				}
			}
			.list-card-footer {
				@apply w-full p-1.5 mt-1;
				button.add-card {
					@apply p-1.5 rounded-lg hover:bg-gray-300 w-full text-left;
					display: flex;
					align-items: center;
					span.icon-add {
						@apply mr-1.5 text-xl pl-1;
					}
				}
				.add-card-form {
					@apply px-0.5;
					.input-wrapper {
						@apply shadow rounded-md bg-white px-2 pt-2 pb-0.5;
						textarea {
							@apply outline-none w-full;
						}
					}
					.form-btn {
						@apply mt-2;
						.form-add-btn {
							@apply rounded cursor-pointer px-3 py-1.5 bg-blue-600 text-white mr-1 hover:bg-blue-700;
						}
						.form-cancel-btn {
							@apply px-1 py-1.5;
						}
					}
				}
			}
		}
	}
}
</style>
