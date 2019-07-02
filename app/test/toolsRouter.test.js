const request = require('supertest');
const mongooseTool = require('mongoose');
const app = require('../app');

describe('Testing /tools URL', () => {

    before('Mongo Connect', (done) => {
        mongooseTool.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {useNewUrlParser: true}, () => {
            //reset db
            mongooseTool.connection.db.collection('users').deleteMany({}, (err, result) => {
                if (err) throw new Error(err);
                mongooseTool.connection.db.collection('tools').deleteMany({}, (err, result) => {
                    if (err) throw new Error(err);
                    return done();
                });
            });
        });
        
    });

    after('Mongo Disconnect', (done) => {
        mongooseTool.disconnect();

        return done();
    });

    it('Test GET /tools WITHOUT token - Should return status response 401 unauthorized', (done) => {
        request(app)
            .get('/tools')
            .expect(401)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test GET /tools with token - Should return status response 200', (done) => {
        const name = "Fred 3";
        const email = "fred3@fred.com";
        const password = "123";

        request(app)
            .post('/register')
            .send({
                name: name,
                email: email,
                password: password,
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                request(app)
                    .post('/login')
                    .send({
                        email: email,
                        password: password,
                    })
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw err;

                        const access_token = res.body.access_token;

                        request(app)
                            .get('/tools')
                            .set('x-access-token', access_token)
                            .expect(200)
                            .end((err, res) => {
                                if(err) throw err;
                
                                return done();
                            });
                    });
            });

        
    });

    it('Test GET /tools?tag=node WITHOUT token - Should return http status 401 unauthorized', (done) => {
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
            .expect(401)
            .end((err, res) => {
                if(err) throw err;
                return done();
            });
    });

    it('Test GET /tools?tag=node With token - Should return Tool items tagged with specific tag', (done) => {
        const tag = "node";

        const name = "Fred 4";
        const email = "fred4@fred.com";
        const password = "123";
        
        //register new user
        request(app)
            .post('/register')
            .send({
                name: name,
                email: email,
                password: password,
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                //Login
                request(app)
                    .post('/login')
                    .send({
                        email: email,
                        password: password,
                    })
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw err;

                        const access_token = res.body.access_token;

                        //Save a tool
                        request(app)
                            .post('/tools')
                            .set('x-access-token', access_token)
                            .send({
                                title: "Title 1",
                                link: "link 1",
                                description: "Description 1",
                                tags: [tag, "mongoose", "mongodb"]
                            })
                            .set('Content-Type', 'application/json')
                            .expect(201)
                            .end((err, res) => {
                                if(err) throw err;

                                //Find that tool
                                request(app)
                                .get(`/tools?tag=${tag}`)
                                .set('x-access-token', access_token)
                                .expect(200)
                                .end((err, res) => {
                                    if(err) throw err;

                                    return done();
                                });
                            });
                    });
            });

        
    });

    it('Test POST /tools WITHOUT token- Should return http status 401 unauthorized', (done) => {
        request(app)
            .post('/tools')
            .send({
                title: "Title 2",
                link: "link 2",
                description: "Description 2",
            })
            .set('Content-Type', 'application/json')
            .expect(401)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test POST /tools with token - Should save new tool item', (done) => {
        
        const name = "Fred 5";
        const email = "fred5@fred.com";
        const password = "123";
        
        //register new user
        request(app)
            .post('/register')
            .send({
                name: name,
                email: email,
                password: password,
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                //Login
                request(app)
                    .post('/login')
                    .send({
                        email: email,
                        password: password,
                    })
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw err;

                        const access_token = res.body.access_token;

                        request(app)
                            .post('/tools')
                            .send({
                                title: "Title 2",
                                link: "link 2",
                                description: "Description 2",
                            })
                            .set('x-access-token', access_token)
                            .set('Content-Type', 'application/json')
                            .expect(201)
                            .end((err, res) => {
                                if(err) throw err;

                                return done();
                        });
                });
        });
    });

    it('Test DELETE /tools/:id WITHOUT token - SShould return http status 401 unauthorized', (done) => {
        request(app)
            .delete('/tools/1')
            .expect(401)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test DELETE /tools/:id with token - Should remove tool item', (done) => {
        const name = "Fred 6";
        const email = "fred6@fred.com";
        const password = "123";
        
        //register new user
        request(app)
            .post('/register')
            .send({
                name: name,
                email: email,
                password: password,
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if(err) throw err;

                //Login
                request(app)
                    .post('/login')
                    .send({
                        email: email,
                        password: password,
                    })
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw err;

                        const access_token = res.body.access_token;

                        request(app)
                            .get('/tools')
                            .set('x-access-token', access_token)
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
                                            .set('x-access-token', access_token)
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

    it('Test GET /tools WITH token HEADERS but no data - Should return status response 401', (done) => {
        request(app)
            .get('/tools')
            .set('x-access-token', '')
            .expect(401)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test GET /tools WITH OLD token HEADERS - Should return status response 403', (done) => {
        request(app)
            .get('/tools')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjE5Mjk5MDAsImV4cCI6MTU2MTkzMDA4MH0.pMwUwHL1MuFPluY3IlWsFc0wB02S5ibvOuV_Ptw6ASk')
            .expect(403)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });
});