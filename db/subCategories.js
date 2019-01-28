let subCategoriesArray = [];

class subcategories {

    constructor() {

        this.readAllSubCategories = this.readAllSubCategories.bind(this);
        this.createSubCategory = this.createSubCategory.bind(this);
        this.updateSubCategory = this.updateSubCategory.bind(this);
        this.readSubCategoryId = this.readSubCategoryId.bind(this);
        this.retriveIdFor = this.retriveIdFor.bind(this);

        if (subCategoriesArray.length === 0) {
            for (let i = 0; i < 10;)
                this.createSubCategory(1, "SubCate\"gory " + i).then(i++);
        }

    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new subcategories();
        }
        return this.instance;
    }

    async createSubCategory(categoryId, subCatName) {
        categoryId = parseInt(categoryId);
        if (await this.retriveIdFor(subCatName) >= 0) throw new Error(subCatName + " name already exists.");
        let subCategrory = {
            "id": subCategoriesArray.length,
            "catid": categoryId,
            "name": subCatName
        };
        subCategoriesArray.push(subCategrory);
    }

    retriveIdFor(name) {
        return new Promise((acc, rej) => {
            try {
                acc(subCategoriesArray.findIndex((l) => l.name === name));
            } catch (err) {
                rej(err);
            }
        })
    }

    async readSubCategoryId(id) {
        return new Promise((acc, rej) => {
            try {
                let idx = subCategoriesArray.findIndex((l) => l.id === id);
                if (idx < 0) throw new Error("Sub-Category Id:" + id + " doesnot exists.");
                acc(Object.assign({}, subCategoriesArray[idx]));
            } catch (err) {
                rej(err);
            }
        })
    }

    async readAllSubCategories() {
        return new Promise((acc, rej) => {
            try {
                acc(subCategoriesArray);
            } catch (err) {
                rej(err);
            }
        });
    }

    async updateSubCategory(id, categoryId, subCatName) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                categoryId = parseInt(categoryId);
                let idx = subCategoriesArray.findIndex((l) => l.id === id);
                if (idx < 0) throw new Error("Sub-Category Id:" + id + " doesnot exists.");
                subCategoriesArray[idx].name = subCatName;
                subCategoriesArray[idx].catid = categoryId;
                acc();

            } catch (err) {
                rej(err);
            }
        });
    }
}

module.exports = subcategories;