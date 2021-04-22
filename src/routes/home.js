const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router(); // instead this will work.
const SendMail = require('../helpers/mail.notifications');

router.get('/', auth, async (req, res) => {
    try {

        var result = await SendMail();
        res.send(result);

    } catch (error) {
        console.log(error);
        res.status(401).send("Error")
    }
});

module.exports = router;