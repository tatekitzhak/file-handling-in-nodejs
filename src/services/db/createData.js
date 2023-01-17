
// All Business logic will be here
class CreateData {
    constructor(categories, categorieModel, subcategorieModel) {
        this.categories = categories;
        this.categorieModel = categorieModel
        this.subcategorieModel = subcategorieModel
        this.createCategories();
        // this.getCategories()
    }

    createCategories() {

        try {

           this.categories.forEach((categorie, i) => {
                console.log('categorie-1:', i, categorie)
                const res = this.categorieModel.create({ name: categorie.name, tags: categorie.subcategories })
                    .then(function (categorie) {
                        console.log('categorie-2:', i, categorie)
                        return categorie;
                    })
                    .catch(function (error) {
                        console.log('catch 1 error:\n', error)
                        throw new Error(error)
                    });

            });
     
        } catch (error) {
            console.log('catch 2 error:\n', error)
            throw new Error(error)
        }

    }

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

    async createSubcategorie(subcategories, SubcategorieModel) {
        
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