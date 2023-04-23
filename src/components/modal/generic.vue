<template>
	<div class="fixed inset-0 z-30 flex items-center justify-center">
		<div class="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
		<div class="bg-white rounded-lg shadow-lg p-8 z-50">
			<h2 class="text-lg font-bold mb-4">Modal Title</h2>
			<p class="mb-4">Modal content goes here.</p>
			<div class="flex justify-end">
				<button class="bg-red-500 text-white px-4 py-2 rounded mr-2">
					Cancel
				</button>
				<button class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="scss"></script>
