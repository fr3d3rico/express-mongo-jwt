const app = require('./app/app');
const db = require('./app/config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});