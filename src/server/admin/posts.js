import {Post, knex, PostCategory} from './db.js';

export async function addPost( post ) {
	
	post.year && post.year.length > 0
			? post.datePublished = new Date(`${post.year}-${post.month}-${post.date}T00:00:00.000Z`)
			: post.datePublished = new Date();
	
	delete post.year;
	delete post.month;
	delete post.date;
	
	let userId;
	if ( post.username ) {
		const data = await knex('users')
				.select('userId')
				.where('username', post.username)
				.first();
		
		userId = data.userId;
	}
	
	const data = await Post.create({
		title: post.title,
		content: post.content,
		datePublished: post.datePublished,
		slug: post.slug,
		StatusStatusId: post.StatusStatusId,
		UserUserId: userId,
		PostCategoryPostCategoryId: post.PostCategoryPostCategoryId,
		featuredImage: post.imageId
	});
	
	return await getPostById( data.postId );
}

export async function editPost( post ) {
	const datePublished = new Date(`${post.year}-${post.month}-${post.date}T00:00:00.000Z`) || post.datePublished;
	delete post.year;
	delete post.month;
	delete post.date;
	post.datePublished = datePublished;
	
	const data = await knex('posts')
			.where({ postId: post.postId })
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
			.leftJoin('images', { 'posts.featuredImage' : 'images.imageId '})
			.leftJoin('users', { 'posts.UserUserId' : 'users.userId' })
			.update( post )
			.catch( err => { return err });
	
	if (data > 0) { return getPostById(post.postId) }
	else { return 'error ' + data }
}

export function getPosts( limit, query ) {
	if ( query && query.length > 0 ) {
		return knex('posts')
				.select('*')
				.leftJoin('statuses', {'posts.StatusStatusId': 'statuses.statusId'})
				.leftJoin('postCategories', {'posts.PostCategoryPostCategoryId': 'postCategory'})
				.leftJoin('images', {'posts.featuredImage': 'images.imageId'})
				.leftJoin('users', { 'posts.UserUserId' : 'users.userId' })
				.orWhereILike('title', `%${query}%`)
				.orWhereILike('content', `%${query}%`)
				.orWhereILike('slug', `%${query}%`)
				.orWhereILike('statusType', `%${query}%`)
				.orWhereILike('username', `%${query}%`)
				.orWhereILike('postCategory', `%${query}%`)
				.orWhereILike('datePublished', `%${new Date(query).getDate()}%`)
				.orWhereILike('datePublished', `%${new Date(query).getMonth()}%`)
				.orWhereILike('datePublished', `%${new Date(query).getFullYear()}%`)
				.orderBy('postId', 'desc')
				.limit(limit);
	} else {
		return knex('posts')
				.select('*')
				.leftJoin('statuses', {'posts.StatusStatusId': 'statuses.statusId'})
				.leftJoin('postCategories', {'posts.PostCategoryPostCategoryId': 'postCategory'})
				.leftJoin('images', {'posts.featuredImage': 'images.imageId'})
				.leftJoin('users', { 'posts.UserUserId' : 'users.userId' })
				.orderBy('postId', 'desc')
				.limit(limit);
	}
}

export function getPostById( id ) {
	return knex('posts')
			.select('*')
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
			.leftJoin('images', { 'posts.featuredImage' : 'images.imageId' })
			.where({ postId: id })
			.first();
}

export async function addPostCategory( category ) {
	return await PostCategory.create({
		postCategory: category
	});
}

export async function getPostCategories( filters ) {
	
	let data;
	if ( filters !== undefined ) {
		data = await knex('postCategories')
				.select('*')
				.where(filters );
	} else {
		data = await knex('postCategories')
				.select('*');
	}
	
	let newData = [];
	for (let i=0; i < data.length; i++) {
		newData.push({ ...data[i], ...await getCategoryCount({postCategoryId: data[i].postCategoryId}) })
	}
	
	return newData;
}

export async function getCategoryCount( filters ) {
	return knex('postCategories')
			.where(filters )
			.count('* as count')
			.first();
}

export async function deletePost( id ) {
	const data = await knex('posts')
			.where({ postId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return 'error ' + data }
}

export async function deletePostCategory( id ) {
	const data = await knex('postCategories')
			.where({ postCategoryId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return 'error ' + data }
}
