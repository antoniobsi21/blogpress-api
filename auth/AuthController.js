const express = require('express');
const router = express.Router();
const User = require('../users/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv/config');
const secret = process.env.SECRET;

router.post('/token', async (req, res) => {
    if(req.body == undefined) {
        res.status(400).json({
            error: "Please provide a JSON body with the fields 'email' and 'passowrd'"
        });
    }
    let { email, password } = req.body;

    if(email == undefined || password == undefined) {
        res.status(400);
        res.json({
            error: 'Email/password invalid'
        });
    } else {
        let user = await User.findOne({ where: { email }});
        if(user == undefined) {
            res.status(404);
            res.json({
                error: 'Invalid email'
            });
        } else if(!bcrypt.compareSync(password, user.password)) {
            res.status(401);
            res.json({
                error: 'Wrong password'
            });
        } else {
            jwt.sign({
                id: user.id,
                email: user.email
            }, secret, {
                expiresIn: '2h'
            }, (err, token) => {
                if(err) {
                    res.status(400);
                    res.json({
                        error: 'Internal error'
                    });
                }
                res.status(200);
                res.json({ token });
            });
        }
    }
})

module.exports = router;