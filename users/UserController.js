const express = require('express');
const router = express.Router();
const User = require('./User');

const getAllUsers = async() => {
    return await User.findAll();
};

router.get('/', async (req, res) => {
    try{
        let users = await User.findAll();

        res.json(users);
    } catch(error) {
        res.json({error});
    }
})

module.exports = router;