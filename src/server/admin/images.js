import {Image, knex} from "./db.js";

export async function addImage( img ) {
	return await Image.create({
		filename: img.filename,
		dateUploaded: img.dateUploaded
	});
}

export function getImages( limit ) {
	return knex('images')
			.select('*')
			.limit(limit);
}

export function getImageById( id ) {
	return knex('images')
			.select('*')
			.where({ imageId: id })
			.first();
}

export async function deleteImage( id ) {
	const data = await knex('images')
			.where({ imageId: id })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return `error` + data }
}
