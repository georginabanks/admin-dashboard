import { Post, knex } from './db.js';

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

export function getPosts( limit ) {
	return knex('posts')
			.select('*')
			.limit(limit);
}