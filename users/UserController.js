const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

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

router.post('/', async(req, res) => {
    let { email, password } = req.body;

    if(email == undefined || password == undefined || email == '' || password == '') {
        res.status(400);
        res.json({
            error: 'Email or password invalid'
        });
    } else {
        let salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);
        let user = await User.findOne({
            where: {
                email
            }
        });
        if(user == undefined) {
            User.create({
                email,
                password
            }).then((user) => {
                res.status(201);
                res.json(user.get({
                    plain: true
                }));
            }).catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        } else {
            res.status(409);
            res.json({
                error: 'Email already exist'
            });
        }
    }
});

module.exports = router;