const mysql = require('mysql');
const host = '127.0.0.1';


var db_config = {
  host: host,
  user: 'ran',
  password: 'ran',
  database: 'db_test1',
  debug: false,
};
var db;

function database_connection(data, cb) {
  //Connecting to MySQL db 
  db = mysql.createConnection(db_config); 

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
      return cb && cb({ message: `Error close the db connection:${err.message}` }); //return callback('error or no results');
    }
    return cb && cb(JSON.stringify({ message: `Close the db connection.` })); //callback
  });

  return db_config;
}

/**
 * 
 *  Inserting into a database
 */

function insertQuery(data, cb) {
  
  
  db = mysql.createConnection(db_config); //Connecting to MySQL db

  db.connect(function (err) {
    if (err) {
      return cb && cb(`The execution line of code function: insertQuery() ${err}`);
    }
    return cb && cb(JSON.stringify({ message: `Successful connection!` }));

  });

  data.forEach(function (obj, index) {
    console.log('insertQuery: ',index, obj)
    for (const fileName in obj) {
      let topicInfo = { topic: fileName };
      let sqlQuery = "INSERT INTO topics SET ?";
      // Inserting into topics table
  
      db.query(sqlQuery, topicInfo, (err, result) => {
        if (err) {
          return cb && cb(`INSERT error: ${err}`);
        }

        return cb && cb("record inserted:", result);
      });

      // Inserting into subtopics table
      for (let i = 0; i < obj[fileName].length; i++) {
        let str = obj[fileName][i];
        let subtopicInfo = { subtopic: str, topic_id: index+1 };
        let sqlQuery = "INSERT INTO subtopics SET ?";

        db.query(sqlQuery, subtopicInfo, (err, result) => {
          if (err) {
            return cb && cb(`INSERT error: ${err}`);
          }

          return cb && cb("record inserted:", result);
        });

      }
    }

  }); // => "Infinity Loop Drive"


  db.end(function (err) {

    if (err) {
      return cb && cb({ message: `Error close the db connection:${err.message}` }); //return callback('error or no results');
    }
    return cb && cb(JSON.stringify({ message: `Close the db connection.` })); //callback
  });
  
};

/**
 * 
 *  SELECT QUERY
 */

function fetchQuery(data, cb) {
  db = mysql.createConnection(db_config); //Connecting to database

  db.connect(function (err) {
    if (err) {
      return cb && cb(`not open a connection to MYSQL Server: ${err}`);
    }
    return cb && cb(JSON.stringify({ message: `Successful connection!` }));

  });
  /* 
    let sql_s_subtopics = "SELECT * FROM subtopics;";
  
    db.query(sql_s_subtopics, function (err, result, fields) {
  
      if (err || !result.length) {
        return cb && cb(`error or no results ${err}`);
      }
      //console.log(`The query result: ${JSON.stringify(result)}`);
      cb(JSON.stringify({ message: `The query result: ${JSON.stringify(result)}` })); //callback
  
    });
     */
  function queryPromise1() {
    let sql_s_subtopics = "SELECT * FROM subtopics;";
    return new Promise((resolve, reject) => {
      db.query(sql_s_subtopics, (error, results) => {
        if (error) {
          return reject(`error or no results ${error}`);
        }
        return resolve(results);
      });

      db.end();
    });
  };

  async function sequentialQueries() {
    const promise1 = queryPromise1();
    const promises = [promise1, promise2, promise3];
    try {
      const result = await Promise.all(promises);
      // you can do something with the result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  database_connection,
  insertQuery,
  fetchQuery
};