import { User, knex } from "./db.js";
import bcrypt from 'bcrypt';
import ck from "ckey";

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
    let auth = false;
    
    // Authentication
    
    try {
        const user = await User.findOne({
			where: { username: u.username } });
        if (!user) { auth = false }
        
        auth = await user.authenticate(u.password);
    }
    
    catch(err) {return err}
    
    return auth;
}


// Get User

export async function getUsers( username, query ) {
	if ( username && username.length > 0 ) {
		return knex('users')
				.leftJoin('permissions', {'users.PermissionPermissionId': 'permissions.permissionId'})
				.leftJoin('images', {'users.ImageImageId': 'images.imageId'})
				.select('userId', 'name', 'username', 'email', 'ImageImageId',
						'imageId', 'filename', 'alt', 'permission', 'permissionId')
				.where('username', username);
	} else {
		return knex('users')
				.leftJoin('permissions', {'users.PermissionPermissionId': 'permissions.permissionId'})
				.leftJoin('images', {'users.ImageImageId': 'images.imageId'})
				.orWhereILike('username', `%${query}%`)
				.orWhereILike('name', `%${query}%`)
				.orWhereILike('email', `%${query}%`)
				.orWhereILike('permission', `%${query}%`)
				.select('userId', 'name', 'username', 'email', 'filename', 'alt', 'permission', 'permissionId');
	}
}


// Update User

export async function editUser( edits ) {
	delete edits.expires;
	const u = edits;
	
	let hashData = 1;
	if ( u.password ) {
		const salt = await bcrypt.genSalt(Number(ck.SALT_FACTOR));
		
		await bcrypt.hash( u.password, salt).then( async hash => {
			u['password'] = hash;
		}).catch( err => {
			console.log(err);
			hashData = 0;
			delete u.password;
		});
	}
	
	const data = await knex('users')
			.leftJoin('permissions', {'users.PermissionPermissionId': 'permissions.permissionId'})
			.leftJoin('images', {'users.ImageImageId': 'images.imageId'})
			.where({ userId: u.userId })
			.update( u );
	
	if ( data > 0 && hashData > 0 ) {
		const rtn = await getUsers( u.username );
		return rtn[0];
	}
	else { return 'error ' + data }
}


// Delete User

export async function deleteUser( username ) {
	const data = await knex('users')
			.where({ username: username })
			.del();
	
	if (data > 0) { return 'deleted' }
	else { return 'error ' + data }
}


// Get Permissions

export function getPermissions() {
	return knex('permissions')
			.select('*');
}