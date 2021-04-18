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

router.post('/api/users', async (req, res) => {

    const { username, email, password, role_id } = req.body;

    if (!username || !email || !password || !role_id) {
        INVALID_INPUT.result = req.body;
        return res.send(INVALID_INPUT);
    }

    try {
        const data = { ...req.body };

        var salt = await bcrypt.genSalt(8);
        var passwordHash = await bcrypt.hash(data.password, salt);

        var params = [data.username, passwordHash, data.password, data.email, data.role_id]

        var duplicate = await CheckDuplicate(email);

        if (duplicate) {
            return res.json(FAIL);
        }

        let query = `INSERT INTO users ( username, password, password1, email, role_id ) VALUES ( ?, ? ,?, ?, ?); `;
        var result = await database.query(query, params);
        SUCCESS.result = { username: data.username, password: passwordHash, email: data.email, role_id: data.role_id }
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
        var passwordHash = bcrypt.hashSync(data.password, 8);
        let query = `UPDATE users SET password = '${passwordHash}' , role_id = ${data.role_id}  WHERE email = '${data.email}' ;`;
        var result = await database.query(query);
        res.send(SUCCESS);
    }
    catch (error) {
        res.send(SOME_THONG_WENTWRONG);
    }

});

router.get("/api/users", async (req, res) => {
    try {

        let query = `SELECT users.id, users.username, users.email, roles.name as rolename FROM users INNER JOIN roles ON users.role_id = roles.id; `;
        var result = await database.query(query);

        if (!result[0]) {
            SUCCESS.result = null;
            return res.status(200).send(SUCCESS);
        }

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        console.log(error);
        return res.status(401).send(FAIL);
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