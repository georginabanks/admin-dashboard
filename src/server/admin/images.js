import {Image, knex} from "./db.js";

export async function addImage( img ) {
	return await Image.create({
		filename: img.filename,
		dateUploaded: img.dateUploaded
	});
}

export async function editImage( img ) {
	const data = await knex('images')
			.where({ imageId: img.imageId })
			.update( img )
			.catch( err => { return err });
	
	if (data > 0) { return getImageById(img.imageId) }
	else { return 'error ' + data }
}

export function getImages( limit ) {
	if ( limit > 0 ) {
		return knex('images')
				.select('*')
				.limit( limit );
	} else {
		return knex('images')
				.select('*');
	}
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
