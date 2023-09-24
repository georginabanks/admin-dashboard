import { User, knex } from "./db.js";

export async function addUser(u) {
	return await User.create({
		username: u.username,
		password: u.password,
		email: u.email,
		name: u.name,
		ImageImageId: u.ImageImageId,
		PermissionPermissionId: u.PermissionPermissionId
	});
}

// Login User

export async function Login(u) {
    const username = u.username;
    const password = u.password;
    let auth = false;
    
    // Authentication
    
    try {
        const user = await User.findOne({
			where: {username: username} });
        if (!user) { auth = false }
        
        auth = await user.authenticate(password);
    }
    
    catch(err) {return err}
    
    return auth;
}


// Get User

export async function getUser( username ) {
	return knex('users')
			.leftJoin('permissions', { 'users.PermissionPermissionId' : 'permissions.permission' })
			.leftJoin('images', { 'users.ImageImageId' : 'images.imageId' })
			.select('name', 'username', 'email', 'filename', 'alt', 'permission')
			.where('username', username );
}
