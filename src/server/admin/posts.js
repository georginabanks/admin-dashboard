import {Post, knex, PostCategory} from './db.js';

export async function addPost( post ) {
	return await Post.create({
		title: post.title,
		content: post.content,
		datePublished: post.datePublished,
		slug: post.slug,
		StatusStatusId: post.StatusStatusId,
		UserUserId: post.UserUserId,
		PostCategoryPostCategoryId: post.PostCategoryPostCategoryId,
		featuredImage: post.imageId
	});
}

export async function editPost( post ) {
	const data = await knex('posts')
			.where({ postId: post.postId })
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
			.leftJoin('images', { 'posts.featuredImage' : 'images.imageId '})
			.update( post )
			.catch( err => { return err });
	
	if (data > 0) { return getPostById(post.postId) }
	else { return 'error ' + data }
}

export function getPosts( limit ) {
	return knex('posts')
			.select('*')
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
			.leftJoin('images', { 'posts.featuredImage' : 'images.imageId' })
			.limit(limit);
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
