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

function database_connection(data, cb) {

  db_connection = mysql.createConnection(db_config); //Connecting to MySQL database server

  db_connection.connect(function (err) {
    if (err) {
      return cb && cb(`The execution line of code function : database_connection() ${err}`);
    }
    return cb && cb(JSON.stringify({ message: `Successful connection!` }));

  });

  //SELECT Query
  let sql = "SELECT last_name FROM users";
  db_connection.query(sql, function (err, result, fields) {

    if (err || !result.length) {
      return cb && cb({message:`Querying Error or no results ${err}`}); //return callback('error or no results');
    }

    return cb && cb(JSON.stringify(result)); //callback

  });

  //Inserting into a database

// let sqlQuery = "INSERT INTO users SET ?";
// db_connection.query(sqlQuery, usersInfo, (err, result) => {
//     if (err)
//         console.log(`INSERT error o ${err}`);;
//     console.log(result);
//     console.log("an office added...");
// });

  db_connection.end(function (err) {

    if (err) {
      return cb && cb({message:`Error close the database connection:${err.message}`}); //return callback('error or no results');
    }
    return cb && cb(JSON.stringify({ message: `Close the database connection.`}) ); //callback
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