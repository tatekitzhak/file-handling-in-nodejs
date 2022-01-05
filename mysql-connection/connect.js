const mysql = require('mysql');
const host = '127.0.0.1';


const db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',
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
    
    //Inserting into a database
    let usersInfo = {
        first_name: "Ran",
        last_name: "Itzhak",
        user_type: "Software Engineer",
        username: "RanItzhak",
        email: "ran@gmail.com",
        password: "1234"
    };
    let sqlQuery = "INSERT INTO users SET ?";
    db_connection.query(sqlQuery, usersInfo, (err, result) => {
        if (err)
            console.log(`INSERT error o ${err}`);;
        console.log("Inserted result:",result);
    });

    //SELECT Querying Data in MySQL Database
    let sql = "SELECT last_name FROM users";
    db_connection.query(sql, function (err, result, fields) {
        
        if(err || !result.length){
            console.log(`error or no results ${err}`);
            //return callback('error or no results');
        }
        console.log(`The query result: ${JSON.stringify(result)}`);
        //callback(null, result);

    });
    

    db_connection.end(function(err) {

        if (err) {
        return console.log('Error close the database connection:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {database_connection};