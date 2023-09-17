import express from "express";
import ViteExpress from "vite-express";
import fileUpload from "express-fileupload";
import path from "path";
import {addPage, getPages} from "./admin/pages.js";
import {addPost, getPosts} from "./admin/posts.js";
import {addTestimonial, getTestimonials} from "./admin/testimonials.js";

const app = express();
app.use(fileUpload());
app.use(express.static('public'));


// Pages

app.route('/api/admin/pages')
        .get(async function (req, res) {
            res.send(await getPages(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPage(req.body));
        });


// Posts

app.route('/api/admin/posts')
        .get(async function (req, res) {
            res.send(await getPosts(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPost(req.body));
        });


// Testimonials

app.route('/api/admin/testimonials')
        .get(async function (req, res) {
            res.send(await getTestimonials(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addTestimonial(req.body));
        });


// Images

app.route('/api/admin/images')
        .post(async function (req, res) {
            // Get the file that was set to our field named "image"
            const { image } = req.files;
        
            // If no image submitted, exit
            if (!image) return res.sendStatus(400);
        
            // Move the uploaded image to our upload folder
            image.mv(path.join(__dirname, '..', '..', 'public', 'uploads', image.name));
        
            res.sendStatus(200);
        });


// Server

const port = process.env.PORT || 3000

ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on port ${port}...`)
);
