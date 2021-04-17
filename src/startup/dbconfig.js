const mysql = require("mysql");
const util = require('util');

let db_con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'travel-db'
});

// Connect to MySQL server
db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
    }
});

db_con.query = util.promisify(db_con.query)
module.exports = db_con;