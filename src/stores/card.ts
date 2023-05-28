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
	const theColumnId = ref(null);

	// GETTERS
	const getCards = computed(() => cards.value);
	const getThecard = computed(() => theCard.value);

	// METHODS
	const toggleCardForm = (index: number): void => {
		cards.value.forEach((v, i) => {
			if (i != index && v.isAddActive) {
				v.isAddActive = false;
			}
		});
		cards.value[index].isAddActive = !cards.value[index].isAddActive;
	};

	const saveCurrentCard = (colId): void => {
		const col = cards.value.find((v) => v.id === colId);
		if (col) {
			col.cards.forEach((v) => {
				if (v.id === theCard.value.id) {
					v.description = theCard.value.description;
				}
			});
		}
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
		return new Promise((resolve) => {
			if (!result) {
				return resolve(false);
			}
			theCard.value = result;
			theColumnId.value = colId;
			return resolve(true);
		});
	};

	const moveColumn = ({ newIndex, oldIndex, element }) => {
		cards.value.splice(oldIndex, 1); //remove selected cards
		cards.value.splice(newIndex, 0, element); //splice selected cards
	};

	return {
		cards,
		getCards,
		theCard,
		getThecard,
		toggleCardForm,
		saveCurrentCard,
		submitCard,
		addColumn,
		fetchCard,
		moveColumn,
		theColumnId,
	};
});
