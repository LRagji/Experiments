let orders = [];

class Orders {


    constructor() {

        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.getTopOrdersForUser = this.getTopOrdersForUser.bind(this);


        if (orders.length === 0) {
            for (let i = 0; i < 1; i++)
                orders.push({
                    "userId": 0,
                    "date": 1545477745147,
                    "status": "Awaiting Payment",
                    "tax": 20,
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
                            "bMobile": "9819569622",
                            "bGstin":"123456789012345"
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
                            "sMobile": "9819569622",
                            "sGstin":"123456789012345"
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
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new Orders();
        }
        return this.instance;
    }

    createOrder(order) {
        //TODO:Compare order amount with calculated product amount from all products.
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
                let order = orders.find((e) => e.id === orderId);
                if (order !== undefined)
                    acc(Object.assign({}, order));
                else
                    acc();
            }
            catch (ex) {
                rej(ex);
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

module.exports = Orders;