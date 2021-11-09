const path = require('path');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const directoryPath = path.join(__dirname, 'static/file1.txt');

  function readFile(file) {
    fs.readFile(directoryPath,'utf8', function(err, data){
      if(err){
        console.log('An occured error', err);
      }
      console.log('data: ',data);
    });
  };
  readFile(directoryPath);
res.send('Server runing...')
console.log("path:",directoryPath)
  
})

app.listen(port, () => {
  console.log(`The source file index.js listening at: http://localhost:${port}`)
})
