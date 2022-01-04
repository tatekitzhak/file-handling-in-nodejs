const mysql = require('mysql');
const host = '127.0.0.1';


const db_config = {
  host: host,
  user: 'ran',
  password: 'ran',
  database: 'db1',
  debug: false,
};
var db_connection;

function database_connection(successfulHadle, errorHadle) {

  db_connection = mysql.createConnection(db_config); //Connecting to MySQL database server

  db_connection.connect(function (err) {
    if (err) {
      return errorHadle && errorHadle(`The execution line of code function : database_connection() ${err}`);
    }
    return successfulHadle && successfulHadle(JSON.stringify({ 1: `The database connection is successful to the MySQL server` }));

  });

  //SELECT Querying Data in MySQL Database
  let sql = "SELECT last_name FROM users";
  db_connection.query(sql, function (err, result, fields) {

    if (err || !result.length) {
      return errorHadle && errorHadle({message:`Querying Error or no results ${err}`}); //return callback('error or no results');
    }

    return successfulHadle && successfulHadle(JSON.stringify(result)); //callback

  });

  db_connection.end(function (err) {

    if (err) {
      return errorHadle && errorHadle({message:`Error close the database connection:${err.message}`}); //return callback('error or no results');
    }
    return successfulHadle && successfulHadle({ message: `Close the database connection.`}); //callback
  });

  return db_config;
}


function area(radius) {
  return { mult: radius * 2 }
}


module.exports = {
  area,
  database_connection
}