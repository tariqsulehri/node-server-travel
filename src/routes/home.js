const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router(); // instead this will work.

router.post('/api/home', auth, async (req, res) => {
    res.send("Home Post");
});

router.get('/api/home', auth, async (req, res) => {
    res.send("Travel Api Server....");
});

module.exports = router;