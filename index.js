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
  /* 
  readAllFilesDir.readFiles(dirPath,function(filename, content) {
    var data = [];
    data.push(content);
    console.log('content:',data)
  }, function(err) {
    console.log('Throw error:', err)

  });
 */
callback.callbackFunc();
  res.send('Server runing...')
  console.log("result:")
});

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
