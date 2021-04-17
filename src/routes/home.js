const express = require("express");
const router = express.Router(); // instead this will work.

router.post('/', async (req, res) => {
    res.send("Home");
});

router.get('/', async (req, res) => {
    res.send("Home");
});

module.exports = router;