'use strict'; // eslint-disable-line strict
const CreateData = require('../../services/database/createData');
const { Categorie } = require('../../models/index');

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');

const readWriteFiles = (req, res, next) => {
    

    async function getContent(content) {
        const db = new CreateData(content.length, content, Categorie);

        // console.table( db.getCategories())

        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };