const app = require('./app/app');
const db = require('./app/config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc/openapi.json');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});