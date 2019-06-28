const {SECRET_KEY} = require('./config.js');

module.exports = (req, res, next) => {
    console.log('verifyJWT');

    var token = req.headers['x-access-token'];
    //var token = req.cookie('x-access-token');
    console.log(req.headers['x-access-token']);

    if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        req.userId = decoded.id;
        next();
    });
};