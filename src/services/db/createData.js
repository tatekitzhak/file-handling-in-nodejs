const mongoose = require('mongoose');
var async = require("async");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const mtime = require('microtime');
const { CategoryModel, SubcategoryModel } = require('../../models/index')

// All Business logic will be here
module.exports = {
    async createCategories(categories) {
        /**
         * https://stackoverflow.com/questions/10266512/how-can-i-save-multiple-documents-concurrently-in-mongoose-node-js
         * https://forum.freecodecamp.org/t/pushing-mongoose-documents-to-another-document-as-array-elements/400067/3
         * https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
         * https://stackoverflow.com/questions/24359650/getting-nested-array-references-using-mongoose-schema
         * https://stackoverflow.com/questions/27260162/how-to-save-multiple-refs-to-other-documents-in-mongodb-using-mongoose
         * https://mongoosejs.com/docs/2.7.x/docs/populate.html
         * https://masteringjs.io/tutorials/mongoose/array
         */

    },

    async createCategoriesAndSubcategoriesCollections(newCategoriesDocument) {
        const saveStart = mtime.now()

        const categoriesIfExist = await CategoryModel.find();
        const SubcategoryModelIfExist = await SubcategoryModel.find();

        let newCategoriesSize;
        let categoriesCollections;
        let i = 0;

        if (categoriesIfExist.length || SubcategoryModelIfExist.length) {
            console.log('Collection documents already exists!');
            CategoryModel.deleteOne({});
            SubcategoryModel.deleteOne({});
        }

        do {

            function createCollections(arrayOfCategories, index, callback) {

                try {

                    async.parallel({
                        one: function(callback) {
                            callback(null, index);
                        },
                        two: function(callback) {
                            callback(null, arrayOfCategories);
                        }
                    },
                        async function (err, results) {
                            await async.map(arrayOfCategories.subcategories, createSubcategory, async function (err, subcategories) {
                                console.log('results:', results);
                                var category = new CategoryModel({ name: arrayOfCategories.category });

                                for (var i = 0; i < subcategories.length; i++) {
                                    console.log('subcategories.length:', i, subcategories[i])
                                    category.subcategories.push(subcategories[i]);
                                }

                                await category.save(function (err, doc) {
                                    CategoryModel.find({})
                                        .populate('subcategories')
                                        .exec(function (err, books) {
                                            // console.log('subcategories:', err, books);
                                        });
                                });
                            });
                        }
                    );

                    function createSubcategory(subcategory, fn) {
                        // console.log('subcategory:', subcategory, fn)
                        var subcategory = new SubcategoryModel({ name: subcategory });
                        subcategory.save(fn);
                    }

                } catch (error) {
                    console.log('\x1b[36m Error on bundle: categoryModel: \x1b[0m:', error);

                    return callback(error);
                }
                finally {

                    //finallyCode - Code block to be executed regardless of the try result
                    /**
                     * Do some clean up
                     * Do log
                     */
                    const saveTime = (mtime.now() - saveStart) / 1000
                    console.log(`\x1b[save: ${saveTime} \x1b[0m ms `)
                    console.log('Finally block will execute every time');
                    callback();
                }
                // callback();
            }

            async.forEachOf(newCategoriesDocument, createCollections, (err, cb) => {
                if (err) {
                    console.error('err:', err.message);
                    // cb(err.message);
                } else {
                    console.log('ENDED');
                    // cb('ENDED');
                }
            });
            categoriesCollections = await CategoryModel.find();
            newCategoriesSize = newCategoriesDocument.length;

            console.log(i, newCategoriesSize, categoriesCollections.length);
            i++;

            if (newCategoriesSize < categoriesCollections.length || newCategoriesSize > categoriesCollections.length) {

                CategoryModel.deleteOne({});
                SubcategoryModel.deleteOne({});
                console.log('Collection documents already exists!');
            }
        } while (newCategoriesSize > categoriesCollections.length);
    },

    async getCategories() {
        try {
            const categorie = await CategoryModel.find()
                .populate({
                    path: 'subcategories',
                    //  populate: {
                    //      path: 'topics',
                    //      select: 'name',
                    //  },
                    options: { lean: true }
                });

            CategoryModel.count(function (error, count) {
                if (error) {
                    // return handleError(err) 
                    console.log('errors: Count Documents')
                } //handle possible errors
                else console.log("Count Documents is:", count)
            });

            return categorie;

        } catch (err) {
            throw new Error('Data Not found')
        }
    }
}
