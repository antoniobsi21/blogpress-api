const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

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

router.patch('/:id', async (req, res) => {
    // Maybe it would be viable to use multiple promises.
    // While one promise check the email, other promise will check if the id is valid or something.
    // Promises.all([promise1, promise2, ...promisen]).then((resolves[]) => resolves).catch(errors[] => errors);
    let id = req.params.id;

    if(id == '' || isNaN(id)) {
        res.status(400);
        res.json({
            error: 'Invalid id'
        });
    } else {
        let { email, password } = req.body;
        if(email == undefined && password == undefined) {
            res.status(400);
            res.json({
                error: 'You need to provide either email or password'
            });
        } else {
            
            let user = await User.findOne({ where: {id} });

            if(user == undefined) {
                res.status(404);
                res.json({
                    error: `User with id ${id} not found`
                });
            } else {                    
                let userByEmail = undefined;

                if(email != undefined && email != '') {
                    user.email = email;
                    userByEmail = await User.findOne({ where: {email}});
                }

                if(userByEmail == undefined){ 
                    user.password = (password != undefined && password != '') ? bcrypt.hashSync(password, bcrypt.genSaltSync()) : user.password;
                
                    user.save();
                    res.json({
                        user
                    });   
                } else {
                    res.status(409);
                    res.json({
                        error: 'The provided email is already in use'
                    });
                }                           
            }
        }
    }
});

module.exports = router;