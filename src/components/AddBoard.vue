<template>
	<div class="add-board">
		<div v-if="!isAddBoard" class="add-board__btn">
			<button class="col-width" @click="isAddBoard = true">
				<plus-icon class="mr-1.5"></plus-icon>
				Add another list
			</button>
		</div>
		<div v-if="isAddBoard" class="add-board__form col-width">
			<form @submit.prevent="submitBoard">
				<div class="form-input">
					<input
						type="text"
						v-model="boardTitle"
						placeholder="Enter list title..."
						autofocus
					/>
				</div>
				<div class="form-btn flex">
					<input type="submit" class="form-add-btn" value="Add list" />
					<button @click.prevent="isAddBoard = false" class="form-cancel-btn">
						<close-icon class="text-gray-600"></close-icon>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import PlusIcon from "@/assets/svg/plus.vue";
import CloseIcon from "@/assets/svg/close.vue";

import { ref } from "vue";

const emit = defineEmits(["submit-board"]);

let isAddBoard = ref<Boolean>(false);
let boardTitle = ref<String>("");

// Methods
const submitBoard = () => {
	emit("submit-board", boardTitle.value);
	boardTitle.value = "";
	isAddBoard.value = false;
};
</script>

<style scoped lang="scss">
.add-board {
	&__btn {
		@apply rounded-lg bg-gray-400 p-2 text-white flex hover:bg-slate-500;
		button {
			@apply flex px-2 py-1;
		}
	}
	&__form {
		@apply bg-white rounded-lg px-2.5 py-2;
		.form-input {
			input {
				@apply border-blue-600 border-2 rounded p-1.5 w-full;
			}
		}
		.form-btn {
			@apply mt-2;
			.form-add-btn {
				@apply bg-blue-600 text-white px-3.5 py-1.5 rounded hover:bg-blue-700 mr-1.5;
			}
		}
	}
}
</style>
