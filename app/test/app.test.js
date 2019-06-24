const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Testing /tools URL', () => {
    before('Mongo Connect', (done) => {
        mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
        return done();
    });

    after('Mongo Disconnect', (done) => {
        mongoose.disconnect();
        return done();
    });

    it('Test GET /tools - Should return status response 200', (done) => {
        request(app)
            .get('/tools')
            .expect(200)
            .end((err, res) => {
                if(err) throw err;
                return done();
            });
    });

    it('Test POST /tools - Should save new tool item', (done) => {
        request(app)
            .post('/tools')
            .send({
                title: "Title",
                link: "link",
                description: "Description",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;
                return done();
            });
    });
});