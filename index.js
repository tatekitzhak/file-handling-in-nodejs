const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const directoryPath = path.join(__dirname, 'static/file.txt');

  fs.readFile(directoryPath, 'utf8', (err, data)=>{
    if(err){
      return console.log("unable to scan directory:"+err);
    }
    console.log('data:'+data)
    // files.forEach((file,index)=>{
    //   console.log('file:'+file[0])
    // })
  })
  console.log("path:",directoryPath)
  res.send('Hello Node!!')
})

app.listen(port, () => {
  console.log(`Example index.js listening at http://localhost:${port}`)
})
