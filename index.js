const path = require('path');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const port = 3000;

const readFile = require('./process_files/readFileLines');
const readDirFiles = require('./process_files/readDirFiles');

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'static/file1.txt');
  const dirPath = path.join(__dirname,'static/');

  //const result = readFile.readFileLineByLine(filePath);

//   result.then(function(res) {
//     console.log('app: ',res);
//  })
  readDirFiles.readFiles(dirPath);


  res.send('Server runing...')
  console.log("path:")
});

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
