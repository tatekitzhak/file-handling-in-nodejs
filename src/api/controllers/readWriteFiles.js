'use strict'; // eslint-disable-line strict

// const { buildDatabase } = require('./buildDatabase');
const { createCategories, getCategories, createCategoriesAndSubcategoriesCollections } = require('../../services/db/createData');

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');

const readWriteFiles = (req, res, next) => {
    const topics = [
        {
            "category": "ran 1",
            "subcategories": [
                        "111111111",
                        "222222222",
                        "333333333",
            ]
        },
        {
            "category": "ran 2",
            "subcategories": [
                        "aaaaaa",
                        "bbbbbb",
                        "cccccc"
            ]
        },
        {
            "category": "ran 3",
            "subcategories": [
                "AAAAAAAAAAA",
                "BBBBBBBBBBB",
                "CCCCCCCCCCC",
            ]
        }
    ];
    

    async function getContent(content) {
        if (!content.length) {
            console.log('Missing categories data')
            throw new Error('Missing categories data');
        }
        // await createCategoriesAndSubcategoriesCollections(topics);
        // const categories = await getCategories()

        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };