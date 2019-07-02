const app = require('./app/app');
const db = require('./app/config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc/swagger.json');

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(SERVER_PORT, ()=>{
    console.log(`Server running at http://${SERVER_HOST}:${SERVER_PORT}`);
});