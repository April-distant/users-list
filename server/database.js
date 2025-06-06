const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "userslist",
    password: ""
});

module.exports = connection.promise()
