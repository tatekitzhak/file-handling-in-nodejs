const mysql = require('mysql');
const host = '127.0.0.1';


const db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',//'topics_db'
    debug: false,
  };
var db_connection;

function database_connection(successfulHadle, errorHadle) {

    //Connecting to MySQL database server
    db_connection = mysql.createConnection(db_config);

    db_connection.connect(function(err) {
        if (err){
            return errorHadle && errorHadle(`The execution line of code function : database_connection() ${err}`);
        }

        successfulHadle(`The database connection is successful to the MySQL server`);
    });  

    // Querying Data in MySQL Database
    let sql = "SELECT first_name FROM users";
    db_connection.query(sql, function (err, result, fields) {
        
        if (err) throw err;
        console.log(`The query result: ${JSON.stringify(result)}`);
    });
    
    // close all connections
    db_connection.end(function(err) {

        if (err) {
        return console.log('Error close the database connection:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {database_connection};