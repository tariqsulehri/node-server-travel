const express = require('express');
const router = express.Router();

router.post("/api/staff/approve_request", (req, res) => {
    res.status(200).send("Client Request Approval");
});

router.post("/api/staff/pending_request", (req, res) => {
    res.status(200).send("Client Request Approval");
});

router.post("/api/staff/progress", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.put("/api/staff/progress", (req, res) => {
    res.status(200).send("Return all Clients");
});

router.get("/api/staff/progress", (req, res) => {
    res.status(200).send("Return all Clients");
});

module.exports = router;