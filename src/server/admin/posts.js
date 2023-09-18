import {Post, knex, PostCategory} from './db.js';

export async function addPost( post ) {
	return await Post.create({
		postTitle: post.postTitle,
		postContent: post.postContent,
		datePublished: post.datePublished,
		postSlug: post.postSlug,
		StatusStatusId: post.StatusStatusId,
		UserUserId: post.UserUserId,
		PostCategoryPostCategoryId: post.PostCategoryPostCategoryId
	});
}

export function editPost( post ) {
	return knex('posts')
			.where({postId: post.postId})
			.update( post );
}

export function getPosts( limit ) {
	return knex('posts')
			.select('*')
			.limit(limit);
}

export function getPostById( id ) {
	return knex('testimonials')
			.select('*')
			.where({ postId: id })
			.first();
}

export async function addPostCategory( category ) {
	return await PostCategory.create({
		postCategory: category.postCategory
	});
}