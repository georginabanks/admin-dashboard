import { Page, knex } from "./db.js";

export async function addPage( page ) {
	return await Page.create({
	
	});
}

export function getPages( limit ) {
	return knex('pages')
			.select('*')
			.limit(limit);
}