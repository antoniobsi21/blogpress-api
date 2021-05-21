const { Sequelize } = require('sequelize');
require('dotenv/config');

const user = process.env.DATABASEUSER;
const password = process.env.DATABASEPASSWORD;


const connection = new Sequelize('blogpress', user, password, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
