var mysql = require('mysql');

var db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };
var db_connection;


/* conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
}); */

function dbCnnection(successfulHadle, errorHadle) {
    //Connecting to MySQL database server
    db_connection = mysql.createConnection(db_config);

    db_connection.connect(function(err) {
        if (err){
            return errorHadle && errorHadle(`The execution line of code function : database_connection() ${err}`);
        }
        successfulHadle(`The database connection is successful to the MySQL server`);
    });  
    
}

module.exports = {dbCnnection};