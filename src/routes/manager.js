const express = require('express');
const router = express.Router();

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

module.exports = router;