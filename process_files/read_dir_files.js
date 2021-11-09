const fs = require('fs');

function readFiles(dirPath) {
    fs.readdir(dirPath,function(err,files){

        if(err){
            console.log('An unexpected error occurred:',err);
        }else{
            console.log('A file names:')
            files.forEach(function(file,index){
                console.log(file)
            });
        }

    });
};

module.exports = {readFiles}
