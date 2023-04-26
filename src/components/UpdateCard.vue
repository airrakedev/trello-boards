<template>
	<!-- <modal-wrapper>
		<template #title> Modal Wrapper </template>
	</modal-wrapper> -->
	<!-- <router-view> -->
	<h1>Unsa go ni UY! Ambot lang</h1>
	<!-- </router-view> -->
</template>
<script setup lang="ts">
// import ModalWrapper from "@/components/modal/generic.vue";
import { onMounted } from "vue";
import { cardModalState } from "@/composables/updateModalState";

const { open } = cardModalState();

onMounted(() => {
	// open();
	console.log("inside out!!");
});
</script>
