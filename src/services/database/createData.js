// const { ProductRepository } = require("../database");
const { Categorie } = require('../../models/index');


// All Business logic will be here
class CreateData {
    constructor(size, data, categorie) {
        this.data = data;
        this.categories_size = size;
        this.categorieModel = categorie
        this.createCategories(this.data, this.categorieModel)
    }

    async createCategories(data, CategorieModel) {
        try {
            const categoriesSize = data.length;
            const categories = data;
            for (let i = 0; i < categoriesSize; i++) {
                // console.log(`categories:${i}`,categories)

                CategorieModel.create({ name: categories[i].name, tags: categories[i].name.split(" ") })
                    .then(function (result) {
                        console.log(`result:${i}`, result)
                        return result;
                    })
                    .catch(function (error) {
                        console.log('catch 1 error:\n',error)
                        throw new Error(error)
                    })
            }

        } catch (error) {
            // console.log('catch 2 error:\n',error)
            throw new Error(error)
        }

    }

     getCategories() {
        try {

            return this.data;

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