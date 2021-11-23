var mysql = require('mysql');

var db_config = {
    host    : '127.0.0.1',
    user    : 'ran',
    password: 'ran',
    database: 'db1',
    debug: false,
  };
var db_connection;

/* function dbCnnection(ConnectionSuccessful, ConnectionError) { */
    //Connecting to MySQL database server
    db_connection = mysql.createConnection(db_config);

    db_connection.connect(function(err) {
        if (err){
            console.log(`error or no results ${err}`);
            //return ConnectionError && ConnectionError(`The execution line of code function : database_connection() ${err}`);
        }
       // ConnectionSuccessful(`The database is connected successfully to the MySQL server`);
    });  
    
    //SELECT Querying Data in MySQL Database
    let sql = "SELECT first_name FROM users";
    db_connection.query(sql, function (err, result, fields) {
        
        if(err || !result.length){
            console.log(`error or no results ${err}`);
            //return callback('error or no results');
        }
       // console.log(`The query result: ${JSON.stringify(result)}`);
        //callback(null, result);

    });
    function solution(a) {
        // write your code in JavaScript (Node.js 8.9.4)
        console.log(`A array ${a}`);

        let temp1 = a[0];
        let temp2 = a[a.length-1];
        let temp3;
        let leng = a.length;

        for(let i=0; i<leng; i++){
            a[i] = temp2;
            temp2 = a[i+1];
            a[i+1] = temp1;

            console.log(`A array ${a}`);
        }
        return;
    }

    solution( [1,2,3,4,5] );
/* } */

module.exports = db_connection;