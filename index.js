const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 8000;

const jsonFilePath = path.join(__dirname, 'static/output.json');

const readAllFilesDir = require('./process-files/readAllFilesDir');
const database = require('./mysql-connection/connect');
const db = require('./mysql-connection/db');

app.get('/', function (req, res) {
  const dirPath = path.join(__dirname, 'static/test_topics/');

  function errorHandling(err) {
    console.log('Reading directory issues:', err)

  }

  function receiveContent(content) {
    console.log('Content:', content);
    var jsonObj = JSON.stringify(content);

    fs.writeFile(jsonFilePath, jsonObj, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log(`Write a JSON file and has been saved at :${jsonFilePath}`);
    });
  }

  readAllFilesDir.readFilesHandle(dirPath, receiveContent, errorHandling);
  console.log('receiveContent():',jsonFilePath)
  res.send('http://localhost:8000 ...');

});


/*  
  MySQL db
*/
app.get("/mysql_database", function (req, res) {

  database.database_connection(function (successfulData) {

    console.log(`Database Connection: ${successfulData}`)
  }, function (err) {
    console.log(`Error Establishing a Database Connection: ${err}`)
  });

  res.json({ message: "MySQL Database..." });
});


const db_2 = require('./mysql-connection/db_2');

app.get('/db_2', function (req, res) {

  db_2.database_connection(null, function (ms) {
    console.log(`Database Connection message: ${ms}`)
  });

  res.json(db_2.database_connection());
});

/* *************
* read a JSON file
* https://heynode.com/tutorial/readwrite-json-files-nodejs/
*/

const jsonReaderHandle = require('./process-files/readJSONFile');

app.get('/json_file_reader', function (req, res) {
  jsonReaderHandle.jsonReader(jsonFilePath, function (err, data) {
    if (err) {
      console.log('Error Handling:', err)
      return;
    }

    let recive_data = db_2.insertQuery(data, function (ms) {
      console.log(`Insert Query message: ${ms}`)
    });

   /*  
   data.forEach(function (obj, index) {

      for (const fileName in obj) {
        console.log(`----------${index}-----------`)
        for (let i = 0; i < obj[fileName].length; i++){
          const str = obj[fileName][i]; 
          console.log(`Row in file [${fileName}] : ${str}`);
        }
      }
      
    }); // => "Infinity Loop Drive" 
    */
  });

  res.send(req.route.path);
});

const sq = require('./mysql-connection/select_query');

app.get('/retrieve_data_from_tables', function(req, res) {

 let result = sq.fetchQuery('abc',function (err,ms) {
       console.log(`DB result: ${JSON.stringify(ms)}`)
    })



    res.send({1:123}); // 

  
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error :${err}`);
  }
  console.log(`Node Endpoints working at: http://localhost:${port}`)
});
