const fs = require('fs');
const readline = require('readline');
/* -----------guide-----------
  https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
*/



async function readFileLineByLine(filePath) {
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

module.exports = {readFileLineByLine}