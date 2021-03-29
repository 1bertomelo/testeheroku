const mongoose = require('mongoose');



module.exports.conecta = function () {
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
}