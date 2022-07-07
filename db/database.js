const mysql = require("mysql2");
const db_config  = require('../config/dbConfig.json');

const conn = mysql.createConnection({
    host : db_config.host, 
    port : db_config.port, 
    user : db_config.user, 
    password : db_config.password,
    database : db_config.database
});

module.exports = conn;