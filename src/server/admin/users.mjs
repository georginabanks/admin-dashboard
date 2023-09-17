import { User, sequelize, knex } from "./db.mjs";

export async function addUser(u) {
	return await User.create({
		username: u.username,
		password: u.password,
		email: u.email
	});
}

// Login User

export async function Login(u) {
    const username = u.username;
    const password = u.password;
    let auth = false;
    
    // Authentication
    
    try {
        const user = await User.findOne({ where: {username: username} });
        if (!user) { auth = false }
        
        auth = await user.authenticate(password);
    }
    
    catch(err) {return err}
    
    return auth;
}