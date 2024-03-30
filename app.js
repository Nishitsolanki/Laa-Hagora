// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const multer = require('multer');
const hbjs = require('handbrake-js');
const videoRoutes = require('./routes/videoRoutes');
const {MONGODB_URI} = require('./config/constants')

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: 'video/',
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage: storage});

// Routes
app.use('/api', videoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
