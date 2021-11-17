const mysql = require('mysql');
const host = '127.0.0.1';


let config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'dbTest2',//'topics_db'
    debug: false,
  };

  // Creating connection

function database_connection() {
    let db_connection = mysql.createConnection(config);
    db_connection.connect(function(err) {
        if (err) {
          return console.log("Error establishing a database connection:", err);
        }
      
        console.log('The database connection is successful to the MySQL server.');
    });
    
}


module.exports = {database_connection};