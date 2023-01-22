const ObjectId = require('mongoose').Types.ObjectId;
const { CategorieModel, SubcategorieModel, Owner, Shop } = require('../../models/index')

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
                console.log('Finally will execute every time');

               /*  let categorie = await CategorieModel.find(); 
                let subcategorie = await SubcategorieModel.find();
                console.log('categorie:', categorie.length);
                console.log('subcategorie:', subcategorie.length); */

            }
        }

    },

    async getCategories() {
        try {
            const categorie = await CategorieModel.find()
                .populate({
                    path: 'subcategories',
                    /*  populate: {
                         path: 'topics',
                         select: 'name',
                     },
                     options: { lean: true } */
                });
            console.log('getCategories:', categorie)
            return categorie;

        } catch (err) {
            throw new Error('Data Not found')
        }
    }
}