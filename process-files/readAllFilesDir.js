var fs = require('fs');
const path = require('path');
const readline = require('readline');
const readFile = require('./readFileLines');

/* -----------guide-----------
  https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
*/
async function readFileLineByLine(filePath){
    const fileStream = fs.createReadStream(filePath);
    var tempData = [];
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of rl) {
        
        tempData.push( line );
      
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
      }
      return tempData;
      
}

/* -----------guide-----------
    https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
*/
function readFilesHandle(dirname, onFileContent, occurredError) {
    let filesContentArrayList = [];
    fs.readdir(dirname, function(err, filenames) {
        if (err){
            occurredError(`The directory name is invalid: ${err}`);
            return;
        }
        let resultFileLines;
        let filesLength = filenames.length;
        filenames.forEach(function(filename, i) {
            if(path.extname(filename) == ".txt"){
                resultFileLines = readFileLineByLine(dirname + filename);

                resultFileLines.then(function(result_as_an_array ){
                    var specificFileSchemaObject = {};
                    let baseFileName = path.parse(filename).name+'$$';
                    console.log('File name:', baseFileName);
                    specificFileSchemaObject[baseFileName] = result_as_an_array;
                    filesContentArrayList.push(specificFileSchemaObject);
                    console.log('Singel file content:', i,result_as_an_array);  
                }).catch((err) => {
                    //console.log(`Catch statement error has occurred :${err}`);
                    occurredError(`Catch statement error has occurred :${err}`);
                }).finally(() => {
                    if(i==(filesLength-1)){ 
                        onFileContent(filesContentArrayList)                   
                        console.log('The final result as an array list of content each file:', filesContentArrayList)
                    }           
                });
            }
        });
    });
}



module.exports = {readFilesHandle}