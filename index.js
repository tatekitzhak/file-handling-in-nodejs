'use strict'; // eslint-disable-line strict

const path = require('path'),
  fs = require('fs'),
  express = require('express');
const app = express();

const port = process.env.PORT || 9000;

var readableResources = path.join(__dirname, 'static/test_topics/'),
  newWritableJSONFile = path.join(__dirname, 'static/output.json');

const readAllFilesDir = require('./process-files/readAllFilesDir');

app.get('/read_all_files', function (req, res, next) {

  function errorHandling(err) {
    console.log('Reading directory error:\n', err)
    next(err)
  }

  function getContentOfArrayAndWriteFile(content) {
    // console.log('Content:', content);
    // newObject = JSON.stringify(content);

    fs.writeFile(newWritableJSONFile, JSON.stringify(content), 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File:\n", err);
        return;
      }

      // console.log(`Writable a JSON file complete, has been saved at:${newWritableJSONFile}`);
    });

    res.status(200).json(content);
  }

  readAllFilesDir.readFilesHandle(readableResources, getContentOfArrayAndWriteFile, errorHandling);

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

app.get('/read-file-from-aws-s3', function (req, res) {

  res.status(200).json({ 'message': req.route.path })

});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error :${err}`);
  }
  console.log(`Node Endpoints working at: http://localhost:${port}`)
});
