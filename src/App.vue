<template>
	<RouterView :key="route.name" />
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped></style>
