const path = require('path');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const port = 3000;

const readFile = require('./process_files/readFileLineByLine');
const readDirFiles = require('./process_files/read_dir_files');

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'static/file3.txt');
  const dirPath = path.join(__dirname,'static/');

  //readFile.readFileLineByLine(filePath);
  readDirFiles.readFiles(dirPath);


  res.send('Server runing...')
  console.log("path:")
});

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
