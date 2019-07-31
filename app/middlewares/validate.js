module.exports = (req, res, next) => {

    // console.log('middleware');

    // return res.status(400).send({msg: 'No.'});

    next();

};