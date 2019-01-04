let products = [];
let fs = require('fs');

class Products {

    constructor(pgPool) {

        this.pgPool = pgPool;
        this.deleteProduct = this.deleteProduct;
        this.getProductById = this.getProductById.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
        this.filterSubCategory = this.filterSubCategory.bind(this);
        this.filterKeywords = this.filterKeywords.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this._fromProperties = this._fromProperties.bind(this);


        if (products.length === 0) {
            for (let i = 0; i < 1; i++) {
                this.createProduct(
                    "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veg " + i,
                    (parseFloat(i) * 100.00 + 1000.00),
                    (parseFloat(i) * 100.00),
                    "default.jpg",
                    '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
                    '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>',
                    "C" + i.toString(),
                    "180 Softgels",
                    "1 Softgels",
                    "This bottle will last 180 days.",
                    i + 1,
                    "Category" + i.toString(),
                    "Sub Category" + i.toString(),
                    "NOW FOODS",
                    "https://www.health-mall.in",
                    [],
                    "search Laukik Ragji Hello",
                    undefined
                );
            }
        }
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new Products(pgPool);
        }
        return this.instance;
    }

    async createProduct(name, productPrice, offerPrice, image, desc, ingredients, code, package_detail, serving_size, serving_per_container, shippingdetail, category, subCategory, manufactureName, manufactureWebsite, faq, searchKeywords, imageBuffer) {

        let newProduct = this._fromProperties(-1,
            name,
            productPrice,
            offerPrice,
            image,
            desc,
            ingredients,
            code,
            package_detail,
            serving_size,
            serving_per_container,
            shippingdetail,
            category,
            subCategory,
            manufactureName,
            manufactureWebsite,
            faq,
            searchKeywords);

        if (imageBuffer !== undefined) {
            fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
        }

        let insertStatement = `INSERT INTO products (name,price,offerPrice,"imageName",faq,keywords,meta,description,ingredients) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING ID`;

        let response = await this.pgPool.query(insertStatement, [newProduct.name, newProduct.price, newProduct.offerprice, newProduct.image, newProduct.faq, newProduct.keywords, newProduct.meta, newProduct.description, newProduct.ingredients]);

        if (response.rows.length !== 1) throw new Error("Failed to persist product");
        newProduct.id = response.rows[0].id;

        products.push(newProduct);
        return newProduct;
    }

    async updateProduct(id, name, productPrice, offerPrice, image, desc, ingredients, code, package_detail, serving_size, serving_per_container, shippingdetail, category, subCategory, manufactureName, manufactureWebsite, faq, searchKeywords, imageBuffer) {

        let updatedProduct = this._fromProperties(
            id,
            name,
            productPrice,
            offerPrice,
            image,
            desc,
            ingredients,
            code,
            package_detail,
            serving_size,
            serving_per_container,
            shippingdetail,
            category,
            subCategory,
            manufactureName,
            manufactureWebsite,
            faq,
            searchKeywords);

        if (imageBuffer !== undefined) {
            fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
        }

        let updateStatement = `UPDATE products
                 	SET name=$1, offerprice=$2, price=$3, "imageName"=$4, faq=$5, keywords=$6, meta=$7, description=$8, ingredients=$9
                    WHERE id=$10 returning id`;

        let response = await this.pgPool.query(updateStatement, [updatedProduct.name, updatedProduct.offerprice, updatedProduct.price, updatedProduct.image, updatedProduct.faq, updatedProduct.keywords, updatedProduct.meta, updatedProduct.description, updatedProduct.ingredients, updatedProduct.id]);

        if (response.rows.length !== 1) throw new Error("Product updation failed, or product doesnt exits with id:" + updatedProduct.id);
        if (updatedProduct.id !== response.rows[0].id) throw new Error("Incorrect product updated expected id:" + updatedProduct.id + " but updated id:" + response.rows[0].id);

        let idx = products.findIndex((v) => v.id === updatedProduct.id);
        products[idx] = updatedProduct;
        return updatedProduct;

    }

    deleteProduct(productId) {
        return new Promise((acc, rej) => {
            try {
                productId = parseInt(productId);
                let idx = products.findIndex((v) => v.id === productId);
                if (idx > -1) {
                    products.splice(idx, 1);
                    acc();
                }
                else {
                    rej(new Error("No product found for Id:" + productId));
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }

    getProductById(productId) {
        // TODO:Call the appropiate API
        return new Promise((acc, rej) => {
            let validatedProductid = parseInt(productId);
            if (isNaN(validatedProductid)) rej(Error("Invalid Product Id:" + productId));
            let product = products.find((p) => p.id === validatedProductid);
            if (product == undefined)
                acc(undefined);
            else
                acc(Object.assign({}, product));
        });
    }

    async getAllProducts(pageNo, size, keyword, category, subcategory) {

        let startIndex = (pageNo * size);
        let endIndex = (startIndex + size);
        let fetchStart = 0, fetchLength = 0;

        let paginateableProducts = Array.from(products);
        if (category !== undefined && category !== "")
            paginateableProducts = await this.filterCategory(paginateableProducts, category);
        if (subcategory !== undefined && subcategory !== "")
            paginateableProducts = await this.filterSubCategory(paginateableProducts, subcategory);
        if (keyword !== undefined && keyword !== "")
            paginateableProducts = await this.filterKeywords(paginateableProducts, keyword);


        if (paginateableProducts.length < startIndex && paginateableProducts.length < endIndex) {
            fetchStart = 0;
            fetchLength = 0;
        }

        else if (paginateableProducts.length > startIndex && paginateableProducts.length < endIndex) {
            fetchStart = startIndex;
            fetchLength = (products.length - startIndex);
        }

        else if (paginateableProducts.length > startIndex && paginateableProducts.length > endIndex) {
            fetchStart = startIndex;
            fetchLength = size;
        }

        return paginateableProducts.splice(fetchStart, fetchLength);

    }

    filterCategory(products, cateogry) {
        return new Promise((acc, rej) => {
            try {
                acc(products);
            }
            catch (err) {
                rej(err);
            }
        });
    }

    filterSubCategory(products, subCateogry) {
        return new Promise((acc, rej) => {
            try {
                acc(products);
            }
            catch (err) {
                rej(err);
            }
        });
    }

    filterKeywords(products, keywords) {
        return new Promise((acc, rej) => {
            try {
                acc(products);
            }
            catch (err) {
                rej(err);
            }
        });
    }

    getProducts(ids) {
        return new Promise((acc, rej) => {

            let result = [];
            ids.forEach(id => {
                let x = products.find((p) => p.id === id);
                if (x !== undefined) result.push(Object.assign({}, x));
            });
            acc(result);
        });
    }

    _fromProperties(id, name, productPrice, offerPrice, image, desc, ingredients, code, package_detail, serving_size, serving_per_container, shippingdetail, category, subCategory, manufactureName, manufactureWebsite, faq, searchKeywords) {

        id = parseInt(id);

        if (image === undefined) {
            image = "default.jpg";
        }

        if (image === "") {
            image = "default.jpg";
        }

        if (faq === undefined) {
            faq = [];
        } else {
            faq = faq.map((e) => parseInt(e));
        }

        if (searchKeywords === undefined) {
            searchKeywords = "";
        }
        return {
            id: id,
            "name": name,
            "offerprice": parseFloat(offerPrice),
            "price": parseFloat(productPrice),
            "image": image,
            "faq": faq, //Has to be int array always
            "keywords": searchKeywords,
            "meta": {
                "code": code,
                "package_detail": package_detail,
                "serving_size": serving_size,
                "serving_per_container": serving_per_container,
                "shippingdetail": shippingdetail,
                "category": category,
                "subCategory": subCategory,
                "mname": manufactureName,
                "mwebsite": manufactureWebsite
            },
            "description": desc,
            "ingredients": ingredients

        }
    }
}

module.exports = Products;