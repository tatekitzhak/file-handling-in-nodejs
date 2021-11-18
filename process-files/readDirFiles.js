const fs = require('fs');
const readFileLine = require('./readFileLines');

function readFiles(dirPath) {
    fs.readdir(dirPath,function(err,files){

        if(err){
            console.log('An unexpected error occurred:',err);
        }else{
            console.log('A file names:')
            files.forEach(function(file){
                // const result = readFile.readFileLineByLine(filePath);
                console.log(file)
            });
        }

    });
};

module.exports = {readFiles}


/* 
    result.then(function(res){
        console.log('app: ',res);
    });
*/
                     
