const express = require("express");
const ViteExpress = require("vite-express");
const fileUpload = require('express-fileupload');
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(path.join(__dirname, '..', '..', 'public', 'uploads', image.name));

    res.sendStatus(200);
});

ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
);
