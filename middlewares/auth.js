const jwt = require('jsonwebtoken');

require('dotenv/config');
const secret = process.env.SECRET;

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if(authToken == undefined) {
        res.status(401);
        res.json({
            error: 'Autorização necessária'
        });
    } else {
        const bearer = authToken.split(' ');
        let token = bearer[1];

        jwt.verify(token, secret, (err, data) => {
            if(err) {
                res.status(401);
                res.json({
                    error: 'Token inválido'
                });
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    }
    
}

module.exports = auth;