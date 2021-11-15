var fs = require('fs');
const path = require('path');
const readFile = require('./readFileLines');

let filesContentArrayList = [];
function readFiles(dirname, onFileContent, callback) {
    
  fs.readdir(dirname, function(err, filenames) {
    if (err){
      onError(`Occuerd a error:${err}`);
      return;
    }
    let resultFileLines;
    
    filenames.forEach(function(filename, i) {
        
        if(path.extname(filename) == ".txt"){
            resultFileLines = readFile.readFileLineByLine(dirname + filename);
            resultFileLines.then(function(resArray){
                filesContentArrayList.push(resArray);
                console.log('Singel file content:', i,resArray);  
            }).catch((err) => {
                console.log('err:', err);
            }).finally(() => {
                console.log('Files array:', filesContentArrayList)
            });
        }

        
       /*  
        console.log('File name:', i, filename);
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
            onError(`Occuerd a error:${err}`);
            return;
        }
        console.log('File Content:',i, content);
        }); 
        */
    });
    callback(filesContentArrayList)
  });
  
}

/*  Here's the storing part: 
*/

/* var data = {};
readFiles('dirname/', function(filename, content) {
  data[filename] = content;
}, function(err) {
  console.log('Throw error:',err)
}); */

module.exports = {readFiles}