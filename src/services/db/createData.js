const mongoose = require('mongoose');
var async = require("async");
var Schema = mongoose.Schema;
const mtime = require('microtime');
const { CategorieModel, SubcategorieModel, Owner, Shop } = require('../../models/index')

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


        const categoriesIfExist = await CategorieModel.find();
        if (categoriesIfExist.length) {
            throw new Error('Collection documents already exists!');
        } else {

            try {

                for (let i = 0; i < categories.length; i++) {
                    console.log('categories:\n', categories.length);
                    await CategorieModel.create({ name: categories[i].name })
                        .then(async function (categorie) {
                            for (let s = 0; s < categories[i].subcategories.length; s++) {
                                console.log('subcategories:\n', categories[i].subcategories.length);
                                await SubcategorieModel.create({ categories: categorie._id, name: categories[i].subcategories[s] })
                                    .then(async function (subcategorie) {
                                        await CategorieModel.findByIdAndUpdate(categorie._id, {
                                            $push: { subcategories: subcategorie._id }
                                        }, { 'new': true });

                                    })
                                    .catch(function (error) {
                                        console.log('\x1b[36m Error on bundle: SubcategorieModel.create: \x1b[0m:', error)
                                        new Error("Could not create a new SubcategorieModel");
                                    });

                            }
                        })
                        .catch(function (error) {
                            console.log('\x1b[36m Error on bundle: CategorieModel.create: \x1b[0m:', error)
                            new Error("Could not create a new CategorieModel");
                        });
                }


            } catch (error) {
                console.log('error:\n', error);
                new Error("Could not create a new schema model");
            }
            finally {

                //finallyCode - Code block to be executed regardless of the try result
                /**
                 * Do some clean up
                 * Do log
                 */
                const saveTime = (mtime.now() - saveStart) / 1000
                console.log(`save: ${saveTime} ms `)
                console.log('Finally will execute every time');

                /*  let categorie = await CategorieModel.find(); 
                 let subcategorie = await SubcategorieModel.find();
                 console.log('categorie:', categorie.length);
                 console.log('subcategorie:', subcategorie.length); */

            }
        }

    },

    async createCategoriesAndSubcategorie(multipleDocument) {

        const saveStart = mtime.now()

        const categoriesIfExist = await CategorieModel.find();

        if (categoriesIfExist.length) {
            throw new Error('Collection documents already exists!');
        } else {
            /* const categoryDoc = multipleDocument.pop();
            console.log('Collection documents is empty:', categoryDoc);
 */


            try {
                /*
                var async = require('async');

var arrayOfCategories = [
  {
    category: 'ran 1',
    subcategories: ['review 1', 'review 2', 'review 3'],
  },
  {
    category: 'ran 2',
    subcategories: ['review - a', 'review - b', 'review - c'],
  },
  {
    category: 'ran 3',
    subcategories: ['review A', 'review B', 'review C'],
  },
];

function createCollection(category, index, callback) {
  try {
    // console.log('subcategory, index,:', index, category);
    async.parallel(
      {
        one: function (callback) {
          callback(null, 'Book\n');
        },
        two: function (callback) {
          callback(null, 'Review\n');
        },
      },
      function (err, results) {
        // results now equals to: results.one: 'abc\n', results.two: 'xyz\n'
        //console.log('results:', category);
        async.map(
          ['review 1', 'review 2', 'review 3'],
          createReview,
          function (err, reviews) {
            console.log('new Book:', reviews);
            for (var i = 0; i < reviews.length; i++) {
              // book.reviews.push(reviews[i]);
            }
          }
        );
      }
    );
    function createReview(body, callback) {
      console.log('createReview:', body, callback);
      callback();
    }
  } catch (e) {
    return callback(e);
  }
  callback();
}

async.forEachOf(arrayOfCategories, createCollection, (err) => {
  if (err) {
    console.error('err:', err.message);
    // cb(err.message);
  } else {
    console.log('ENDED');
    // cb('ENDED');
  }
});

                */

                var Review = mongoose.model('Review', new Schema({
                    body: String
                }));

                var Book = mongoose.model('Book', new Schema({
                    title: String,
                    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
                }));

                async.parallel([
                    function (next) { console.log(' Book:',next); Book.deleteOne({}, next); },
                    function (next) { console.log('Review:',next); Review.deleteOne({}, next); }
                ],
                    function () {
                        async.map(['review 1', 'review 2', 'review 3'], createReview, function (err, reviews) {
                            var book = new Book({ title: 'something clever' });
                            console.log('new Book:',reviews)
                            for (var i = 0; i < reviews.length; i++) {
                                book.reviews.push(reviews[i]);
                            }

                            book.save(function (err, doc) {
                                Book.find({})
                                    .populate('reviews')
                                    .exec(function (err, books) {
                                        console.log('reviews:', err, books);
                                    });
                            });
                        });
                    }
                );

                function createReview(body, fn) {
                    console.log('createReview:', body, fn)
                    var review = new Review({ body: body });
                    review.save(fn);
                }

                // const category = new CategorieModel({ name: 'ran 4' });

                // await category.save(() => console.log('Save successful!'));
            } catch (error) {
                console.log('error:\n', error);
                new Error("Could not create a new schema model");
            }
            finally {

                //finallyCode - Code block to be executed regardless of the try result
                /**
                 * Do some clean up
                 * Do log
                 */
                const saveTime = (mtime.now() - saveStart) / 1000
                console.log(`save: ${saveTime} ms `)
                console.log('Finally will execute every time');

            }
        }
    },

    async getCategories() {
        try {
            const categorie = await CategorieModel.find()
            // .populate({
            //     path: 'subcategories',
            //      populate: {
            //          path: 'topics',
            //          select: 'name',
            //      },
            //      options: { lean: true }
            // });
            CategorieModel.count(function (error, count) {
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