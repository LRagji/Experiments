let products = [];

class Products {

    constructor() {

        this.deleteProduct = this.deleteProduct;
        this.getProductById = this.getProductById.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
        this.filterSubCategory = this.filterSubCategory.bind(this);
        this.filterKeywords = this.filterKeywords.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this._fromProperties = this._fromProperties.bind(this);


        if (products.length === 0) {
            for (let i = 0; i < 41; i++) {
                this.saveProduct(
                    "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veg " + i,
                    (parseFloat(i) * 100.00 + 1000.00),
                    (parseFloat(i) * 100.00),
                    "default.jpg",
                    '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
                    '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>',
                    {
                        "code": "C" + i.toString(),
                        "package_detail": "180 Softgels",
                        "serving_size": "1 Softgels",
                        "serving_per_container": "This bottle will last 180 days.",
                        "shippingdetail": i + 1,
                        "category": "Category" + i.toString(),
                        "subCategory": "Sub Category" + i.toString(),
                        "manufactureName": "NOW FOODS",
                        "manufactureWebsite": "https://www.health-mall.in"
                    },
                    undefined,
                    [],
                    "search Laukik Ragji Hello"
                );
            }
        }
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new Products();
        }
        return this.instance;
    }

    saveProduct(name, productPrice, offerPrice, image, desc, ingredients, meta, imageBuffer, faq, searchKeywords) {
        return new Promise((acc, rej) => {
            try {
                if (imageBuffer !== undefined) {
                    fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
                }

                if (faq === undefined) {
                    faq = [];
                }

                if (searchKeywords === undefined) {
                    searchKeywords = "";
                }

                let insertStatement = `INSERT INTO products (
                    name,offerPrice,price,imageName,faq,keywords,meta,description,ingredients
                    ) VALUES ($1
                    
                ) RETURNING ID`;

                let newProduct = {
                    id: products.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0) + 1,
                    "name": name,
                    "offerprice": parseFloat(offerPrice),
                    "price": parseFloat(productPrice),
                    "image": image,
                    "faq": faq, //Has to be int array always
                    "keywords": searchKeywords,
                    "meta": {
                        "code": meta.code,
                        "package_detail": meta.package_detail,
                        "serving_size": meta.serving_size,
                        "serving_per_container": meta.serving_per_container,
                        "shippingdetail": meta.shippingdetail,
                        "category": meta.category,
                        "subCategory": meta.subCategory,
                        "mname": meta.manufactureName,
                        "mwebsite": meta.manufactureWebsite
                    },
                    "description": desc,
                    "ingredients": ingredients
                };
                products.push(newProduct);
                acc(newProduct);
            }
            catch (err) {
                rej(err);
            }
        })
    }

    updateProduct(id, name, productPrice, offerPrice, image, desc, ingredients, meta, imageBuffer, faq, searchKeywords) {
        return new Promise((acc, rej) => {
            try {

                if (faq === undefined) {
                    faq = [];
                }

                id = parseInt(id);
                let idx = products.findIndex((v) => v.id === id);
                if (idx < 0) rej("Product doesnot exits with Id:" + id);

                if (imageBuffer !== undefined) {
                    fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
                }

                if (searchKeywords === undefined) {
                    searchKeywords = "";
                }

                let product = {
                    id: id,
                    "name": name,
                    "offerprice": parseFloat(offerPrice),
                    "price": parseFloat(productPrice),
                    "image": image,
                    "faq": faq, //Has to be int array always
                    "keywords": searchKeywords,
                    "meta": {
                        "code": meta.code,
                        "package_detail": meta.package_detail,
                        "serving_size": meta.serving_size,
                        "serving_per_container": meta.serving_per_container,
                        "shippingdetail": meta.shippingdetail,
                        "category": meta.category,
                        "subCategory": meta.subCategory,
                        "mname": meta.manufactureName,
                        "mwebsite": meta.manufactureWebsite
                    },
                    "description": desc,
                    "ingredients": ingredients
                };
                products[idx] = Object.assign({}, product);
                acc(product);
            }
            catch (err) {
                rej(err);
            }
        });
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