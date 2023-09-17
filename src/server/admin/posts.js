import { Post, knex } from './db.js';

export function getPosts( limit ) {
	return knex('posts')
			.select('*')
			.limit(limit);
}