const express = require('express');
const router = express.Router();

var SUCCESS = { code: 1, success: true, message: "Success", result: null };
var FAIL = { code: 0, success: false, message: "Fail" };
var SOME_THONG_WENTWRONG = { code: 0, success: false, message: "Something went wrong" };
var INVALID_INPUT = { code: 0, success: false, message: "Invalid input's", result: null };

router.post("/api/manager/approve_request", (req, res) => {
    res.status(200).send("Client Request Approval");
});

router.post("/api/manager/pending_request", (req, res) => {
    res.status(200).send("Client Pending Approval");
});

router.put("/api/manager/progress", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/manager/progress", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/managers", async (req, res) => {
    try {
        //role_id = 1 --> Manager
        //role_id = 2 --> Staff
        //role_id = 3 --> Cleint

        let query = `SELECT users.id, users.username, users.email, roles.name as rolename FROM users INNER JOIN roles ON users.role_id = roles.id and users.role_id=1; `;
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