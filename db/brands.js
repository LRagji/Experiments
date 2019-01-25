let brandsArray = [];

class brands {

    constructor() {

        this.createBrand = this.createBrand.bind(this);
        this.readBrands = this.readBrands.bind(this);
        this.updateBrand = this.updateBrand.bind(this);

        if (brandsArray.length === 0) {
            for (let i = 0; i < 1; i++) {
                this.createBrand("Laukik","https://www.facebook.com/");
            }
        }
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new brands();
        }
        return this.instance;
    }

    createBrand(brandName, brandWebsite) {
        return new Promise((acc, rej) => {
            try {
                let brand = { name: brandName, id: brandsArray.length, website: brandWebsite };
                brandsArray.push(brand);
                acc(brand);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readBrands() {
        return new Promise((acc, rej) => {
            try {
                acc(brandsArray.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    updateBrand(id, brandName, brandWebsite) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let foundBrands = brandsArray.filter((e) => e.id === id);
                if (foundBrands.length > 0)
                { 
                    foundBrands[0].name = brandName;
                    foundBrands[0].website = brandWebsite;
                }
                acc(Object.assign({}, foundBrands[0]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }
}

module.exports = brands;