import ck from 'ckey';
import { Sequelize, DataTypes } from "sequelize";
import useBcrypt from "sequelize-bcrypt";
import Knex from "knex";

const host = ck.DB_HOST;
const username = ck.DB_USERNAME;
const password = ck.DB_PASSWORD;
const database = ck.DB_DATABASE;
const port = ck.DB_PORT;


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

export const Page = sequelize.define('Page', {
	pageId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: { type: DataTypes.TEXT },
	content: { type: DataTypes.TEXT('medium') },
	datePublished: { type: DataTypes.DATE },
	slug: { type: DataTypes.TEXT },
	featuredImage: {
		type: DataTypes.INTEGER,
		references: {
			model: Image,
			key: 'imageId'
		}
	}
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
	slug: { type: DataTypes.TEXT },
	featuredImage: {
		type: DataTypes.INTEGER,
		references: {
			model: Image,
			key: 'imageId'
		}
	}
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
	username: {
		type: DataTypes.TEXT,
		unique: true
	},
	password: { type: DataTypes.TEXT },
	email: { type: DataTypes.TEXT },
	name: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'users' });

useBcrypt(User, {
	field: 'password', // secret field to hash, default: 'password'
	rounds: ck.SALT_FACTOR, // used to generate bcrypt salt, default: 12
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

Testimonial.belongsTo(Page);
Page.hasMany(Testimonial);

User.belongsTo(Image);
Image.hasMany(User);

User.belongsTo(Permission);
Permission.hasMany(User);


// Create Tables

sequelize.sync().then(() => {
   console.log('Tables created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});


// Avatars

// const avatars = await Image.bulkCreate([
// 		{ filename: 'cow.jpg', alt: 'cute watercolour cow' },
// 		{ filename: 'dog.jpg', alt: 'cute cartoon Beagle dog' },
// 		{ filename: 'elephant.jpg', alt: 'cute watercolour elephant' },
// 		{ filename: 'face mask cow.jpg', alt: 'cute watercolour cow wearing a face mask' },
// 		{ filename: 'manatee.jpg', alt: 'cute watercolour manatee' },
// 		{ filename: 'pig.jpg', alt: 'cute watercolour pig' },
// 		{ filename: 'pink cat.jpg', alt: 'cute pink watercolour cat' },
// 		{ filename: 'pink rabbit.jpg', alt: 'cute pink watercolour rabbit holding a carrot' },
// 		{ filename: 'polar bear.jpg', alt: 'cute watercolour polar bear' },
// 		{ filename: 'rabbit.jpg', alt: 'cute watercolour rabbit' }
// ]);