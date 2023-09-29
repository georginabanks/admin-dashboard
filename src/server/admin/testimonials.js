import { Testimonial, knex } from './db.js';

export async function addTestimonial( testimonial ) {
	return await Testimonial.create({
		testimonialContent: testimonial.testimonialContent,
		testimonialAuthor: testimonial.testimonialAuthor,
		testimonialBio: testimonial.testimonialBio,
		PagePageId: testimonial.PagePageId
	});
}

export async function editTestimonial( testimonial ) {
	const data = await knex('testimonials')
			.where({ testimonialId: testimonial.testimonialId })
			.leftJoin('pages', { 'pages.pageId' : 'testimonials.PagePageId' })
			.update( testimonial )
			.catch( err => { return err } );
	
	if (data > 0) { return getTestimonialById(testimonial.testimonialId) }
	else { return 'error' + data }
}

export function getTestimonials( limit, query ) {
	if ( query && query.length > 0 ) {
		return knex('testimonials')
				.select('*')
				.leftJoin('pages', {'pages.pageId': 'testimonials.PagePageId'})
				.orWhereILike('testimonialContent', `%${query}%`)
				.orWhereILike('testimonialAuthor', `%${query}%`)
				.orWhereILike('testimonialBio', `%${query}%`)
				.orWhereILike('title', `%${query}%`)
				.orderBy('testimonialId', 'desc')
				.limit(limit);
	} else {
		return knex('testimonials')
				.select('*')
				.leftJoin('pages', {'pages.pageId': 'testimonials.PagePageId'})
				.limit(limit);
	}
}

export function getTestimonialById( id ) {
	return knex('testimonials')
			.select('*')
			.leftJoin('pages', { 'pages.pageId' : 'testimonials.PagePageId' })
			.where({ testimonialId: id })
			.first();
}

export async function deleteTestimonial( id ) {
	const data = await knex('testimonials')
			.where({ testimonialId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return 'error' + data }
}