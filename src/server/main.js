import express from "express";
import ViteExpress from "vite-express";
import fileUpload from "express-fileupload";
import path from "path";
import {addPage, editPage, getPageById, getPages} from "./admin/pages.js";
import {addPost, editPost, getPostById, getPosts} from "./admin/posts.js";
import {addTestimonial, getTestimonialById, getTestimonials} from "./admin/testimonials.js";

const app = express();
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/admin/health-check', function (req, res) {
    res.sendStatus(200);
});


// Pages

app.route('/api/admin/pages')
        .get(async function (req, res) {
            res.send(await getPages(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPage(req.body));
        });

app.route('/api/admin/pages/:pageId')
        .get(async function (req, res) {
            res.send(await getPageById(req.params.pageId));
        })
        .post(async function (req, res) {
            if ( String(req.params.pageId) === "0") { res.send(await addPage(req.body)) }
            else { res.send(await editPage(req.body)) }
        });


// Posts

app.route('/api/admin/posts')
        .get(async function (req, res) {
            res.send(await getPosts(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPost(req.body));
        });

app.route('/api/admin/posts/:postId')
        .get(async function (req, res) {
            res.send(await getPostById(req.params.postId));
        })
        .post(async function (req, res) {
            if ( String(req.params.postId) === "0") { res.send(await addPost(req.body)) }
            else { res.send(await editPost(req.body)) }
        });


// Testimonials

app.route('/api/admin/testimonials')
        .get(async function (req, res) {
            res.send(await getTestimonials(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addTestimonial(req.body));
        });

app.route('/api/admin/testimonials/:testimonialId')
        .get(async function (req, res) {
            res.send(await getTestimonialById(req.params.testimonialId));
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

const port = process.env.PORT || 3000;

ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on port ${port}...`)
);
