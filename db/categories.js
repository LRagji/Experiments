let categoriesArray = [];

class categories {

    constructor() {

        this.readAllCategories = this.readAllCategories.bind(this);
        this.createCategory=this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.readCategoryId = this.readCategoryId.bind(this);
        this.retriveIdFor = this.retriveIdFor.bind(this);

        if (categoriesArray.length === 0) {
            for (let i = 0; i < 1;)
                this.createCategory("Category " + i).then(i++);
        }

    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new categories();
        }
        return this.instance;
    }

    async createCategory(name) {
        return new Promise((acc, rej) => {
            try {

                if (this.retriveIdFor(name) >= 0) throw new Error(name + " name already exists.");
                let categrory = {
                    "id": categoriesArray.length + 1,
                    "name": name
                };
                categoriesArray.push(categrory);

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }
    
    retriveIdFor(name) {
        return new Promise((acc, rej) => {
            try {
                acc(categoriesArray.findIndex((l) => l.name === name));
            } catch (err) {
                rej(err);
            }
        })
    }

    async readCategoryId(id) {
        return new Promise((acc, rej) => {
            try {
                let idx = categoriesArray.findIndex((l) => l.id === id);
                if (idx < 0) throw new Error("Category Id:" + id + " doesnot exists.");
                acc(Object.assign({}, categoriesArray[idx]));
            } catch (err) {
                rej(err);
            }
        })
    }

    async readAllCategories() {
        return new Promise((acc, rej) => {
            try {
                acc(categoriesArray);
            } catch (err) {
                rej(err);
            }
        });
    }

    async updateCategory(id, name) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = categoriesArray.findIndex((l) => l.id === id);
                if (idx < 0) throw new Error("Category Id:" + id + " doesnot exists.");
                categoriesArray[idx].name = name;
                acc();

            } catch (err) {
                rej(err);
            }
        });
    }


}

module.exports = categories;