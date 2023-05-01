import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addCardId } from "@/helpers/various";
import { useLocalStorage } from "@vueuse/core";
import type { Columns, Cards } from "@/models";
import { randomId } from "@/helpers/various";

export const useCardStore = defineStore("card", () => {
	// STATE
	const cards = ref(useLocalStorage("cards", addCardId()));
	const theCard = ref(null);

	// GETTERS
	const getCards = computed(() => cards.value);
	const getThecard = computed(() => theCard.value);

	// METHODS
	const toggleCardForm = (index: number): void => {
		cards.value[index].isAddActive = !cards.value[index].isAddActive;
	};

	const submitCard = (index: number): void => {
		const col = cards.value[index] as Columns;
		if (!col.cardValue.length) return;

		const newCards = {
			id: randomId(),
			title: col.cardValue,
		} as Cards;

		cards.value[index].cards.push(newCards);
		col.cardValue = "";
	};

	const addColumn = (title: string): void => {
		if (!title.length) return;
		const col = {
			id: randomId(),
			title: title,
			isAddActive: false,
			cardValue: "",
			cards: [],
		};
		cards.value.push(col);
	};

	const fetchCard = (colId, cardId): void => {
		const result = cards.value
			.find((c) => c.id === colId)
			?.cards.find((card) => card.id === cardId);
		console.log(result, "hahaha");
		if (!result) {
			return false;
		}
		theCard.value = result;
	};

	return {
		cards,
		getCards,
		theCard,
		getThecard,
		toggleCardForm,
		submitCard,
		addColumn,
		fetchCard,
	};
});
