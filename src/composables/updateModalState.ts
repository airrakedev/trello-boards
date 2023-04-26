import { ref, computed } from "vue";

export const cardModalState = () => {
	const isVisible = ref(false);
	const getVisible = computed(() => isVisible.value);
	// METHODS
	const open = () => {
		isVisible.value = true;
	};
	const close = () => {
		isVisible.value = false;
		console.log(getVisible.value, "boom");
	};
	return {
		isVisible,
		getVisible,
		open,
		close,
	};
};
