import { Testimonial, knex } from './db.js';

export async function addTestimonial( testimonial ) {
	return await Testimonial.create({
		testimonialContent: testimonial.testimonialContent,
		testimonialAuthor: testimonial.testimonialAuthor,
		testimonialBio: testimonial.testimonialBio,
		PagePageId: testimonial.PagePageId
	});
}

export function getTestimonials( limit ) {
	return knex('testimonials')
			.select('*')
			.limit(limit);
}