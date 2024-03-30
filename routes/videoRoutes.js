const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoController = require('../controllers/videoController');

const storage = multer.diskStorage({
    destination: 'video/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/convert', upload.single('video'), videoController.convertVideo);

module.exports = router;