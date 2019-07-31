const jwt = require('jsonwebtoken');
const { cryptor } = require('../config/config');

module.exports = (req, res, next) => {

    var token = req.headers[process.env.HEADER_TOKEN_NAME];

    if(!token) return res.status(401).send({auth: false, msg: 'No token provided.'});

    jwt.verify(cryptor.decode(token), process.env.SECRET_KEY, (err, decoded) => {
        if(token && err) return res.status(403).send({auth: false, msg: 'Forbidden.'});
        if(err) return res.status(500).send({auth: false, msg: 'Failed to authenticate token.'});

        req.userId = decoded.id;
        next();
    });
};