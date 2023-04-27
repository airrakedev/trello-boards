import { ref, readonly, computed } from "vue";

const isVisible = ref(false);

export default () => {
	const getVisible = computed(() => isVisible.value);
	// METHODS
	const open = () => {
		isVisible.value = true;
	};
	const close = () => {
		isVisible.value = false;
		console.log(isVisible.value, "boom");
	};
	return {
		isVisible: readonly(isVisible),
		getVisible,
		open,
		close,
	};
};
