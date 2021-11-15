var fs = require('fs');
const path = require('path');
const readFile = require('./readFileLines');
/* -----------guide-----------
    https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
*/
let filesContentArrayList = [];
function readFiles(dirname, onFileContent, occurredError) {
    
  fs.readdir(dirname, function(err, filenames) {
    if (err){
        occurredError(`Error has occurred :${err}`);
      return;
    }
    let resultFileLines;
    console.log('length:',filenames.length)
    filenames.forEach(function(filename, i) {
        
        if(path.extname(filename) == ".txt"){
            resultFileLines = readFile.readFileLineByLine(dirname + filename);
            resultFileLines.then(function(result_as_an_array ){
                //filesContentArrayList.push(resArray);
                var element = {};
              
                element = result_as_an_array;
                filesContentArrayList.push({element});
                console.log('Singel file content:', i,result_as_an_array);  
            }).catch((err) => {
                console.log(`Catch statement error has occurred :${err}`);
            }).finally(() => {
                if(i==2){ 
                    onFileContent(filesContentArrayList)                   
                    console.log('The final result as an array list of content each file:', filesContentArrayList)
                }            
        });
        }
    });
  });
}



module.exports = {readFiles}