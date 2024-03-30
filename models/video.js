// models/video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    email:String,
    filename: String,
    format: String,
    output: String,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
