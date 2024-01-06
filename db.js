const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser', 
    password: 'mypassword',
    database: 'bankingDatabase'
});


module.exports = pool.promise();
