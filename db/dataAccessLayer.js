let pg = require('pg')
let pgPool = new pg.Pool({ user: 'postgres', host: 'localhost', database: 'Experimental', password: 'P@55word', port: 5432, });
let orders = [], products = [], users = [];
let hash = require('object-hash');
// TODO:Call the appropiate API
class DAL {
    constructor() {
        this.getProductById = this.getProductById.bind(this);
        this.pool = this.pool.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);

        //TODO:Delete this mock data
        if (products.length === 0) {
            for (let i = 0; i < 20; i++) {
                products.push({
                    "id": i,
                    "name": "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veggi " + i,
                    "offerprice": (parseFloat(i) * 100.00),
                    "price": (parseFloat(i) * 100.00 + 1000.00),
                    "image": "Product2.jpg",
                    "shippingdetail": "Ships in " + i + " days."

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
        order.id = orders.length + 1;
        orders.push(order);
        return order.id;
    }

    getOrderById(orderId) {
        return orders.find((e) => e.id === orderId);
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
                    password: hash(password, { algorithm: 'md5' }),
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
}

module.exports = DAL;