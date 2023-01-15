'use strict'; // eslint-disable-line strict
const CreateData = require('../../services/database/createData');

const buildDatabase = (req, res, next) => {
    const name = new CreateData('arguments');
    let data = name.createCategories('buildDatabase');
        if (1) {
            res.status(200).json(data);
        } else {
            res.status(400).json('Empty');
        }
 
};

module.exports = { buildDatabase };