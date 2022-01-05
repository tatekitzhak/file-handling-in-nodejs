const fs = require('fs');

function readJSONFile(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
// readJSONFile('./static/output.json', function(err, data){
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data); // => "Infinity Loop Drive"
// });

module.exports = {readJSONFile}