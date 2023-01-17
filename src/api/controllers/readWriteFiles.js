'use strict'; // eslint-disable-line strict

const { buildDatabase } = require('./buildDatabase');

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');

const readWriteFiles = (req, res, next) => {
    

    async function getContent(content) {
        

        buildDatabase(content)

        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };