export function randomId(): string {
	const alp: string =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
	let uid = "";
	for (let i = 0; i < 6; i++) {
		uid += alp.charAt(Math.floor(Math.random() * alp.length));
	}
	return uid;
}
