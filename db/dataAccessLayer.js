let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
let users = [], healthLinks = [], FAQ = [];
let util = require('../modules/utilities');
let fs = require('fs');
let reqMemC = require('../modules/cache');
let memC = new reqMemC();
let settings = require('./appSettings');
let orders = require('./orders').singleton();
let products = require('./products').singleton();

// TODO:Call the appropiate API
class DAL {
    constructor(constantService) {

        this.const = constantService;

        this.appSettings = settings.singleton(constantService);
        this.orders = orders;
        this.products = products;

        //TODO: This binding list is not upto date
        this.pool = this.pool.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);//TODO:This can be update user call instead.
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
       
        //TODO:Delete this mock data
        
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