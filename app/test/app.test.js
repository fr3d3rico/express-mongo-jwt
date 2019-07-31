const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../app');

describe('Testing /register and /login URL', () => {
    const agent = request.agent(app);

    before('Mongo Connect', (done) => {
        mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {useNewUrlParser: true}, () => {
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
            .expect('Content-Type', /json/)
            .expect((res) => {
                assert.equal(res.body.user.name, "Fred");
                assert.equal(res.body.user.email, "fred@fred.com");
            })
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
            .expect('Content-Type', /json/)
            .expect((res) => {
                assert.equal(res.body.user.name, "Fred 2");
                assert.equal(res.body.user.email, "fred2@fred.com");
            })
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
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        assert.equal(res.body.user.name, "Fred 2");
                        assert.equal(res.body.user.email, "fred2@fred.com");
                    })
                    .end((err, res) => {
                        if(err) throw err;

                        return done();
                    });
                //console.log(res.body);
                // let accessToken = res.cookie('access_token');
                // console.log(res.cookie('access_token'));
                // const access_token = res.body.access_token;
            });
    });

    it('Test POST /login - Try login with wrong user', (done) => {
        request(app)
            .post('/login')
            .send({
                email: "xxxxxxxxxx@x.com",
                password: "yyyyyyyyy",
            })
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect((res) => {
                assert.equal(res.body.msg, "User not found!");
            })
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test POST /login - Save new user and try login with wrong password. Should return status response 401', (done) => {
        request(app)
            .post('/register')
            .send({
                name: "Vivian 2",
                email: "vivian2@fred.com",
                password: "123456",
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                assert.equal(res.body.user.name, "Vivian 2");
                assert.equal(res.body.user.email, "vivian2@fred.com");
            })
            .end((err, res) => {
                if(err) throw err;

                request(app)
                    .post('/login')
                    .send({
                        email: "vivian2@fred.com",
                        password: "1234567",
                    })
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        assert.equal(res.body.msg, "Password not valid!");
                    })
                    .end((err, res) => {
                        if(err) throw err;

                        return done();
                    });
            });
    });

    it('Test GET /register - Should return status response 404', (done) => {
        request(app)
            .get('/register')
            .expect(404)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });

    it('Test GET /login - Should return status response 404', (done) => {
        request(app)
            .get('/login')
            .expect(404)
            .end((err, res) => {
                if(err) throw err;

                return done();
            });
    });
    
});