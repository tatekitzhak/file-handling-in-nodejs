const ObjectId = require('mongoose').Types.ObjectId;
const { Product, Owner, Shop } = require('../../models/index')

// All Business logic will be here
module.exports = {
    async createCategories(categories) {

        try {
            /* 
                        categories.forEach((categorie, i) => {
                            console.log('categorie, i: ',i, categorie)
                            
                             Owner.create({ name: categorie.name })
                                .then(async function (owner) {
                                    console.log('owner: ', owner)
                                    console.log('categorie.subcategories: ', categorie)
                                    categorie.subcategories.forEach((subcategorie, x) => {
                                        console.log('subcategorie, i: ', subcategorie, x, i)
            
                                         const shop_id = Shop.create({ owner: owner._id, name: subcategorie })
                                            .then(async function (shop) {
                                                return shop._id
            
                                                return await Owner.findByIdAndUpdate(owner._id, {
                                                    $push: { shops: shop._id }
                                                }, { 'new': true });
            
            
                                            })
                                            .catch(err => console.log('\x1b[31m Error on bundle: Shop.create: \x1b[0m  ' + err));
                                           
                                    });
                                    
                                })
                                .catch(err => console.log('\x1b[31m Error on bundle: Owner.create: \x1b[0m ' + err));
            
                        });
                         */

            for (let i = 0; i < categories.length; i++) {
                console.log('categories.length: ', categories.length, categories[i].name, i)

                 Owner.create({ name: categories[i].name })
                    .then(async function (owner) {

                        for (let s = 0; s < categories[i].subcategories.length; s++) {
                            console.log('subcategories.length: ', categories[i].subcategories.length, categories[i].subcategories[s],i, s)
                             Shop.create({ owner: owner._id, name: categories[i].subcategories[s] })
                                .then(async function (shop) {

                                     Owner.findByIdAndUpdate(owner._id, {
                                        $push: { shops: shop._id }
                                    }, { 'new': true });

                                })
                                .catch(err => console.log('Error on bundle: Shop.create: ' + err));

                        };
                    })
                    .catch(err => console.log('Error on bundle: Owner.create: ' + err));

            };


        } catch (error) {
            console.log('error:\n', error);

        }
        finally {
            //finallyCode - Code block to be executed regardless of the try result
            /**
             * Do some clean up
             * Do log
             */
            console.log('Finally will execute every time');
        }

    },

    async getCategories() {
        try {
            const categories = await this.categorieModel.find()
            console.log('getCategories:', categories)
            console.log('this.categories:', this.categories)
            return categories;

        } catch (err) {
            throw new Error('Data Not found')
        }
    }
}