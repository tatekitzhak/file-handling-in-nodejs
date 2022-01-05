const mysql = require('mysql');
const host = '127.0.0.1';


const db_config = {
  host: host,
  user: 'ran',
  password: 'ran',
  database: 'db1',
  debug: false,
};
var db;

function database_connection(data, cb) {

  db = mysql.createConnection(db_config); //Connecting to MySQL database server

  db.connect(function (err) {
    if (err) {
      return cb && cb(`The execution line of code function : database_connection() ${err}`);
    }
    return cb && cb(JSON.stringify({ message: `Successful connection!` }));

  });

  //SELECT Query
  let sql = "SELECT last_name FROM users";
  db.query(sql, function (err, result, fields) {

    if (err || !result.length) {
      return cb && cb(JSON.stringify({ message: `Querying Error or no results ${err}` })); //return callback('error or no results');
    }
    console.log("Query:", data);
    //return cb && cb(JSON.stringify(result)); //callback

  });

  db.end(function (err) {

    if (err) {
      return cb && cb({ message: `Error close the database connection:${err.message}` }); //return callback('error or no results');
    }
    return cb && cb(JSON.stringify({ message: `Close the database connection.` })); //callback
  });

  return db_config;
}

/**
 * 
 *  Inserting into a database
 */

function insertQuery(data,cb) {
  db = mysql.createConnection(db_config); //Connecting to MySQL database server

  db.connect(function (err) {
    if (err) {
      return cb && cb(`The execution line of code function: insertQuery() ${err}`);
    }
    return cb && cb(JSON.stringify({ message: `Successful connection!` }));

  });

  let usersInfo = {
    first_name: "Ran",
    last_name: "Itzhak",
    user_type: "Software Engineer",
    username: "RanItzhak",
    email: "ran@gmail.com",
    password: "********"
  };
  let sqlQuery = "INSERT INTO users SET ?";

  db.query(sqlQuery, usersInfo, (err, result) => {
    if (err){
      return cb && cb(`INSERT error: ${err}`);
    }
    
    return cb && cb("record inserted:",result);
  });
  console.log("data:",data)
  db.end(function (err) {

    if (err) {
      return cb && cb({ message: `Error close the database connection:${err.message}` }); //return callback('error or no results');
    }
    return cb && cb(JSON.stringify({ message: `Close the database connection.` })); //callback
  });
};


module.exports = {
  insertQuery,
  database_connection
}