import { Page, knex } from "./db.js";

export async function addPage( page ) {
	return await Page.create({
		pageTitle: page.pageTitle,
		pageContent: page.pageContent,
		datePublished: page.datePublished,
		pageSlug: page.pageSlug,
		StatusStatusId: page.StatusStatusId,
		UserUserId: page.UserUserId
	});
}

export function getPages( limit ) {
	return knex('pages')
			.select('*')
			.limit(limit);
}

export function getPageById( id ) {
	return knex('testimonials')
			.select('*')
			.where({ pageId: id })
			.first();
}