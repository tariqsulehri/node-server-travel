const express = require('express');
const router = express.Router();

router.post("/api/client/create_request", (req, res) => {
    res.status(200).send("Post Client Request");
});

router.post("/api/client/update_request", (req, res) => {
    res.status(200).send("Post Client Request");
});

router.get("/api/client/requests", (req, res) => {
    res.status(200).send("Return all Clients");
});

module.exports = router;