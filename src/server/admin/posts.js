import {Post, knex, PostCategory} from './db.js';

export async function addPost( post ) {
	return await Post.create({
		title: post.title,
		content: post.content,
		datePublished: post.datePublished,
		slug: post.slug,
		StatusStatusId: post.StatusStatusId,
		UserUserId: post.UserUserId,
		PostCategoryPostCategoryId: post.PostCategoryPostCategoryId
	});
}

export async function editPost( post ) {
	const data = await knex('posts')
			.where({ postId: post.postId })
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
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
			.limit(limit);
}

export function getPostById( id ) {
	return knex('posts')
			.select('*')
			.leftJoin('statuses', { 'posts.StatusStatusId' : 'statuses.statusId' })
			.leftJoin('postCategories', { 'posts.PostCategoryPostCategoryId' : 'postCategory' })
			.where({ postId: id })
			.first();
}

export async function addPostCategory( category ) {
	return await PostCategory.create({
		postCategory: category
	});
}

export async function getPostCategories() {
	return knex('postCategories')
			.select('*');
}

export async function deletePost( id ) {
	const data = await knex('posts')
			.where({ postId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return 'error ' + data }
}