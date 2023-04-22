<template>
	<div class="box-border">
		<div
			class="extra-width h-screen px-6 bg-teal-500 overflow-x-auto mx-auto py-6 flex justify-start gap-6"
		>
			<template v-for="(column, index) in columns" :key="index">
				<div class="list col-width">
					<div class="main-card">
						<div class="list-header">{{ column.title }}</div>
						<div class="list-card-body">
							<template v-for="(card, ci) in column.cards" :key="ci">
								<div class="list-cards">
									<a href="#">
										{{ card.title }}
									</a>
								</div>
							</template>
						</div>
						<div class="list-card-footer">
							<button class="add-card">
								<span class="icon-add">+</span>
								<span class="add-card"> Add a card </span>
							</button>
							<div class="add-card-form">
								<form>
									<div class="input-wrapper">
										<textarea
											placeholder="Enter a title for this card..."
											cols="30"
											rows="4"
										></textarea>
									</div>
									<div class="form-btn flex">
										<input
											type="submit"
											class="form-add-btn"
											value="Add card"
										/>
										<button class="form-cancel-btn">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- <div class="list col-width">
				<div class="main-card">
					<div class="list-header">List Header</div>
				</div>
			</div>
			<div class="list col-width">
				<div class="main-card">
					<div class="list-header">List Header</div>
				</div>
			</div>
			<div class="list col-width">
				<div class="main-card">
					<div class="list-header">List Header</div>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { randomId } from "./../helpers/various";

const columns = ref([
	{
		id: randomId(),
		title: "Goals",
		cards: [
			{
				id: randomId(),
				title: "Road Map",
				description: "first description",
				isAdd: false,
			},
			{
				id: randomId(),
				title: "MVP for Apheleia SLP usage",
				description: "first description",
				isAdd: false,
			},
			{
				id: randomId(),
				title: "MVP for exernal Beta Testers",
				description: "first description",
				isAdd: false,
			},
		],
	},
	{
		id: randomId(),
		title: "Backlog",
		cards: [
			{
				id: randomId(),
				title: "Add and edit resources",
				description: "first description",
				isAdd: false,
			},
			{
				id: randomId(),
				title: "Do more research about market competitors",
				description: "first description",
				isAdd: false,
			},
			{
				id: randomId(),
				title: "Search page & detailed card view page - implement figma design",
				description: "first description",
				isAdd: false,
			},
		],
	},
	{
		id: randomId(),
		title: "Sprint - Ready to implement",
		cards: [
			{
				id: randomId(),
				title: "Install Google Analytics and TruConversion heat tracking",
				description: "first description",
				isAdd: false,
			},
		],
	},
	{
		id: randomId(),
		title: "In Progress",
		cards: [],
	},
]);
</script>
