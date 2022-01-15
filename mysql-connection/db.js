var mysql = require('mysql');

var db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };
var db;


function db_connection(data, cb) {
    try{
        return new Promise(function(resolve, reject) {
            // The Promise constructor should catch any errors thrown on
            // this tick. Alternately, try/catch and reject(err) on catch.
            //Connecting to MySQL db 
        db = mysql.createConnection(db_config); 
        db.connect(function (err) {
            if (err) {
              return reject(`The execution line of code function : database_connection() ${err}`);
            }
            return resolve(JSON.stringify({ message: `Successful connection!` }));
        
          });

          db.end(function (err) {
  
            if (err) {
              return reject({ message: `Error close the db connection:${err.message}` }); //return callback('error or no results');
            }
            return resolve(JSON.stringify({ message: `Close the db connection.` })); //callback
          });
           
        });

    } catch(error) {
        console.log(error)
      }
  }
    

module.exports = {db_connection};