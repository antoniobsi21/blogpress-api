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
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.status(400);
        res.json({
            error: 'Invalid id'
        });
    } else {
        let user = await User.findOne({
            where: {
                id
            }
        });
        if(user == undefined) {
            res.status(404);
            res.json({
                error: `User with id ${id} doesn't exist.`
            });
        } else {
            res.status(200);
            res.json(user);
        }
    }
});

module.exports = router;