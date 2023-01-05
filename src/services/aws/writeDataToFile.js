const fs = require('fs');
// write the data into a file and save to folder.
const writeDataIntoTile = (stream, rootDir, subDir, fileName) => {
    new Promise((resolve, reject) => {
        /*
        Flags for fs.createWriteStream(): w - for write. a - for append. r - for
         */
        stream.pipe(fs.createWriteStream('/Users/eli/git_repos/full-stack/file-handling-in-nodejs/src/static/writeDataIntoTile.txt', { flags: 'w' }))
            .on('error', err => reject(err))
            .on('close', () => resolve())
    });
}

module.exports = { writeDataIntoTile };