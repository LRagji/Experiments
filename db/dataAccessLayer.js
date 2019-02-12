let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
let users = [], FAQ = [];
let util = require('../modules/utilities');
let settings = require('./appsettings');
let orders = require('./orders').singleton(pgPool);
let banners = require('./banners').singleton();
let products = undefined;
let healthTopics = require('./healthtopics').singleton(pgPool);
let healthLinks = require('./healthlinks').singleton(pgPool);
let brands = require('./brands').singleton(pgPool);
let categories = require('./categories').singleton(pgPool);
let subCategories = require('./subcategories').singleton(pgPool);
let healthVideos = require('./healthvideos').singleton(pgPool);
let wishlist = require('./wishlist').singleton(pgPool);

// TODO:Call the appropiate API
class DAL {
    constructor(constantService) {

        this.const = constantService;
        products = require('./products').singleton(pgPool, this); //TODO kill this line it should be required in the top with only pgpool param.

        this.appSettings = settings.singleton(constantService, pgPool);
        this.orders = orders;
        this.products = products;
        this.banners = banners;
        this.healthTopics = healthTopics;
        this.healthLinks = healthLinks;
        this.brands = brands;
        this.categories = categories;
        this.subCategories = subCategories;
        this.healthVideos = healthVideos;
        this.wishlist = wishlist;



        //TODO: This binding list is not upto date
        this.pool = this.pool.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);//TODO:This can be update user call instead.
        this.getAllUsersPagedExcept = this.getAllUsersPagedExcept.bind(this);
        this.updateUserActivationState = this.updateUserActivationState.bind(this);
        this.updateUserAccountType = this.updateUserAccountType.bind(this);
        this.resetUserAccountPassword = this.resetUserAccountPassword.bind(this);
        this.createFAQ = this.createFAQ.bind(this);
        this.updateFAQ = this.updateFAQ.bind(this);
        this.deleteFAQ = this.deleteFAQ.bind(this);
        this.getAllFAQ = this.getAllFAQ.bind(this);
        this.getFAQ = this.getFAQ.bind(this);

        //TODO:Delete this mock data

        if (users.length === 0) {
            for (let i = 0; i < 50; i++) //7389 Total users
                users.push(
                    {
                        id: i,
                        salutation: "Mr",
                        first: i === 0 ? "Admin" : "Laukik",
                        last: i,
                        mobile: "123456789",
                        email: i === 0 ? "admin@gmail.com" : i + "@gmail.com",
                        password: "bc1f2f74f887ea16acee259f8c380ae8",
                        meta: {
                            "status": "active",
                            "type": i === 0 ? "admin" : "normal"
                        }
                    }
                );
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