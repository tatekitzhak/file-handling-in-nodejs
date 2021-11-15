const path = require('path');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const port = 3000;

const readFile = require('./process_files/readFileLines');
const readDirFiles = require('./process_files/readDirFiles');
const readAllFilesDir = require('./process_files/readAllFilesDir');
const callback = require('./process_files/callbackTest');
const callback2 = require('./process_files/callbackTest2');

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'static/file1.txt');
  const dirPath = path.join(__dirname,'static/');

  //const result = readFile.readFileLineByLine(filePath);

//   result.then(function(res) {
//     console.log('app: ',res);
//  })
/*   readDirFiles.readFiles(dirPath);
 */
//var data = [];

function errorHandling(err) {
  // console.log('Files:', err)
  throw err;
}

function receiveContent(content) {
  
  console.log('Content:', content);
}

readAllFilesDir.readFiles(dirPath,receiveContent, errorHandling);

 res.send('Server runing...');
 
});

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
