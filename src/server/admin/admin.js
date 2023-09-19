import express from 'express';
import {addPage, deletePage, editPage, getPageById, getPages} from "./pages.js";
import {addPost, addPostCategory, deletePost, editPost, getPostById, getPosts} from "./posts.js";
import {
    addTestimonial,
    deleteTestimonial,
    editTestimonial,
    getTestimonialById,
    getTestimonials
} from "./testimonials.js";
import path from "path";

export const router = express.Router();


router.get('/health-check', function (req, res) {
    res.sendStatus(200);
});


// Dashboard

router.get('/dashboard', async function (req, res) {
            res.send({
                pages: await getPages(5),
                posts: await getPosts(5),
                testimonials: await getTestimonials(5)
            });
        });


// Pages

router.route('/pages')
        .get(async function (req, res) {
            res.send(await getPages(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPage(req.body));
        });

router.route('/pages/:pageId')
        .get(async function (req, res) {
            res.send(await getPageById(req.params.pageId));
        })
        .post(async function (req, res) {
            if ( String(req.params.pageId) === "0") { res.send(await addPage(req.body)) }
            else { res.send(await editPage(req.body)) }
        })
        .delete(async function (req, res) {
            res.send(await deletePage(req.params.pageId));
        });


// Posts

router.route('/posts')
        .get(async function (req, res) {
            res.send(await getPosts(req.query.limit));
        })
        .post(async function (req, res) {
            res.send(await addPost(req.body));
        });

router.route('/posts/categories')
        .post(async function (req, res) {
            res.send(await addPostCategory(req.body));
        });

router.route('/posts/:postId')
        .get(async function (req, res) {
            res.send(await getPostById(req.params.postId));
        })
        .post(async function (req, res) {
            if ( String(req.params.postId) === "0") { res.send(await addPost(req.body)) }
            else { res.send(await editPost(req.body)) }
        })
        .delete(async function (req, res) {
            res.send(await deletePost(req.params.postId));
        });


// Testimonials

router.route('/testimonials')
        .get(async function (req, res) {
            res.send(await getTestimonials(req.query.limit));
        });

router.route('/testimonials/:testimonialId')
        .get(async function (req, res) {
            res.send(await getTestimonialById(req.params.testimonialId));
        })
        .post(async function (req, res) {
            if ( String(req.params.testimonialId) === "0") { res.send(await addTestimonial(req.body)) }
            else { res.send(await editTestimonial(req.body)) }
        })
        .delete(async function (req, res) {
            res.send(await deleteTestimonial(req.params.testimonialId));
        });


// Images

router.route('/images')
        .post(async function (req, res) {
            // Get the file that was set to our field named "image"
            const { image } = req.files;
        
            // If no image submitted, exit
            if (!image) return res.sendStatus(400);
        
            // Move the uploaded image to our upload folder
            image.mv(path.join(__dirname, '..', '..', 'public', 'uploads', image.name));
        
            res.sendStatus(200);
        });
