import { Page, knex } from "./db.js";

export async function addPage( page ) {
	return await Page.create({
		title: page.title,
		content: page.content,
		datePublished: page.datePublished,
		slug: page.slug,
		StatusStatusId: page.StatusStatusId,
		UserUserId: page.UserUserId,
		featuredImage: page.imageId
	});
}

export async function editPage( page ) {
	delete page.postCategory;
	
	const data = await knex('pages')
			.where({ pageId: page.pageId })
			.leftJoin('statuses', { 'pages.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('images', { 'pages.featuredImage' : 'images.imageId' })
			.update( page )
			.catch( err => { return err });
	
	if (data > 0) { return getPageById(page.pageId) }
	else { return 'error ' + data }
}

export function getPages( limit ) {
	return knex('pages')
			.select('*')
			.leftJoin('statuses', { 'pages.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('images', { 'pages.featuredImage' : 'images.imageId '})
			.limit(limit);
}

export function getPageById( id ) {
	return knex('pages')
			.select('*')
			.leftJoin('statuses', { 'pages.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('images', { 'pages.featuredImage' : 'images.imageId '})
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
