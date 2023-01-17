'use strict'; // eslint-disable-line strict
const CreateData = require('../../services/db/createData');

const { CategorieModel, SubcategorieModel } = require('../../models/index');

const buildDatabase = (categories) => {

    const categoriesInc = new CreateData(categories, CategorieModel, SubcategorieModel);

};

module.exports = { buildDatabase };