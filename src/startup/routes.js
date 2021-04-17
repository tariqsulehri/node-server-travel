const express = require('express');
const cors = require('cors');
const home = require('../routes/home');
const users = require('../routes/users');
const auth = require('../routes/auth');

const whitelist = [
    'http://localhost:3200',
    'http://localhost:3000',
    'http://localhost:3200/users',
    'http://localhost:3200/users/auth',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true)
            //callback('Not allowed')
            // callback(new Error('Not allowed by CORS'))
        }
    }, credentials: true
}

module.exports = function (app) {
    app.use(cors(corsOptions));
    app.use(express.json());
    //app.use(express.urlencoded({ extended: true })); //to avoid body-parser depricated
    app.use('/', home);
    app.use('/', users);
    app.use('/', auth);
}

