let pg = require('pg')
let pgPool = new pg.Pool({ user: 'postgres', host: 'localhost', database: 'Experimental', password: 'P@55word', port: 5432, });
let orders = [], products = [], users = [];
let util = require('../modules/utilities');
// TODO:Call the appropiate API
class DAL {
    constructor() {
        this.getProductById = this.getProductById.bind(this);
        this.pool = this.pool.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);//TODO:This can be update user call instead.

        //TODO:Delete this mock data
        if (products.length === 0) {
            for (let i = 0; i < 20; i++) {
                products.push({
                    "id": i,
                    "name": "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veggi " + i,
                    "offerprice": (parseFloat(i) * 100.00),
                    "price": (parseFloat(i) * 100.00 + 1000.00),
                    "image": "Product2.jpg",
                    "meta": {
                        "code": "C" + i.toString(),
                        "package_detail": "180 Softgels",
                        "serving_size": "1 Softgels",
                        "serving_per_container": "This bottle will last 180 days.",
                        "shippingdetail": "Ships in " + i + " days.",
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
            orders.push({
                "userId": 1,
                "date": 1545477745147,
                "status": "Awaiting Payment",
                "products": [
                    { "productId": 14, "quantity": 1 },
                    { "productId": 13, "quantity": 1 },
                    { "productId": 15, "quantity": 1 },
                    { "productId": 12, "quantity": 1 }
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
                "id": 1
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
            var product = products.find((p) => p.id === validatedProductid);
            acc(product);
        });
    }

    getAllProducts(pageNo, size) {
        return new Promise((acc, rej) => {
            if (products.length < (pageNo * size)) {
                acc([]);
            }
            else {
                let productsClone = Array.from(products);
                acc(productsClone.splice(pageNo === 0 ? 0 : ((pageNo * size) - size), size));
            }
        });
    }

    getProducts(ids) {
        return new Promise((acc, rej) => {

            let result = [];
            ids.forEach(id => {
                let x = products.find((p) => p.id === id);
                if (x !== undefined) result.push(x);
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

    saveProduct(name, productPrice, offerPrice, image, desc, ingredients, meta) {
        return new Promise((acc, rej) => {
            try {
                //TODO:Save Image on Server
                acc({
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
                        "shippingdetail": "Ships in " + meta.shippingdetail + " days.",
                        "category": meta.category,
                        "subCategory": meta.subCategory,
                        "mname": meta.manufactureName,
                        "mwebsite": meta.manufactureWebsite
                    },
                    "description": desc,
                    "ingredients": ingredients
                })
            }
            catch (err) {
                rej(err);
            }
        })
    }
}

module.exports = DAL;