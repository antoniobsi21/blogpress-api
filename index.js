const express = require('express');
const app = express();
const connection = require('./database/database');

require('dotenv/config');
const port = process.env.PORT;
const host = process.env.HOST;

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

// Auth
const authController = require('./auth/AuthController');
app.use('/auth', authController);

// Users
// TODO Token authorization
const usersController = require('./users/UserController');
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.send('Bem vindo');
})

app.listen(port, host, () => {
    console.log('Server running');
});