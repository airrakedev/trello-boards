<template>
	<div
		v-if="isVisible"
		class="fixed inset-0 z-30 flex items-center justify-center"
	>
		<div class="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
		<div
			v-bind="$attrs['class']"
			class="bg-white rounded-lg shadow-lg px-8 py-6 z-50"
		>
			<slot name="title">
				<h2 class="text-lg font-bold mb-4">Modal Title</h2>
			</slot>
			<slot name="body">
				<p class="mb-4">Modal content goes here.</p>
			</slot>

			<div class="flex justify-end">
				<button
					@click="isVisible = false"
					class="bg-red-500 text-white px-4 py-2 rounded"
				>
					<slot name="cancel-title"> Cancel </slot>
				</button>
				<slot name="submit"> </slot>
				<!-- <button class="bg-green-500 text-white px-4 py-2 rounded">Save</button> -->
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref } from "vue";

let isVisible = ref(true);

// METHODS
const open = () => {
	isVisible.value = true;
};
</script>

<style scoped lang="scss"></style>
