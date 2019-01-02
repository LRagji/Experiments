let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
let orders = [], products = [], users = [], healthLinks = [], FAQ = [];
let util = require('../modules/utilities');
let fs = require('fs');
let reqMemC = require('../modules/cache');
let memC = new reqMemC();
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
        this.getAllUsersPagedExcept = this.getAllUsersPagedExcept.bind(this);
        this.updateUserActivationState = this.updateUserActivationState.bind(this);
        this.updateUserAccountType = this.updateUserAccountType.bind(this);
        this.resetUserAccountPassword = this.resetUserAccountPassword.bind(this);
        this.insertHealthLink = this.insertHealthLink.bind(this);
        this.updateHealthLink = this.updateHealthLink.bind(this);
        this.deleteHealthLink = this.deleteHealthLink.bind(this);
        this.getAllHealthLinks = this.getAllHealthLinks.bind(this);
        this.getHealthLinkContentFor = this.getHealthLinkContentFor.bind(this);
        this.createFAQ = this.createFAQ.bind(this);
        this.updateFAQ = this.updateFAQ.bind(this);
        this.deleteFAQ = this.deleteFAQ.bind(this);
        this.getAllFAQ = this.getAllFAQ.bind(this);
        this.getFAQ = this.getFAQ.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
        this.filterSubCategory = this.filterSubCategory.bind(this);
        this.filterKeywords = this.filterKeywords.bind(this);

        //TODO:Delete this mock data
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

        if (users.length === 0) {
            for (let i = 0; i < 50; i++) //7389 Total users
                users.push(
                    {
                        id: i,
                        salutation: "Mr",
                        first: "Laukik",
                        last: i,
                        mobile: "123456789",
                        email: i === 0 ? "Laukik.Ragji@gmail.com" : i + "@gmail.com",
                        password: "81d7df2cd5d931a654f48a43a8442d5d",
                        meta: {
                            "status": "active",
                            "type": i === 0 ? "admin" : "normal"
                        }
                    }
                );
        }

        if (orders.length === 0) {
            for (let i = 0; i < 1; i++)
                orders.push({
                    "userId": 1,
                    "date": 1545477745147,
                    "status": "Awaiting Payment",
                    "products": [
                        { "productId": 14, "quantity": 1, "offerprice": 100 / i },
                        { "productId": 13, "quantity": 1, "offerprice": 10 * i },
                        { "productId": i, "quantity": 1, "offerprice": 10 / i },
                        { "productId": 12, "quantity": 1, "offerprice": 100 * i }
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

        if (healthLinks.length === 0) {
            for (let i = 0; i < 1;)
                this.insertHealthLink("Link " + i, "Random html text for link " + i).then(i++);
        }

        if (FAQ.length === 0) {
            for (let i = 0; i < 1;)
                this.createFAQ("Who am i ?" + i, "I am your friendly neighbourhood spider man." + i).then(i++);
        }
    }

    pool() {
        return pgPool;
    }
    // START Product FAQ

    async createFAQ(question, answer) {
        return new Promise((acc, rej) => {
            try {
                let FAQObject = {
                    id: FAQ.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0) + 1,
                    Q: question,
                    A: answer
                };
                FAQ.push(FAQObject);
                acc(Object.assign({}, FAQObject));
            }
            catch (ex) {
                rej(ex);
            }
        })
    }

    async updateFAQ(id, question, answer) {
        return new Promise((acc, rej) => {
            try {
                let faqIdx = FAQ.findIndex((q) => q.id === id);
                if (faqIdx < 0) throw new Error("FAQ " + name + " doesnot exists.");
                FAQ[faqIdx].Q = question;
                FAQ[faqIdx].A = answer;
                acc(Object.assign({}, FAQ[faqIdx]));
            }
            catch (ex) {
                rej(ex);
            }
        })
    }

    async deleteFAQ(id) {
        return new Promise((acc, rej) => {
            try {
                let faqIdx = FAQ.findIndex((q) => q.id === id);
                if (faqIdx < 0) throw new Error("FAQ " + name + " doesnot exists.");
                FAQ.splice(faqIdx, 1);
                acc();
            }
            catch (ex) {
                rej(ex);
            }
        })
    }

    async getFAQ(id) {
        return new Promise((acc, rej) => {
            try {
                let faqIdx = FAQ.findIndex((q) => q.id === id);
                if (faqIdx < 0) throw new Error("FAQ " + getFAQ + " doesnot exists.");
                acc(Object.assign({}, FAQ[faqIdx]));
            }
            catch (ex) {
                rej(ex);
            }
        })
    }

    async getAllFAQ() {
        return new Promise((acc, rej) => {
            try {
                let results = [];
                FAQ.forEach((faq) => {
                    results.push(Object.assign({}, faq));
                })
                acc(results);
            }
            catch (ex) {
                rej(ex);
            }
        })
    }
    // END Product FAQ


    //START Health Links
    async getHealthLinksIndex() {

        if (!memC.hasData()) {
            console.log("Cache miss for Health Links");
            let allIndexes = await this.getAllHealthLinks();
            allIndexes.forEach(kvp => {
                memC.insert(kvp.name, kvp.url);
            });
        }

        return memC.fetchAllKeyValuePairs((k, v) => { return { "name": k, "link": v } });
    }

    async getAllHealthLinks() {
        return new Promise((acc, rej) => {
            try {
                acc(healthLinks);
            } catch (err) {
                rej(err);
            }
        });
    }

    async insertHealthLink(name, contents) {
        return new Promise((acc, rej) => {
            try {

                if (healthLinks.find((l) => l.name === name) !== undefined) throw new Error(name + " name already exists.");
                let healthLinkObj = {
                    "name": name,
                    "url": "/healthLinks?id=" + encodeURIComponent(name),
                    "contents": contents
                };
                healthLinks.push(healthLinkObj);

                memC.insert(healthLinkObj.name, healthLinkObj.url);

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    async deleteHealthLink(name) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinks.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");

                healthLinks.splice(dbHealthLinkIdx, 1);

                memC.delete(name);

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    async updateHealthLink(name, contents) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinks.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");

                healthLinks[dbHealthLinkIdx].contents = contents;

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    async getHealthLinkContentFor(name) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinks.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");
                acc(Object.assign({}, healthLinks[dbHealthLinkIdx]));
            } catch (err) {
                rej(err);
            }
        })
    }
    // END Health Links

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
                console.log(newProduct);
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

    saveBanners(banner1Buff, banner2Buff, banner3Buff) {
        return new Promise((acc, rej) => {
            try {
                if (banner1Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner1.jpg', banner1Buff);
                }
                if (banner2Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner2.jpg', banner2Buff);
                }
                if (banner3Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner3.jpg', banner3Buff);
                }
                acc();
            }
            catch (err) {
                rej(err);
            }
        });
    }

    // Users
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
                        "type": "normal",
                        "status": "active"
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

    getUserByEmail(email) {
        return new Promise((acc, rej) => {
            try {
                acc(users.find((u) => u.email.toLowerCase() === email.toLowerCase()));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    getAllUsersPagedExcept(pageNo, size, userId) {
        return new Promise((acc, rej) => {
            try {
                let startIndex = (pageNo * size);
                let endIndex = (startIndex + size);
                let fetchStart = 0, fetchLength = 0;

                if (users.length < startIndex && users.length < endIndex) {
                    fetchStart = 0;
                    fetchLength = 0;
                }

                else if (users.length > startIndex && users.length < endIndex) {
                    fetchStart = startIndex;
                    fetchLength = (users.length - startIndex);
                }

                else if (users.length > startIndex && users.length > endIndex) {
                    fetchStart = startIndex;
                    fetchLength = size;
                }

                let responseArray = [];
                while (fetchLength > 0) {
                    let user = users[(fetchStart + fetchLength)];
                    if (user !== undefined && userId !== user.id) {
                        responseArray.push(Object.assign({}, user));
                    }
                    fetchLength--;
                }

                acc(responseArray);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    updateUserActivationState(userId, status) {
        return new Promise((acc, rej) => {
            try {
                let user = users.find((u) => u.id === userId);
                if (user !== undefined) {
                    user.meta.status = status;
                    acc();
                }
                else {
                    rej(new Error("User with id" + userId + " not found."));
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }

    updateUserAccountType(userId, accountType) {
        return new Promise((acc, rej) => {
            try {
                let user = users.find((u) => u.id === userId);
                if (user !== undefined) {
                    user.meta.type = accountType;
                    acc();
                }
                else {
                    rej(new Error("User with id" + userId + " not found."));
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }

    resetUserAccountPassword(userId) {
        return new Promise((acc, rej) => {
            try {
                let user = users.find((u) => u.id === userId);
                if (user !== undefined) {
                    user.password = util.getHash("P@55word");
                    acc();
                }
                else {
                    rej(new Error("User with id" + userId + " not found."));
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }
    //End Users
}

module.exports = DAL;