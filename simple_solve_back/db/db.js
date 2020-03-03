const mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost:3306",
    user: "root",
    password: "123456",
    database:"easy_understand"
 })

connection.connect();
 
module.exports = connection;