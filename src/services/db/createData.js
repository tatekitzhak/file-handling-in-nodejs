const mongoose = require('mongoose');
var async = require("async");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const mtime = require('microtime');
const { CategoryModel, SubcategoryModel } = require('../../models/index')

// All Business logic will be here
module.exports = {
    async createCategories(categories) {
        const saveStart = mtime.now()
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

    async createCategoriesAndSubcategoriesCollections(multipleDocument) {

        const saveStart = mtime.now()

        const categoriesIfExist = await CategoryModel.find();
        const SubcategoryModelIfExist = await SubcategoryModel.find();

        if (categoriesIfExist.length || SubcategoryModelIfExist.length) {

            CategoryModel.deleteOne({});
            SubcategoryModel.deleteOne({});
            console.log('Collection documents already exists!');
        }

        function createCollections(arrayOfCategories, index, callback) {

            try {

                async.parallel([
                    function (callback) {
                        console.log(' Book.deleteOne:');
                        callback(null, 'Book\n');
                    },
                    function (callback) {
                        console.log(' Review.deleteOne:');
                        callback(null, 'Review\n');
                    },
                ],
                    async function (err, results) {
                        await async.map(arrayOfCategories.subcategories, createSubcategory, async function (err, subcategories) {
                            var category = new CategoryModel({ name: arrayOfCategories.category });
                            console.log('new Book:', subcategories)
                            for (var i = 0; i < subcategories.length; i++) {
                                category.subcategories.push(subcategories[i]);
                            }

                            await category.save(function (err, doc) {
                                CategoryModel.find({})
                                    .populate('subcategories')
                                    .exec(function (err, books) {
                                        console.log('subcategories:', err, books);
                                    });
                            });
                        });
                    }
                );

                function createSubcategory(subcategory, fn) {
                    console.log('subcategory:', subcategory, fn)
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
                console.log('Finally will execute every time');
                callback();
            }
            // callback();
        }

        async.forEachOf(multipleDocument, createCollections, (err) => {
            if (err) {
                console.error('err:', err.message);
                // cb(err.message);
            } else {
                console.log('ENDED');
                // cb('ENDED');
            }
        });
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

/**

var Category1 = mongoose.model('Category1', new Schema({

                    name: {
                        type: String,
                        // required: '{PATH} is required!',
                        minlength: 3,
                        maxlength: 255,
                        unique: true,
                        uppercase: true
                    },
                    subcategories: [{
                        type: ObjectId,
                        ref: 'Subcategory1',
                        unique: true
                    }],
                    tags: {
                        type: [Schema.Types.Mixed],
                        lowercase: true,
                    },
                },
                    {
                        timestamps: true,
                        versionKey: false
                    }));

                var Subcategory1 = mongoose.model('Subcategory1', new Schema({
                    name: {
                        type: String,
                        minlength: 3,
                        maxlength: 255,
                        //   required: function () {
                        //     return this.categories.require
                        //   },
                        unique: true
                    },
                }));
 */