const cryptorjs = require('cryptorjs');
var cryptor = new cryptorjs(process.env.CRYPTOR_SECRET);

const LIFE_TIME_TOKEN = 180;
const SECRET_KEY = process.env.SECRET_KEY; //dotenv

module.exports = {
    LIFE_TIME_TOKEN,
    SECRET_KEY,
    cryptor
}