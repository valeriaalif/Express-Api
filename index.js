

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;


// Import routes
const authRoutes = require('./controllers/AuthController');
const userRoutes = require('./controllers/userController');
const productRoutes = require('./controllers/productController');
const postsRoutes = require('./controllers/postController');
const moviesRoutes = require('./controllers/moviesController');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();
app.use(express.json());

// Use the routes
app.use('/api/auth/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/movies', moviesRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
