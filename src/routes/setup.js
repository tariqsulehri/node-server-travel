
const auth = require('../middleware/auth');
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

router.get("/api/setups/roles", async (req, res) => {
    try {

        let query = `SELECT * FROM roles;`;
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

module.exports = router;