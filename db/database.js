const mysql = require("mysql2");
const env = require("dotenv").config();

const conn = mysql.createConnection({
    host : process.env.host, 
    port : process.env.port, 
    user : process.env.user, 
    password : process.env.password,
    database : process.env.database
});

module.exports = conn;