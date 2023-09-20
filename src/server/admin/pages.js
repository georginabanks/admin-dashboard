import { Page, knex } from "./db.js";

export async function addPage( page ) {
	return await Page.create({
		title: page.title,
		content: page.content,
		datePublished: page.datePublished,
		slug: page.slug,
		StatusStatusId: page.StatusStatusId,
		UserUserId: page.UserUserId
	});
}

export async function editPage( page ) {
	const data = await knex('pages')
			.where({ pageId: page.pageId })
			.update( page )
			.catch( err => { return err });
	
	if (data > 0) { return getPageById(page.pageId) }
	else { return 'error ' + data }
}

export function getPages( limit ) {
	return knex('pages')
			.select('*')
			.limit(limit);
}

export function getPageById( id ) {
	return knex('pages')
			.select('*')
			.where({ pageId: id })
			.first();
}

export async function deletePage( id ) {
	const data = await knex('pages')
			.where({ pageId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return `error ` + data }
}

console.log(await editPage({ pageId: 6, content: 'maybe' }))