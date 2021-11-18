const fs = require('fs');
const path = require('path');

function jsonReader(filePath, handleData, errorHandle){

    fs.readFile(filePath, 'utf8', function(err, fileData){
        if (err){
            console.log("File read failed:", err)
            return errorHandle && errorHandle(`File read failed: ${err}`)
        }
        try {
            const object = JSON.parse(fileData)
            console.log('File data:',object);
            return handleData && handleData(object)
        } catch(err) {
            //console.log(`Error parsing JSON string: ${err}`)
            return errorHandle && errorHandle(`Error parsing JSON string: ${err}`)
        }
    });
}

module.exports = {jsonReader}