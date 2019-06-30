const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    var token = req.headers[process.env.HEADER_TOKEN_NAME];

    if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        req.userId = decoded.id;
        next();
    });
};