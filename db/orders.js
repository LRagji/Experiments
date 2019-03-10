let eType = require('backend-entity').entity;
class Orders {

    constructor(pgPool) {

        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.getTopOrdersForUser = this.getTopOrdersForUser.bind(this);
        this.computeTotalPrice = this.computeTotalPrice.bind(this);
        this.updateOrderStatusAndPayment = this.updateOrderStatusAndPayment.bind(this);
        this.orderStatuses = {
            "awaitingPayment": "Awaiting Payment",
            "paymentReceived": "Payment Received"
        };

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
        order.status = this.orderStatuses.awaitingPayment;
        let createdOrder = await this._entity.createEntity(order);
        return createdOrder.id;
    }

    async getOrderById(orderId) {
        return await this._entity.readEntitiesById(orderId);
    }

    async updateOrderStatusAndPayment(order) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", order.id);
        this._entity.updateEntity({
            "status": order.status,
            "payment": order.payment
        }, filter);
    }

    async getTopOrdersForUser(userId, topSize) {

        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "userId", userId);
        let ordersForCurrentUser = await this._entity.readPaginatedEntities(0, topSize, filter);
        return ordersForCurrentUser.results;
    }

    computeTotalPrice(order) {
        return order.products.reduce((acc, ele) => acc + (ele.offerprice * ele.quantity), 0)
    }

}

module.exports = Orders;