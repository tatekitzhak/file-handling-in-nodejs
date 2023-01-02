'use strict'; // eslint-disable-line strict

const path = require('path');
const fs = require('fs');
const express = require('express'),
    logger = require('morgan');
const app = express();

const port = process.env.PORT || 9000;
const jsonFilePath = path.join(__dirname, 'static/output.json');

const readAllFilesDir = require('./process-files/readAllFilesDir');
app.use(logger('combined'));

app.get('/read_all_files', function (req, res) {
  const dirPath = path.join(__dirname, 'static/test_topics/');

  function errorHandling(err) {
    console.log('Reading directory error:\n', err)

  }

  function receiveContent(content) {
    // console.log('Content:', content);
    var jsonObj = JSON.stringify(content);

    fs.writeFile(jsonFilePath, jsonObj, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log(`Write a JSON file has been saved at :${jsonFilePath}`);
    });
  }

  readAllFilesDir.readFilesHandle(dirPath, receiveContent, errorHandling);
  console.log('receiveContent():',jsonFilePath)
  res.send(`http://localhost:${port} ...`);

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

app.get('/read-file-from-aws-s3', function(req, res) {

  res.status(200).json({'message':req.route.path})
  
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error :${err}`);
  }
  console.log(`Node Endpoints working at: http://localhost:${port}`)
});
