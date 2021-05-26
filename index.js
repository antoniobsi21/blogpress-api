const express = require('express');
const app = express();
const connection = require('./database/database');
const authMiddleware = require('./middlewares/auth');

// Connect to database
connection
    .authenticate()
    .then(() => {
        console.log('Database connected');
        // Create tables
        require('./categories/Category');
        require('./articles/Article');
        require('./users/User');
    }).catch(error => {
        console.log('Database error', error);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth controller
const authController = require('./auth/AuthController');
app.use('/auth', authController);

// Users controller
const usersController = require('./users/UserController');
app.use('/users', authMiddleware, usersController);

// Categories controller
const categoriesController = require('./categories/CategoriesController');
app.use('/categories', authMiddleware, categoriesController);

// Articles controller
const articlesController = require('./articles/ArticlesController');
app.use('/articles', authMiddleware, articlesController);

require('dotenv/config');
const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log('Server running');
});