import axios from "axios";

export const axiosConfigGet = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
};


// Dashboard

export const getRecents = async () => {
	const data = await axios.get('/api/admin/dashboard', axiosConfigGet );
	return data.data;
}


// Pages

export const getPages = async ( limit ) => {
	const data = await axios.get('/api/admin/pages', { ...axiosConfigGet, params: {
			limit: limit
		}});
	return data.data;
};

export const getPageById = async ( id ) => {
	const data = await axios.get('/api/admin/pages/' + id, axiosConfigGet );
	return data.data;
};


// Posts

export const getPosts = async ( limit ) => {
	const data = await axios.get('/api/admin/posts', { ...axiosConfigGet, params: {
			limit: limit
		}});
	return data.data;
};

export const getPostById = async ( id ) => {
	const data = await axios.get('/api/admin/posts/' + id, axiosConfigGet );
	return data.data;
};

export const getPostCategories = async () => {
	const data = await axios.get('/api/admin/posts/categories', axiosConfigGet );
	return data.data;
}


// Testimonials

export const getTestimonials = async ( limit ) => {
	const data = await axios.get('/api/admin/testimonials', { ...axiosConfigGet, params: {
			limit: limit
		}});
	return data.data;
};

export const getTestimonialById = async ( id ) => {
	const data = await axios.get('/api/admin/testimonials/' + id, axiosConfigGet );
	return data.data;
};


// Images

export const getImages = async ( limit ) => {
	const data = await axios.get('/api/admin/images', { ...axiosConfigGet, params: {
			limit: limit
		}});
	return data.data;
}
