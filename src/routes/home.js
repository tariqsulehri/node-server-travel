const express = require("express");
const router = express.Router(); // instead this will work.

router.post('/', async (req, res) => {
    res.send("Home Post");
});

router.get('/', async (req, res) => {
    res.send("Travel Api Server....");
});

module.exports = router;