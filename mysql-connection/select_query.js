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

function executeSQLStatement(table_name, column, cb) {
    db = mysql.createConnection(db_config); //Connecting to database

    db.connect(function (err) {
        if (err) {
            return cb && cb(`Not open a connection to MYSQL Server: ${err}`);
        }
        return cb && cb(JSON.stringify({ message: `Successful connection!` }));

    });

    let query_subtopics = `SELECT ${column} FROM ${table_name};`;
    return new Promise(async (resolve, reject) => {

        try {
            const result = await db.query(query_subtopics, function (error, results, fields) {

                if (error || !results.length)
                    reject(JSON.stringify({ message: `error or no results: ${error}` }));
                resolve(results);
            });
            // console.log('Promise:',results )
            // resolve(result);
        } catch (error) {
            reject(`Promise reject: ${error}`);
        } finally {
            if (db) {
                try {
                    await db.end((error) => {
                        if (error) {
                            console.error('error during disconnection', error.stack)
                            reject(`error during disconnection ${error.stack}`)
                        }
                        console.log('db has disconnected')
                        resolve('db has disconnected')
                    });
                } catch (error) {
                    reject(error);
                }
            }
        }
    });
}

async function fetchQuery(data, cb) {
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
    const topics_table = await executeSQLStatement('topics','topic');
    const subtopics_table = await executeSQLStatement('subtopics','subtopic');
    const content_table = await executeSQLStatement('transcript_content','content');

    const promises = [topics_table, subtopics_table, content_table];
    try {
        const result = await Promise.all(promises).then((values) => {
            console.log('Promise1:', values)
            // return cb && cb(null, values);
            try {
                
            } catch (error) {
                
            } finally {
               /*  if (db) {
                    try {
                        await db.end((error) => {
                            if (error) {
                                console.error('error during disconnection', error.stack)
                            }
                            console.log('db has disconnected')
                        });
                    } catch (error) {
                        console.error('Error during db.end() :', error)
                    }
                } */
            }
        });
        // you can do something with the result
        //console.log('Promise:',result)

    } catch (error) {
        return cb && cb(null, `fetchQuery catch: ${error}`);
    }

}

module.exports = { fetchQuery };