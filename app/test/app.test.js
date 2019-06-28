const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Testing /tools URL', () => {
    before('Mongo Connect', (done) => {
        mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}, () => {
            //reset db
            mongoose.connection.db.collection('users').deleteMany({}, (err, result) => {
                if (err) throw new Error(err);
                mongoose.connection.db.collection('tools').deleteMany({}, (err, result) => {
                    if (err) throw new Error(err);
                    return done();
                });
            });
        });
        
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

    it('Test GET /tools?tag=node - Should return Tool items tagged with specific tag', (done) => {
        const tag = "node";
        
        //Save a tool
        request(app)
            .post('/tools')
            .send({
                title: "Title 1",
                link: "link 1",
                description: "Description 1",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                //Find that tool
                request(app)
                .get(`/tools?tag=${tag}`)
                .expect(200)
                .end((err, res) => {
                    if(err) throw err;

                    return done();
                });
            });
    });

    it('Test POST /tools - Should save new tool item', (done) => {
        request(app)
            .post('/tools')
            .send({
                title: "Title 2",
                link: "link 2",
                description: "Description 2",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test DELETE /tools/:id - Should remove tool item', (done) => {
        request(app)
            .get('/tools')
            .expect(200)
            .end((err, res) => {
                if(err) throw err;

                var data = res.body;

                // console.log(res.body);
                // data.forEach(element => {
                //     console.log(element);
                // });

                if( data ) {
                        request(app)
                            .delete(`/tools/${data[0]._id}`)
                            .expect(200)
                            .end((err, res) => {
                                if(err) throw err;

                                return done();
                            });
                }
                else {
                    throw err;
                }
            });
        
        
    });

    it('Test DELETE /tools - Try url without parameter. Should return error 404', (done) => {
        request(app)
            .delete('/tools')
            .expect(404)
            .end((err, res) => {
                if(err) throw err;
                return done();
            });
    });

    it('Test POST /register - Should return status response 201', (done) => {
        request(app)
            .post('/register')
            .send({
                name: "Fred",
                email: "fred@fred.com",
                password: "123",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                //console.log(res.body);

                return done();
            });
    });

    it('Test POST /login - Save new user and try login with it. Should return status response 200', (done) => {
        request(app)
            .post('/register')
            .send({
                name: "Fred 2",
                email: "fred2@fred.com",
                password: "123",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                request(app)
                    .post('/login')
                    .send({
                        email: "fred2@fred.com",
                        password: "123",
                    })
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw err;

                        return done();
                    });
                //console.log(res.body);
                // let accessToken = res.cookie('access_token');
                // console.log(res.cookie('access_token'));
            });
    });
});