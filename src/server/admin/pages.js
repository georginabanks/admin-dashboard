import { Page, knex } from "./db.js";

export async function addPage( page ) {
	
	page.year && page.year.length > 0
			? page.datePublished = new Date(`${page.year}-${page.month}-${page.date}T00:00:00.000Z`)
			: page.datePublished = new Date();
	
	delete page.year;
	delete page.month;
	delete page.date;
	
	let userId;
	if ( page.username ) {
		const data = await knex('users')
				.select('userId')
				.where('username', page.username)
				.first();
		
		userId = data.userId;
	}
	
	const data = await Page.create({
		title: page.title,
		content: page.content,
		datePublished: page.datePublished,
		slug: page.slug,
		StatusStatusId: page.StatusStatusId,
		UserUserId: userId,
		featuredImage: page.imageId
	});
	
	return await getPageById( data.pageId );
}

export async function editPage( page ) {
	delete page.postCategory;
	const datePublished = new Date(`${page.year}-${page.month}-${page.date}T00:00:00.000Z`) || page.datePublished;
	delete page.year;
	delete page.month;
	delete page.date;
	page.datePublished = datePublished;
	
	const data = await knex('pages')
			.where({ pageId: page.pageId })
			.leftJoin('statuses', { 'pages.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('images', { 'pages.featuredImage' : 'images.imageId' })
			.leftJoin('users', { 'pages.UserUserId' : 'users.userId' })
			.update( page )
			.catch( err => { return err });
	
	if (data > 0) { return getPageById(page.pageId) }
	else { return 'error ' + data }
}

export async function getPages( limit, query ) {
	if ( query && query.length > 0 && limit ) {
		return knex('pages')
				.select('*')
				.leftJoin('statuses', {'pages.StatusStatusId': 'statuses.statusId'})
				.leftJoin('images', {'pages.featuredImage': 'images.imageId '})
				.leftJoin('users', {'pages.UserUserId': 'users.userId'})
				.orWhereILike('title', `%${query}%`)
				.orWhereILike('content', `%${query}%`)
				.orWhereILike('slug', `%${query}%`)
				.orWhereILike('statusType', `%${query}%`)
				.orWhereILike('username', `%${query}%`)
				.orWhereILike('datePublished', `%${new Date(query).getDate()}%`)
				.orWhereILike('datePublished', `%${new Date(query).getMonth()}%`)
				.orWhereILike('datePublished', `%${new Date(query).getFullYear()}%`)
				.orderBy('pageId', 'desc')
				.limit(limit);
	} else if ( limit ) {
		return knex('pages')
				.select('*')
				.leftJoin('statuses', {'pages.StatusStatusId': 'statuses.statusId'})
				.leftJoin('images', {'pages.featuredImage': 'images.imageId '})
				.leftJoin('users', {'pages.UserUserId': 'users.userId'})
				.orderBy('pageId', 'desc')
				.limit(limit);
	} else {
		const data = await knex('pages')
				.select('*')
				.leftJoin('statuses', {'pages.StatusStatusId': 'statuses.statusId'})
				.leftJoin('images', {'pages.featuredImage': 'images.imageId '})
				.leftJoin('users', {'pages.UserUserId': 'users.userId'})
				.orderBy('pageId', 'desc');
		
		for (let i=0; i < data.length; i++) {
			data[i].testimonials = await knex('testimonials')
					.select('*')
					.where('PagePageId', data[i].pageId)
		}
		
		return data;
	}
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

console.log(await getPages())