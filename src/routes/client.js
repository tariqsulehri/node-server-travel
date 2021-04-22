const express = require('express');
const router = express.Router();

var SUCCESS = { code: 1, success: true, message: "Success", result: null };
var FAIL = { code: 0, success: false, message: "Fail" };
var SOME_THONG_WENTWRONG = { code: 0, success: false, message: "Something went wrong" };
var INVALID_INPUT = { code: 0, success: false, message: "Invalid input's", result: null };

router.post("/api/client/create_request", async (req, res) => {
    const { datetime, client_user_id, loc_attu, loc_long, request_status } = req.body;

    if (!datetime || !client_user_id || !loc_attu || !loc_long) {
        INVALID_INPUT.result = req.body;
        return res.send(INVALID_INPUT);
    }

    try {
        const data = { ...req.body };

        console.log(date);

        request_status = "SENT";

        var params = [
            datetime,
            client_user_id,
            city,
            country,
            loc_attu,
            loc_long,
            request_status
        ];

        let query = `INSERT INTO  cleint_requests ( datetime, 
                                                    client_user_id, 
                                                    city, 
                                                    country, 
                                                    loc_attu,
                                                    loc_long,
                                                    request_status,
                                        ) VALUES ( ?, ?, ?, ?, ?, ?, ? ); `;

        var result = await database.query(query, params);

        SUCCESS.message = "Request Sucessfully Submitted..."
        SUCCESS.result = { username: data.username, password: passwordHash, email: data.email, role_id: data.role_id }
        res.send(SUCCESS);

    }
    catch (error) {
        res.send(SOME_THONG_WENTWRONG);
    }
});

router.post("/api/client/update_request", (req, res) => {
    res.status(200).send("Post Client Request");
});

router.get("/api/client/requests/:client_id", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/client/requests_approved/:client_id", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/client/requests_rejected/:client_id", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/client/:request_id/:id", (req, res) => {
    res.status(200).send("Return all Clients");
});

module.exports = router;