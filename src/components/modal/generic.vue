<template>
	<div
		v-if="isVisible"
		class="fixed inset-0 z-30 flex items-center justify-center"
	>
		<div class="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
		<div v-bind="$attrs" class="bg-white rounded-lg shadow-lg px-6 py-6 z-50">
			<slot name="title">
				<h2 class="text-lg font-bold mb-4">Modal Title</h2>
			</slot>
			<slot name="body">
				<p class="mb-4">Modal content goes here.</p>
			</slot>
		</div>
	</div>
</template>
<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>
<script setup lang="ts">
import cardModalState from "@/composables/updateModalState";
const { isVisible } = cardModalState();

// COMPUTED
// const isVisible = computed(() => getVisible);

// METHODS
</script>

<style scoped lang="scss"></style>
