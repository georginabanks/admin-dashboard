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
			.update( post );
	
	if (data > 0) { return getPostById(post.postId) }
	else { return data }
}

export function getPosts( limit ) {
	return knex('posts')
			.select('*')
			.limit(limit);
}

export function getPostById( id ) {
	return knex('posts')
			.select('*')
			.where({ postId: id })
			.first();
}

export async function addPostCategory( category ) {
	return await PostCategory.create({
		postCategory: category.postCategory
	});
}

export async function deletePost( id ) {
	const data = await knex('posts')
			.where({ postId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return data }
}