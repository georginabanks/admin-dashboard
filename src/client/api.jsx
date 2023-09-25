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

export const getPages = async ( limit, query ) => {
	const data = await axios.get('/api/admin/pages', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
		}});
	return data.data;
};

export const getPageById = async ( id ) => {
	const data = await axios.get('/api/admin/pages/' + id, axiosConfigGet );
	return data.data;
};


// Posts

export const getPosts = async ( limit, query ) => {
	const data = await axios.get('/api/admin/posts', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
		}});
	return data.data;
};

export const getPostById = async ( id ) => {
	const data = await axios.get('/api/admin/posts/' + id, axiosConfigGet );
	return data.data;
};

export const getPostCategories = async ( filters ) => {
	const data = await axios.get('/api/admin/posts/categories', { ...axiosConfigGet, params: {
			filters: filters
		}} );
	return data.data;
}


// Testimonials

export const getTestimonials = async ( limit, query ) => {
	const data = await axios.get('/api/admin/testimonials', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
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

export const getImageById = async ( id ) => {
	const data = await axios.get('/api/admin/images/' + id, axiosConfigGet );
	return data.data;
}


// Users

export const getUsers = async ( username, query ) => {
	const data = await axios.get('/api/admin/users', { ...axiosConfigGet, params: {
			username: username,
			query: query || ''
		}});
	return data.data
}

export const getPermissions = async () => {
	const data = await axios.get('/api/admin/users/permissions', axiosConfigGet );
	return data.data;
}
