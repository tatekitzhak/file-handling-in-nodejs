var mysql = require('mysql');

var db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };
var db_connection;

function dbCnnection(ConnectionSuccessful, ConnectionError) {
    //Connecting to MySQL database server
    db_connection = mysql.createConnection(db_config);

    let result = db_connection.connect(function(err) {
        if (err){
            return ConnectionError && ConnectionError(`The execution line of code function : database_connection() ${err}`);
        }
        ConnectionSuccessful(`The database is connected successfully to the MySQL server`);
    });  
    return result;
}

module.exports = {dbCnnection};