'use strict'; // eslint-disable-line strict
const { createCategories, getCategories } = require('../../services/db/createData');


const buildDatabase = (categories) => {

    const topics = [
        {
            "name": "ran 1",
            "subcategories": [
                        "111111111",
                        "222222222",
                        "333333333",
            ]
        },
        {
            "name": "ran 2",
            "subcategories": [
                        "aaaaaa",
                        "bbbbbb",
                        "cccccc"
            ]
        },
        {
            "name": "ran 3",
            "subcategories": [
                "AAAAAAAAAAA",
                "BBBBBBBBBBB",
                "CCCCCCCCCCC",
            ]
        }
    ];

    createCategories(topics)
    getCategories()

};

module.exports = { buildDatabase };