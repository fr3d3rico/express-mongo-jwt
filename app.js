const express = require('express');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});