const express = require("express");
const ViteExpress = require("vite-express");
const fileUpload = require('express-fileupload');
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.static('public'));


// Upload Images

app.post('/upload', (req, res) => {
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
