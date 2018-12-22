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
        this.createUser = this.createUser.bind(this);

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