import axios from "axios";

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
};


// Dashboard

export const getRecents = async () => {
	const data = await axios.get('/api/admin/dashboard', axiosConfig );
	return data.data;
}


// Pages

export const getPages = async ( limit ) => {
	const data = await axios.get('/api/admin/pages', { ...axiosConfig, params: {
			limit: limit
		}});
	return data.data;
};

export const getPageById = async ( id ) => {
	const data = await axios.get('/api/admin/pages/' + id, axiosConfig );
	return data.data;
};


// Posts

export const getPosts = async ( limit ) => {
	const data = await axios.get('/api/admin/posts', { ...axiosConfig, params: {
			limit: limit
		}});
	return data.data;
};

export const getPostById = async ( id ) => {
	const data = await axios.get('/api/admin/posts/' + id, axiosConfig );
	return data.data;
};


// Testimonials

export const getTestimonials = async ( limit ) => {
	const data = await axios.get('/api/admin/testimonials', { ...axiosConfig, params: {
			limit: limit
		}});
	return data.data;
};

export const getTestimonialById = async ( id ) => {
	const data = await axios.get('/api/admin/testimonials/' + id, axiosConfig );
	return data.data;
};


// Images

export const getImages = async ( limit ) => {
	const data = await axios.get('/api/admin/images', { ...axiosConfig, params: {
			limit: limit
		}});
	return data.data;
}
