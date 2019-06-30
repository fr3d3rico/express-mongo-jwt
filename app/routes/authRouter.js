const router = require('express').Router();
const UserSchema = require('../model/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { SECRET_KEY, LIFE_TIME_TOKEN } = require('../config/config');

router.post('/register', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    var newUser = new UserSchema({name: name, email: email, password: password});

    UserSchema.find({email: email}, null, { skip: 0 }, (err, docs) => {
        if(err) return res.status(500).send('Server error!(find): ' + err);

        if(docs.length > 0) return res.status(200).send('User already exist!');
        
        newUser.save((err, user) => {
            if(err) return res.status(500).send('Server error!(save): ' + err);

            const expiresIn = LIFE_TIME_TOKEN;
            const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {
                expiresIn: expiresIn
            });
            
            const userData = {
                name: user.name,
                email: user.email
            }

            res.status(201).send({'user': userData, 'access_token': accessToken, 'expires_in': expiresIn});
        });
    });

});

router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    UserSchema.findOne({email: email}, (err, doc) => {
        if(err) return res.status(500).send('Server error!(find): ' + err);
        if(!doc) return res.status(404).send('User not found!');
        
        const result = bcrypt.compareSync(password, doc.password);

        if(!result) return res.status(401).send('Password not valid!');

        const expiresIn = LIFE_TIME_TOKEN;
        const accessToken = jwt.sign({id: doc.id}, SECRET_KEY, {
            expiresIn: expiresIn
        });

        const userData = {
            name: doc.name,
            email: doc.email
        }

        res.status(200).cookie('access_token', accessToken).send({'user': userData, 'access_token': accessToken, 'expires_in': expiresIn});
    });
});

module.exports = router;