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

function executeSQLStatement(table, cb) {
    db = mysql.createConnection(db_config); //Connecting to database

    db.connect(function (err) {
        if (err) {
            return cb && cb(`not open a connection to MYSQL Server: ${err}`);
        }
        return cb && cb(JSON.stringify({ message: `Successful connection!` }));

    });

    let query_subtopics = `SELECT * FROM ${table};`;
    return new Promise(async (resolve, reject) => {

        try {
            const result = await db.query(query_subtopics, function (error, results, fields) {

                if (error || !results.length)
                    return cb && cb(null,JSON.stringify({ message: `error or no results:${error}` }));
                resolve(results);
            });
            // console.log('Promise:',results )
            // resolve(result);
        } catch (error) {
            reject(`Promise reject: ${error}`);
        } finally {
            if (db) {
                try {
                    await db.end();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
}

async function fetchQuery(data, cb) {

    executeSQLStatement('topics').then(function (result_rows) {
        // now you have your rows, you can see if there are <20 of them
       
         
         // since result is array of objects [{word: 'someword'},{word: 'someword2'}] let's remap it
        //  result_rows = result_rows.map(function name(obj) {
        //     console.log('fetchQuery:',obj)
        //  });
         // result should now look like ['someword','someword2']
         // return it
         return cb && cb(null, result_rows);
         
    }).catch(function (err) {
        console.log('fetchQuery catch:',err)
    }); // Throw async to escape the promise chain

}

module.exports = { fetchQuery };