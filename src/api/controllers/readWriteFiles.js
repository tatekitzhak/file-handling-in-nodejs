'use strict'; // eslint-disable-line strict

const path = require('path'),
  fs = require('fs');

const { readingWritingFilesHandle } = require('../../services/read_write_files_local_system/index');

var readableResources = path.join(__dirname, '../../static/test_topics/'),
  newWritableJSONFile = path.join(__dirname, '../../static/output.json');

const readWriteFiles = (req, res, next) => {

    function errorHandling(err) {
        console.log('Reading directory error:\n', err)
        next(err)
    }

    function getContentOfArrayAndWriteFile(content) {

        fs.writeFile(newWritableJSONFile, JSON.stringify(content), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File:\n", err);
                return;
            }

            // console.log(`Writable a JSON file complete, has been saved at:${newWritableJSONFile}`);
        });

        res.status(200).json(content);
    }

    readingWritingFilesHandle(readableResources, getContentOfArrayAndWriteFile, errorHandling);
    
}

module.exports = { readWriteFiles };