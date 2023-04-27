<template>
	<div class="h-screen flex flex-col items-center justify-center">
		<div class="text-9xl font-black text-gray-700 leading-tight">Oops!</div>
		<div class="text-2xl leading-snug text-pink-600">
			This is uncharted territory. Get out of here!
		</div>
		<router-link
			class="bg-teal-500 rounded-md text-white font-medium mt-4 px-8 py-3"
			:to="{ name: 'Board' }"
		>
			Go Home
		</router-link>
	</div>
</template>
