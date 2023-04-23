export interface Cards {
	id: string;
	title?: string;
	description: string;
}

export interface Columns {
	id: string;
	title: string;
	isAddActive: Boolean;
	cardValue: string;
	cards: Cards[];
}
