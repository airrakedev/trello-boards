import cards from "./card.json";
import type { Columns } from "@/models/index.ts";

export function randomId(): string {
	const alp: string =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
	let uid = "";
	for (let i = 0; i < 6; i++) {
		uid += alp.charAt(Math.floor(Math.random() * alp.length));
	}
	return uid;
}

export function addCardId(): Columns[] {
	if (Array.isArray(cards)) {
		cards.forEach((v) => {
			v.id = randomId();
			if (Array.isArray(v.cards)) {
				v.cards.forEach((v1) => {
					v1.id = randomId();
				});
			}
		});
	}
	return cards as Columns;
}
