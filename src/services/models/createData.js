// const { ProductRepository } = require("../database");
const { Categorie } = require('../../models/index');


// All Business logic will be here
class CreateData {
    constructor() {
        console.log('constructor CreateCategories')
    }

    createCategories(data) {
        console.log('CreateCategories:', data)
        try {

            return 'createCategories';
        } catch (err) {
            throw new Error('Data Not found')
        }

    }

    async GetCategories() {
        try {
            const products = await this.repository.Products();

            let categories = {};

            products.map(({ type }) => {
                categories[type] = type;
            });

            return FormateData({
                products,
                categories: Object.keys(categories),
            })

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }


    async GetProductDescription(productId) {
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductsByCategory(category) {
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedProducts(selectedIds) {
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetCategoriestById(productId) {
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

}

module.exports = CreateData;