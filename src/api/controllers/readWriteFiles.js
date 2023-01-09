'use strict'; // eslint-disable-line strict

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');

const readWriteFiles = (req, res, next) => {

    function getContent(content) {
        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };