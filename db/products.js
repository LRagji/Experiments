let fs = require('fs');

class Products {

    constructor(pgPool) {
        this.pgPool = pgPool;
        this.deleteProduct = this.deleteProduct;
        this.readProductById = this.readProductById.bind(this);
        this.readProducts = this.readProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.readAllProducts = this.readAllProducts.bind(this);
        this._fromProperties = this._fromProperties.bind(this);
        this._parseProductId = this._parseProductId.bind(this);
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

        return updatedProduct;

    }

    async deleteProduct(productId) {
        productId = this._parseProductId(productId);
        let insertQuery = "INSERT INTO products_archive SELECT * FROM products where id=$1";
        let deleteQuery = "Delete FROM products where id=$1";
        let client = await this.pgPool.connect()
        try {
            await client.query('BEGIN')
            let results = await client.query(insertQuery, [productId]);
            if (results.rowCount !== 1) throw new Error("Failed to move product to archive productid:" + productId);
            results = await client.query(deleteQuery, [productId]);
            if (results.rowCount !== 1) throw new Error("Failed to delete product from active records productid:" + productId);
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }

    async readProductById(productId) {
        productId = this._parseProductId(productId);

        let selectQuery = `select * from products where id=$1`;
        let response = await this.pgPool.query(selectQuery, [productId]);

        let fetchedProduct = undefined;
        if (response.rows.length === 1) {
            let row = response.rows[0];
            fetchedProduct = this._fromProperties(
                row.id,
                row.name,
                row.price,
                row.offerprice,
                row.imageName,
                row.description,
                row.ingredients,
                row.meta.code,
                row.meta.package_detail,
                row.meta.serving_size,
                row.meta.serving_per_container,
                row.meta.shippingdetail,
                row.meta.category,
                row.meta.subCategory,
                row.meta.mname,
                row.meta.mwebsite,
                row.faq,
                row.keywords);
        }

        return fetchedProduct;
    }

    async readAllProducts(pageNo, size, filter) {

        pageNo = parseInt(pageNo);
        size = parseInt(size);
        if (isNaN(pageNo)) throw new Error("Invalid parameter pageNo");
        if (isNaN(size)) throw new Error("Invalid parameter size");

        let startIndex = (pageNo * size);
        let argumentArray = [size, startIndex];

        let whereClause = "", orderClause = "";
        
        let propertyMap = {
            "mname": "meta->>'mname'"
        };

        let operatorMap = {
            "like": "like",
            "equal": "=",
            "greaterThan": ">",
            "lessThan": "<",
            "ascending": "asc",
            "descending": "desc"
        };

        Object.keys(filter).forEach((operator) => {

            switch (operator) {
                case 'equal':
                case 'greaterThan':
                case 'lessThan':
                    Object.keys(filter[operator]).forEach((operand) => {
                        whereClause += (whereClause === "" ? "" : " and ") + propertyMap[operand] + " " + operatorMap[operator] + " $" + (argumentArray.length + 1);
                        argumentArray.push(filter[operator][operand]);
                    });
                    break;
                case 'like':
                    Object.keys(filter[operator]).forEach((operand) => {
                        whereClause += (whereClause === "" ? "" : " and ") + " lower(" + propertyMap[operand] + ") " + operatorMap[operator] + " $" + (argumentArray.length + 1);
                        argumentArray.push("%" + filter[operator][operand].toLowerCase() + "%");
                    });
                    break;
                case 'ascending':
                case 'descending':
                    Object.keys(filter[operator]).forEach((operand) => {
                        orderClause += (orderClause === "" ? "" : " , ") + propertyMap[operand] + " " + operatorMap[operator];
                    });
                    break;
                default:
                    console.warn("New Operator found: " + operator)
                    break;
            }

        });

        let selectQuery = 'select * from products ' + (whereClause !== "" ? ('where ' + whereClause) : '') + (orderClause !== "" ? ('order by ' + orderClause) : ' order by id ') + ' limit $1 offset $2';
        let response = await this.pgPool.query(selectQuery, argumentArray);

        let fetchedProducts = [];
        response.rows.forEach(row => {
            fetchedProducts.push(this._fromProperties(
                row.id,
                row.name,
                row.price,
                row.offerprice,
                row.imageName,
                row.description,
                row.ingredients,
                row.meta.code,
                row.meta.package_detail,
                row.meta.serving_size,
                row.meta.serving_per_container,
                row.meta.shippingdetail,
                row.meta.category,
                row.meta.subCategory,
                row.meta.mname,
                row.meta.mwebsite,
                row.faq,
                row.keywords));
        });

        return fetchedProducts;
    }

    async readProducts(productIds) {

        productIds = productIds.map((id) => this._parseProductId(id));

        let selectQuery = `select * from products where id = ANY($1)`;
        let response = await this.pgPool.query(selectQuery, [productIds]);

        let fetchedProducts = [];
        response.rows.forEach(row => {
            fetchedProducts.push(this._fromProperties(
                row.id,
                row.name,
                row.price,
                row.offerprice,
                row.imageName,
                row.description,
                row.ingredients,
                row.meta.code,
                row.meta.package_detail,
                row.meta.serving_size,
                row.meta.serving_per_container,
                row.meta.shippingdetail,
                row.meta.category,
                row.meta.subCategory,
                row.meta.mname,
                row.meta.mwebsite,
                row.faq,
                row.keywords));
        });

        return fetchedProducts;
    }

    _parseProductId(productId) {
        productId = parseInt(productId);
        if (isNaN(productId)) throw new Error("Invalid Product Id");
        return productId;
    }

    _fromProperties(id, name, productPrice, offerPrice, image, desc, ingredients, code, package_detail, serving_size, serving_per_container, shippingdetail, category, subCategory, manufactureName, manufactureWebsite, faq, searchKeywords) {

        id = this._parseProductId(id);

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