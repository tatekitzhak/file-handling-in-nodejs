var fs = require('fs');
const readFile = require('./readFileLines');
let filesContentArrayList = [];
function readFiles(dirname, onFileContent, callback) {
    
  fs.readdir(dirname, function(err, filenames) {
    if (err){
      onError(`Occuerd a error:${err}`);
      return;
    }
    
    filenames.forEach(function(filename, i) {
        const result = readFile.readFileLineByLine(dirname + filename);

        result.then(function(res){
            filesContentArrayList.push(res);
            console.log('Singel file content:', i,res);  
        }).catch((err) => {
            console.log('err:', err);
        }).finally(() => {
            console.log('Files array:', filesContentArrayList)
        });
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