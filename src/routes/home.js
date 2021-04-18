const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router(); // instead this will work.

router.get('/', auth, async (req, res) => {
    res.send("Home....");
});

module.exports = router;