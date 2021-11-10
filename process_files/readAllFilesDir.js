var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
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