const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const readAllFilesDir = require('./process-files/readAllFilesDir');
const jsonReaderHandle = require('./process-files/readJSONFile');
const database = require('./mysql-connection/connect');
const db = require('./mysql-connection/db');
const dirJsonFile = path.join(__dirname,'static/output.json');

app.get('/', function(req, res){
  const dirPath = path.join(__dirname,'static/topics/');
  
  function errorHandling(err) {
    console.log('Reading directory issues:', err)
    
  }

  function receiveContent(content) {
    console.log('Content:', content);
    var jsonObj = JSON.stringify(content);
    
    fs.writeFile(dirJsonFile, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
  
      console.log(`Write a JSON file and has been saved at :${dirJsonFile}`);
    });
  }

  readAllFilesDir.readFilesHandle(dirPath,receiveContent, errorHandling);
  
  res.send('http://localhost:3000 ...');
 
});


app.get('/json_reader', function(req, res){
  jsonReaderHandle.jsonReader(dirJsonFile, function(content){
    
      content.forEach(function(obj ,index){
        
        for (const nameFile in obj) {
          console.log(`----------${index}-----------`)
          for(let i=0; i < obj[nameFile].length; i++)
            console.log(`Content ${index} : [${nameFile}] = ${obj[nameFile][i]}`);
        }
      });
  },function(err){
    console.log('Error Handling:', err)
  });

  res.send(req.route.path);
});
/*  
  MySQL Database
*/ 
app.get("/mysql_database", function(req, res){
  
  database.database_connection(function(successfulData){
    
    console.log(`Database Connection: ${successfulData}`)
  }, function(err){
    console.log(`Error Establishing a Database Connection: ${err}`)
  });

  res.json({ message: "MySQL Database..." });
});

app.get('/db',function(req, res) {
  db.dbCnnection(function(successfulData){
    
    console.log(`DB Connection: ${successfulData}`)
  }, function(err){
    console.log(`Error Establishing a DB Connection: ${err}`)
  });
  
  res.json({ message: "MySQL DB is connection..." });
});


app.listen(port, function(err){
  if (err) {
		throw err;
	}
  console.log(`Node Endpoints working at: http://localhost:${port}`)
});
