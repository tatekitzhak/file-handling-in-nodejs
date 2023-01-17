const ObjectId = require('mongoose').Types.ObjectId;
const { Product, Owner, Shop } = require('../../models/index')

// All Business logic will be here
module.exports = {
    async createCategories(categories) {

        try {
            let owner = {};
            /* 
                        for (let i = 0; i < categories.length; i++) {
                            // console.log('categorie, i: ', i, categorie)
            
                            await Owner.create({ name: categories[i].name })
                                .then(owner => {
                                    console.log(' \x1b[36m owner: \x1b[0m ', owner)
                                })
                                .catch(err => console.log('Error on bundle: Owner.create: ' + err));;
            
                            
                                            // owner = new Owner({
                                            //     name: categories[i].name
                                            // })
                                            // await owner.save()
                                            //     .then(res => {
                                            //         console.log(' \x1b[36m res: \x1b[0m ', res._id)
                                            //     });
                                            // console.log(' \x1b[36m owner: \x1b[0m ', i, owner)
                                            
                        }
                        return owner;
             */

            for (let i = 0; i < categories.length; i++) {

                await Owner.create({ name: categories[i].name })
                    .then(async function (owner) {

                        for (let s = 0; s < categories[i].subcategories.length; s++) {
                            console.log('subcategories.length: ', categories[i].subcategories.length, categories[i].subcategories[s], i, s)
                            await Shop.create({ owner: owner._id, name: categories[i].subcategories[s] })
                                .then(async function (shop) {

                                    await Owner.findByIdAndUpdate(owner._id, {
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
            const owner = await Owner.find().populate();
            console.log('getCategories:', owner)
            return owner;

        } catch (err) {
            throw new Error('Data Not found')
        }
    }
}