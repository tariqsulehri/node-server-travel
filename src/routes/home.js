const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router(); // instead this will work.
const SendMail = require('../helpers/mail.notifications');

router.get('/', auth, async (req, res) => {
    try {

        res.status(200).send("OK");

    } catch (error) {
        console.log(error);
        res.status(401).send("Error")
    }
});


module.exports = router;