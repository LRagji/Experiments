let brandsArray = [];
let eType = require('backend-entity').entity;

class brands {

    constructor(pgPool) {

        this.createBrand = this.createBrand.bind(this);
        this.readBrands = this.readBrands.bind(this);
        this.updateBrand = this.updateBrand.bind(this);

        // if (brandsArray.length === 0) {
        //     for (let i = 0; i < 10; i++) {
        //         this.createBrand("Laukik" + i, "https://www.facebook.com/");
        //     }
        // }
        let propertyMap = {
            "id": "id",
            "name": "name",
            "website": "website"
        };

        this._entity = new eType("brands", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new brands(pgPool);
        }
        return this.instance;
    }

    async createBrand(brandName, brandWebsite) {
        let brand = { name: brandName, website: brandWebsite };
        return await this._entity.createEntity(brand);
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

    readBrandById(id) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = brandsArray.findIndex((l) => l.id === id);
                if (idx < 0)
                    acc(undefined);
                else
                    acc(Object.assign({}, brandsArray[idx]));
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
                if (foundBrands.length > 0) {
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