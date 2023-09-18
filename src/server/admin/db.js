import { Sequelize, DataTypes } from "sequelize";
import useBcrypt from "sequelize-bcrypt";
import Knex from "knex";

const host = process.env.host;
const username = process.env.username;
const password = process.env.password;
const database = process.env.database;
const port = process.env.port;


// Connect DB

export const dbConnection = {
	host : host,
	port : port,
	user: username,
	password: password,
	database: database
}

export const knex = Knex({
	client: 'mysql2',
	connection: dbConnection,
	pool: {
		afterCreate(connection, done) {
			connection.query('SET time_zone = "+00:00";', (err) => {
				done(err, connection);
			})
		}
	}
});

export const sequelize = new Sequelize(
	database,
	username,
	password,
	{
		host: host,
		port: port,
		dialect: 'mysql',
		logging: false
	}
);

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((error) => {
	console.error('Unable to connect to the database: ', error);
});


// Create Models

export const Page = sequelize.define('Page', {
	pageId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: { type: DataTypes.TEXT },
	content: { type: DataTypes.TEXT('medium') },
	datePublished: { type: DataTypes.DATE },
	slug: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'pages' });

export const Post = sequelize.define('Post', {
	postId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: { type: DataTypes.TEXT },
	content: { type: DataTypes.TEXT('medium') },
	datePublished: { type: DataTypes.DATE },
	slug: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'posts' });

export const PostCategory = sequelize.define('PostCategory', {
	postCategoryId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	postCategory: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'postCategories' });

export const Status = sequelize.define('Status', {
	statusId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	statusType: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'statuses' });

export const Image = sequelize.define('Image', {
	imageId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	filename: { type: DataTypes.TEXT },
	alt: { type: DataTypes.TEXT },
	dateUploaded: { type: DataTypes.DATE }
}, { timestamps: false, tableName: 'images' })

export const Testimonial = sequelize.define('Testimonial', {
	testimonialId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	testimonialContent: { type: DataTypes.TEXT('medium') },
	testimonialAuthor: { type: DataTypes.TEXT },
	testimonialBio: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'testimonials' });

export const User = sequelize.define('User', {
	userId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: { type: DataTypes.TEXT },
	password: { type: DataTypes.TEXT },
	email: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'users' });

useBcrypt(User, {
	field: 'password', // secret field to hash, default: 'password'
	rounds: 12, // used to generate bcrypt salt, default: 12
	compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
});

export const Permission = sequelize.define('Permission', {
	permissionId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	permission: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'permissions' });


// Associations

Page.belongsTo(Status);
Status.hasOne(Page);

Page.belongsTo(User);
User.hasMany(Page);

Post.belongsTo(Status);
Status.hasOne(Post);

Post.belongsTo(User);
User.hasMany(Post);

Post.belongsTo(PostCategory);
PostCategory.hasMany(Post);

Image.belongsTo(Page);
Page.hasMany(Image);

Image.belongsTo(Post);
Post.hasMany(Image);

Testimonial.belongsTo(Page);
Page.hasMany(Testimonial);

User.belongsTo(Permission);
Permission.hasOne(User);


// Create Tables

sequelize.sync().then(() => {
   console.log('Tables created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});