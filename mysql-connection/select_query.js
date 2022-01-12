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

function executeSQLStatement(table_name, column, db) {
    /* db = mysql.createConnection(db_config); //Connecting to database

    db.connect(function (err) {
        if (err) {
            return cb && cb(`Not open a connection to MYSQL Server: ${err}`);
        }
        return cb && cb(JSON.stringify({ message: `Successful connection!` }));

    });
 */
    let query_from_table = `SELECT ${column} FROM ${table_name};`;
    return new Promise(async (resolve, reject) => {

        try {
            const result = await db.query(query_from_table, function (error, results, fields) {
                
                if (error || !results.length)
                    reject(JSON.stringify({ message: `error or no results: ${error}` }));
                resolve(results);
            });

        } catch (error) {
            reject(`Promise reject: ${error}`);
        } finally {
            /* if (db) {
                try {
                    await db.end((error) => {
                        if (error) {
                            console.error('error during disconnection', error.stack)
                            reject(`error during disconnection ${error.stack}`)
                        }
                        //console.log('db has disconnected')
                        resolve('db has disconnected')
                    });
                } catch (error) {
                    reject(error);
                }
            } */
        }
    });
}

async function fetchQuery(data, cb) {
    try {
        db = await mysql.createConnection(db_config); //Connecting to database

        await db.connect(function (err) {
            if (err) {
                return cb && cb(`Not open a connection to MYSQL Server: ${err}`);
            }
            return cb && cb(JSON.stringify({ message: `Successful connection!` }));

        });

        /* 
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
                console.log('fetchQuery catch:', err)
            }); // Throw async to escape the promise chain
             */
        try {
            const topics_table = await executeSQLStatement('topics', 'topic', db);
            const subtopics_table = await executeSQLStatement('subtopics', 'subtopic', db);
            const content_table = await executeSQLStatement('transcript_content', 'content', db);
            console.log('db:', db.config)

            const promises = [topics_table, subtopics_table, content_table];
             const result =  Promise.all(promises).then((values) => {
                //console.log('Promise:', values)
                return cb && cb(null, values);
            });
            // you can do something with the result
            // console.log('Promise all 1 : ',result)
            //return result;

        } catch (error) {
            return cb && cb(null,`fetchQuery catch error: ${error}`);
        } finally {
            if (db) {
                try {
                    await db.end((error) => {
                        if (error) {
                            console.error('error during disconnection', error.stack)
                            return cb && cb(null, `error during disconnection ${error.stack}`)
                        }
                        //console.log('db has disconnected')
                        return cb && cb(null, 'db has disconnected')
                    });
                } catch (error) {
                    return cb && cb(null, error);
                }
            }
        }
    } catch (err) {
        console.log(`Erro mysql.createConnection: ${err}`);
        //return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    } 

}

module.exports = { fetchQuery };