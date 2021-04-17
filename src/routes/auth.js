const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/api/users/auth', async (req, res) => {

    const { email, password } = req.body;

    console.log('api called', email, password);

    if (!email || !password) {
        return res.json({
            sucess: "FAIL_TO_LOGIN",
            message: "Please enter user name and Password."
        });
    }


    if (!user) {
        return res.json({
            sucess: "EMAIL_NOT_REGISTERED",
            message: "Please and register and login.."
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
        return res.status(400).send("Invalid email or password.. ");
    }


    // //login email and password is matches and then we will send jwt to user.
    const token = generateAuthToken(password);
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

generateAuthToken = function (password) {
    //const token = jwt.sign({ _id: this._id }, 'node_secureJwtKey');
    const token = jwt.sign({ password: password }, 'node_secureJwtKey');
    console.log(token);
    return token;
}


module.exports = router;