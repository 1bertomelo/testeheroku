//importando o pacote express
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/alunoRota');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


require('dotenv').config({
    path: process.env.NODE_ENV === "test" ?
        "./src/config/.env.testing"
        : "./src/config/.env"
});

console.log(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//PORT variavel usada heroku
module.exports = app.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});

