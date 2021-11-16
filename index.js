const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const readDirFiles = require('./process_files/readDirFiles');
const readAllFilesDir = require('./process_files/readAllFilesDir');
const callback = require('./process_files/callbackTest');
const callback2 = require('./process_files/callbackTest2');
const jsonReaderHandle = require('./process_files/readJSONFile');

app.get('/', function(req, res){
  const dirPath = path.join(__dirname,'static/topics/');
  const dirJsonFile = path.join(__dirname,'static/output.json');

  
 function errorHandling(err) {
    // console.log('Files:', err)
    throw err;
  }

  function receiveContent(content) {
    console.log('Content:', content);
    var jsonObj = JSON.stringify(content);
    
    fs.writeFile(dirJsonFile, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
  
      console.log("JSON file has been saved.");
    });
  }

  readAllFilesDir.readFilesHandle(dirPath,receiveContent, errorHandling);

  jsonReaderHandle.jsonReader(dirJsonFile, function(content){
    console.log('Content1:', content);
    var jsonObj = JSON.stringify(content);
    console.log('Content2:', jsonObj);
    res.send(content);
  });
  
 
});

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
