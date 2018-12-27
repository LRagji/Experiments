let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
let orders = [], products = [], users = [];
let util = require('../modules/utilities');
let fs = require('fs');
// TODO:Call the appropiate API
class DAL {
    constructor() {
        //TODO: This binding list is not upto date
        this.getProductById = this.getProductById.bind(this);
        this.pool = this.pool.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);//TODO:This can be update user call instead.
        this.deleteProduct = this.deleteProduct;

        //TODO:Delete this mock data
        if (products.length === 0) {
            for (let i = 0; i < 1; i++) {
                products.push({
                    "id": i,
                    "name": "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veg " + i,
                    "offerprice": (parseFloat(i) * 100.00),
                    "price": (parseFloat(i) * 100.00 + 1000.00),
                    "image": "default.jpg",
                    "meta": {
                        "code": "C" + i.toString(),
                        "package_detail": "180 Softgels",
                        "serving_size": "1 Softgels",
                        "serving_per_container": "This bottle will last 180 days.",
                        "shippingdetail": i + 1,
                        "category": "Category" + i.toString(),
                        "subCategory": "Sub Category" + i.toString(),
                        "mname": "NOW FOODS",
                        "mwebsite": "https://www.health-mall.in"
                    },
                    "description": '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
                    "ingredients": '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>'
                })
            }
        }

        if (users.length === 0) {
            users.push(
                {
                    id: 1,
                    salutation: "Mr",
                    first: "Laukik",
                    last: "R",
                    mobile: "123456789",
                    email: "Laukik.Ragji@gmail.com",
                    password: "81d7df2cd5d931a654f48a43a8442d5d",
                    meta: {
                        "type": "admin"
                    }
                }
            );
        }


        if (orders.length === 0)
        for (let i = 0; i < 51; i++)
            orders.push({
                "userId": 1,
                "date": 1545477745147,
                "status": "Awaiting Payment",
                "products": [
                    { "productId": 14, "quantity": 1, "offerprice": 100/i },
                    { "productId": 13, "quantity": 1, "offerprice": 10*i },
                    { "productId": i, "quantity": 1, "offerprice": 10/i },
                    { "productId": 12, "quantity": 1, "offerprice": 100*i }
                ],
                "shippingDetails": {
                    "billing": {
                        "bSalutation": "Mr.",
                        "bFirstName": "Laukik",
                        "bLastName": "Ragji",
                        "bAdd1": "Add1",
                        "bAdd2": "Add2",
                        "bAdd3": "Add3",
                        "bCity": "Mumbai",
                        "bPincode": "400093",
                        "bState": "Jammu & Kashmir",
                        "bMobile": "9819569622"
                    },
                    "shipping": {
                        "sSalutation": "Mr.",
                        "sFirstName": "Laukik",
                        "sLastName": "Ragji",
                        "sAdd1": "Add1",
                        "sAdd2": "Add2",
                        "sAdd3": "Add3",
                        "sCity": "Mumbai",
                        "sPincode": "400093",
                        "sState": "Jammu & Kashmir",
                        "sMobile": "9819569622"
                    }
                },
                "payment": {
                    "type": "cheque",
                    "no": "335562",
                    "date": "2018-12-22",
                    "bank name": "Hello Bank",
                    "bank branch": "Some Branch",
                    "deposited bank": "Canara",
                    "amount": "5000"
                },
                "id": i
            });
    }

    pool() {
        return pgPool;
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

    getAllProducts(pageNo, size) {
        return new Promise((acc, rej) => {

            let startIndex = (pageNo * size);
            let endIndex = (startIndex + size);
            let fetchStart = 0, fetchLength = 0;

            if (products.length < startIndex && products.length < endIndex) {
                fetchStart = 0;
                fetchLength = 0;
            }

            else if (products.length > startIndex && products.length < endIndex) {
                fetchStart = startIndex;
                fetchLength = (products.length - startIndex);
            }

            else if (products.length > startIndex && products.length > endIndex) {
                fetchStart = startIndex;
                fetchLength = size;
            }

            let productsClone = Array.from(products);
            acc(productsClone.splice(fetchStart, fetchLength));
            return;
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

    getUserByEmail(email) {
        return new Promise((acc, rej) => {
            acc(users.find((u) => u.email.toLowerCase() === email.toLowerCase()));
        });
    }

    createOrder(order) {
        //TODO:Compare order amount with calculated product amount from all products.
        console.log(order);
        if (order.hasOwnProperty("state")) delete order.state;
        order.date = Date.now();
        order.status = "Awaiting Payment";
        order.id = orders.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0) + 1;
        orders.push(order);
        return order.id;
    }

    getOrderById(orderId) {
        return new Promise((acc, rej) => {
            try {
                //TODO:Remove object Assign which is used to keep the array safe and clone the element
                acc(Object.assign({}, orders.find((e) => e.id === orderId)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    createUser(salutation, firstName, lastName, mobile, email, password) {
        return new Promise((acc, rej) => {
            try {
                let newUser = {
                    id: users.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0) + 1,
                    salutation: salutation,
                    first: firstName,
                    last: lastName,
                    mobile: mobile,
                    email: email,
                    password: util.getHash(password),
                    meta: {
                        "type": "normal"
                    }
                }
                users.push(newUser);
                acc(newUser);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    updateUserPassword(userId, password) {
        return new Promise((acc, rej) => {
            let exisitingUser = users.find((e) => e.id === userId);
            if (exisitingUser !== undefined) {
                exisitingUser.password = util.getHash(password);
                acc(exisitingUser);
            }
            else {
                rej(new Error("Cannot find user with id:" + userId));
            }
        });
    }

    saveProduct(name, productPrice, offerPrice, image, desc, ingredients, meta, imageBuffer) {
        return new Promise((acc, rej) => {
            try {
                if (imageBuffer !== undefined) {
                    fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
                }

                let newProduct = {
                    id: products.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0) + 1,
                    "name": name,
                    "offerprice": parseFloat(offerPrice),
                    "price": parseFloat(productPrice),
                    "image": image,
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
                console.log(newProduct);
            }
            catch (err) {
                rej(err);
            }
        })
    }

    updateProduct(id, name, productPrice, offerPrice, image, desc, ingredients, meta, imageBuffer) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = products.findIndex((v) => v.id === id);
                if (idx < 0) rej("Product doesnot exits with Id:" + id);
                if (imageBuffer !== undefined) {
                    fs.writeFileSync('static/resources/images/products/' + image, imageBuffer);
                }
                let product = {
                    id: id,
                    "name": name,
                    "offerprice": parseFloat(offerPrice),
                    "price": parseFloat(productPrice),
                    "image": image,
                    "meta": {
                        "code": meta.code,
                        "package_detail": meta.package_detail,
                        "serving_size": meta.serving_size,
                        "serving_per_container": meta.serving_per_container,
                        "shippingdetail": meta.shippingdetail,
                        "category": meta.category,
                        "subCategory": meta.subCategory,
                        "mname": meta.mname,
                        "mwebsite": meta.mwebsite
                    },
                    "description": desc,
                    "ingredients": ingredients
                };
                products[idx] = Object.assign({}, product);
                acc(product);
                console.log(product);
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

    getTopOrdersForUser(userId, topSize) {
        return new Promise((acc, rej) => {
            try {
                let userOrders = [];
                orders.forEach((order) => {
                    if (order.userId === userId && userOrders.length < topSize)
                        userOrders.push(Object.assign({}, order));
                });
                acc(userOrders);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}

module.exports = DAL;