<template>
	<div class="add-card-form">
		<form @submit.prevent="submit">
			<div class="input-wrapper">
				<textarea
					placeholder="Enter a title for this card..."
					cols="30"
					rows="4"
					ref="textInput"
					v-model="cardValue"
				></textarea>
			</div>
			<div class="form-btn flex">
				<input type="submit" class="form-add-btn" value="Add card" />
				<button @click.prevent="toggleAddCard" class="form-cancel-btn">
					<close-icon></close-icon>
				</button>
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
import CloseIcon from "@/assets/svg/close.vue";

import { ref, computed, nextTick } from "vue";
const emit = defineEmits(["submit", "toggleCard", "update:modelValue"]);
const props = defineProps(["modelValue"]);

const textInput = ref<HTMLTextAreaElement>();

const submit = async () => {
	emit("submit");
	await nextTick();
	textInput.value?.focus();
};
const toggleAddCard = async () => {
	emit("toggleCard");
	await nextTick();
	textInput.value?.focus();
};

const cardValue = computed({
	get() {
		return props.modelValue;
	},
	set(v) {
		emit("update:modelValue", v);
	},
});
</script>
<style lang="scss">
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
</style>
