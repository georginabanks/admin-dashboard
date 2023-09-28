import axios from "axios";

export const axiosConfigGet = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
};


// Dashboard

export const getRecents = async () => {
	const data = await axios.get('/api/dashboard', axiosConfigGet );
	return data.data;
}

export const getAnalytics = async () => {
	const data = await axios.get('/api/analytics', axiosConfigGet );
	return data.data;
}


// Pages

export const getPages = async ( limit, query ) => {
	const data = await axios.get('/api/pages', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
		}});
	return data.data;
};

export const getPageById = async ( id ) => {
	const data = await axios.get('/api/pages/' + id, axiosConfigGet );
	return data.data;
};


// Posts

export const getPosts = async ( limit, query ) => {
	const data = await axios.get('/api/posts', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
		}});
	return data.data;
};

export const getPostById = async ( id ) => {
	const data = await axios.get('/api/posts/' + id, axiosConfigGet );
	return data.data;
};

export const getPostCategories = async ( filters ) => {
	const data = await axios.get('/api/posts/categories', { ...axiosConfigGet, params: {
			filters: filters
		}} );
	return data.data;
}


// Testimonials

export const getTestimonials = async ( limit, query ) => {
	const data = await axios.get('/api/testimonials', { ...axiosConfigGet, params: {
			limit: limit,
			query: query
		}});
	return data.data;
};

export const getTestimonialById = async ( id ) => {
	const data = await axios.get('/api/testimonials/' + id, axiosConfigGet );
	return data.data;
};


// Images

export const getImages = async ( limit ) => {
	const data = await axios.get('/api/images', { ...axiosConfigGet, params: {
			limit: limit
		}});
	return data.data;
}

export const getImageById = async ( id ) => {
	const data = await axios.get('/api/images/' + id, axiosConfigGet );
	return data.data;
}


// Users

export const getUsers = async ( username, query ) => {
	const data = await axios.get('/api/users', { ...axiosConfigGet, params: {
			username: username,
			query: query || ''
		}});
	return data.data
}

export const getPermissions = async () => {
	const data = await axios.get('/api/users/permissions', axiosConfigGet );
	return data.data;
}

export const avatars = [
		{ filename: 'cow.jpg', alt: 'cute watercolour cow' },
		{ filename: 'dog.jpg', alt: 'cute cartoon Beagle dog' },
		{ filename: 'elephant.jpg', alt: 'cute watercolour elephant' },
		{ filename: 'face mask cow.jpg', alt: 'cute watercolour cow wearing a face mask' },
		{ filename: 'manatee.jpg', alt: 'cute watercolour manatee' },
		{ filename: 'pig.jpg', alt: 'cute watercolour pig' },
		{ filename: 'pink cat.jpg', alt: 'cute pink watercolour cat' },
		{ filename: 'pink rabbit.jpg', alt: 'cute pink watercolour rabbit holding a carrot' },
		{ filename: 'polar bear.jpg', alt: 'cute watercolour polar bear' },
		{ filename: 'rabbit.jpg', alt: 'cute watercolour rabbit' }
];