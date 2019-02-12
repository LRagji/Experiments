let orders = [];
let eType = require('backend-entity').entity;
class Orders {

    constructor(pgPool) {

        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.getTopOrdersForUser = this.getTopOrdersForUser.bind(this);

        let propertyMap = {
            "id": "id",
            "userId": '"userId"',
            "date": "date",
            "status": "status",
            "tax": "tax",
            "products": "products",
            "shippingDetails": '"shippingDetails"',
            "payment": "payment"
        };

        this._entity = new eType("orders", propertyMap, pgPool);


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
                            "bGstin": "123456789012345"
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
                            "sGstin": "123456789012345"
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

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new Orders(pgPool);
        }
        return this.instance;
    }

    async createOrder(order) {
        //TODO:Compare order amount with calculated product amount from all products.
        if (order.hasOwnProperty("state")) delete order.state;
        order.date = Date.now();
        order.status = "Awaiting Payment";
        let createdOrder = await this._entity.createEntity(order);
        return createdOrder.id;
    }

    async getOrderById(orderId) {
        return await this._entity.readEntitiesById(orderId);
    }

    async getTopOrdersForUser(userId, topSize) {

        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "userId", userId);
        let ordersForCurrentUser = await this._entity.readPaginatedEntities(0, topSize, filter);
        return ordersForCurrentUser.results;
    }

}

module.exports = Orders;