import { Image, knex } from './db.js';

export function getTestimonials( limit ) {
	return knex('testimonials')
			.select('*')
			.limit(limit);
}