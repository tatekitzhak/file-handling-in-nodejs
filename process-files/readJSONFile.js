const fs = require('fs');

function jsonReader(filePath, cb){

    fs.readFile(filePath, 'utf8', function(err, fileData){
        if (err){
            console.log("File read failed:", err)
            return cb && cb({message: `File read failed: ${err}`})
        }
        try {
            const object = JSON.parse(fileData)
            console.log('File data:',object);
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb({message: `Error parsing JSON string: ${err}`})
        }
    });
}

module.exports = {jsonReader}