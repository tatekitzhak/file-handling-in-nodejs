const fs = require('fs');
const path = require('path');

/* 
fs.readFile('file', 'utf8', function (error, data) {

    if (err){
        console.log("File read failed:", error)
        return;
     }
    
    try{
        const obj = JSON.parse(data);
        console.log('File data:',obj);
        
    }catch(err) {
        console.log('Error parsing JSON string:', err)
    }
}); 
*/

function jsonReader(filePath, cb){

    fs.readFile(filePath, 'utf8', function(err, fileData){
        if (err){
            console.log("File read failed:", err)
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            console.log('File data:',object);
            return cb && cb(object)
        } catch(err) {
            console.log('Error parsing JSON string:', err)
            return cb && cb(err)
        }
    });
}
// jsonReader('./customer.json', function(err, data){
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(data) // => "Infinity Loop Drive"
// });

module.exports = {jsonReader}