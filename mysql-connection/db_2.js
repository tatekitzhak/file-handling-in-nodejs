const mysql = require('mysql');
const host = '127.0.0.1';


const db_config = {
    host    : host,
    user    : 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };
var db_connection;

function database_connection(successfulHadle, errorHadle) {
    
    db_connection = mysql.createConnection(db_config); //Connecting to MySQL database server

    db_connection.connect(function(err) {
      if (err){
        return errorHadle && errorHadle(`The execution line of code function : database_connection() ${err}`);
    }
      return successfulHadle && successfulHadle({1:`The database connection is successful to the MySQL server`});
       
    }); 
    return db_config;
}


function area(radius) {
  return {mult: radius*2}
}


module.exports = {
    area,
    database_connection
  }