const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access denied!, no token provided");

    try {
        const decoded = jwt.verify(token, 'nodeSecretKey');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.....");
    }

}

module.exports = auth;

