const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const database = require('../startup/dbconfig');

const router = express.Router(); // instead this will work.

var SUCCESS = { code: 1, success: true, message: "Success", result: null };
var FAIL = { code: 0, success: false, message: "Fail" };
var SOME_THONG_WENTWRONG = { code: 0, success: false, message: "Something went wrong" };

var LOGIN = { code: 1, success: true, message: "Success", result: null, token: null };
var LOGIN_FAIL = { code: 0, success: false, message: "Invalid Username or Password", result: null, token: null };

var INVALID_INPUT = { code: 0, success: false, message: "Invalid input's", result: null };

router.post('/api/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        LOGIN_FAIL.result = req.body;
        return res.send(LOGIN_FAIL);
    }

    try {

        const data = { ...req.body };
        var params = [data.password, data.email]

        var userQuery = `SELECT users.id, password1, users.email FROM users  WHERE email = '${email}';`;
        var result = await database.query(userQuery);

        var isValidPassword = bcrypt.compareSync(password, result[0].password);

        if (!isValidPassword) {
            return res.send(LOGIN_FAIL);
        }

        let query = `SELECT users.id, users.username, users.email, roles.name as rolename FROM users INNER JOIN roles ON users.role_id = roles.id  WHERE email = '${email}' AND password='${password}';`;

        var result = await database.query(query, params);

        if (!result[0]) {
            return res.send(LOGIN_FAIL);
        }

        var token = jwt.sign({ id: result[0].id }, "nodeSecretKey");
        LOGIN.token = token;
        LOGIN.result = result[0];

        return res.send(LOGIN);

    }
    catch (error) {
        return res.send(SOME_THONG_WENTWRONG);
    }

});


router.post('/api/users', async (req, res) => {

    const { username, email, password, role_id } = req.body;

    if (!username || !email || !password || !role_id) {
        INVALID_INPUT.result = req.body;
        return res.send(INVALID_INPUT);
    }

    try {
        const data = { ...req.body };

        var passwordHash = bcrypt.hashSync(data.password, 8);

        var params = [data.username, passwordHash, data.password, data.email, data.role_id]

        var duplicate = await CheckDuplicate(email);

        if (duplicate) {
            return res.json(FAIL);
        }

        let query = `INSERT INTO users ( username, password, password1, email, role_id ) VALUES ( ?, ? ,?, ?, ?); `;
        var result = await database.query(query, params);
        res.send(SUCCESS);

    }
    catch (error) {
        res.send(SOME_THONG_WENTWRONG);
    }

});

router.put('/api/users', async (req, res) => {

    const { username, email, password, role_id } = req.body;

    if (!username || !email || !password || !role_id) {
        INVALID_INPUT.result = req.body;
        return res.send(INVALID_INPUT);
    }

    try {
        const data = { ...req.body };
        let query = `UPDATE users SET password = '${data.password}' , role_id = ${data.role_id}  WHERE email = '${data.email}' ;`;
        var result = await database.query(query);
        res.send(SUCCESS);
    }
    catch (error) {
        res.send(SOME_THONG_WENTWRONG);
    }

});

const CheckDuplicate = async (email) => {

    var duplicate = false;

    let query = `SELECT email FROM users WHERE email = ? ;`;
    var result = await database.query(query, [email]);

    if (result[0]) {
        duplicate = true;
    }

    return duplicate;
}

module.exports = router;