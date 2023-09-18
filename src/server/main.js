import express from "express";
import ViteExpress from "vite-express";
import fileUpload from "express-fileupload";
import { router } from './admin/admin.js';

const app = express();
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/admin', router);


// Server

const port = process.env.PORT || 3000;

ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on port ${port}...`)
);
