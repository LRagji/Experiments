let securePage = require('../../modules/securePage')
let Razorpay = require('razorpay');
var gateway = new Razorpay({ key_id: process.env.RAZORID, key_secret: process.env.RAZOR, });

class pageGateway extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);
        this.templateForBlockedPayment = this.templateForBlockedPayment.bind(this);
        this.templateForFailedPayment = this.templateForFailedPayment.bind(this);
        this.templateForPayment = this.templateForPayment.bind(this);
        this.validateSucessPayment = this.validateSucessPayment.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/gateway', this.safeRender(this.renderSuccess));
        server.post(basePath + '/gateway', this.safeRender(this.validateSucessPayment))
    }

    async renderSuccess(req, renderView, renderRedirect) {
        if (req.query.oid !== undefined) {
            let orderId = parseInt(req.query.oid, 10);
            let order = await this.dal.orders.getOrderById(orderId);

            if (order === undefined || (order.userId !== req.user.id)) {
                renderRedirect('/cart');
                return;
            }

            if (order.status !== this.dal.orders.orderStatuses.awaitingPayment) {
                renderView('../pages/secure/gateway', { template: this.templateForBlockedPayment(order.id) });
                return;
            }

            if (this.dal.orders.computeTotalPrice(order) <= 0) {
                renderView('../pages/secure/gateway', { template: this.templateForBlockedPayment(order.id) });
                return;
            }

            let pageData = {};
            pageData.template = this.templateForPayment(order, req.user);
            renderView('../pages/secure/gateway', pageData);
        }
        else {
            renderRedirect('/cart');
        }
    }

    async validateSucessPayment(req, renderView, renderRedirect) {
        //Check if the value of order is correct with razor pay and then only capture the payment.
        //If payment is sucessfull then capture payment else donot in which case razor pay will auto-refund after 5 days.
        //TODO:Save transaction in table with current logged in userid and time.

        if (req.body.razorpay_payment_id === undefined) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(-1, "Invalid or no payment id was present.") });
            return;
        }

        let currentPayment = await gateway.payments.fetch(req.body.razorpay_payment_id);

        if (currentPayment === undefined) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(req.body.oid, "Cannot find payment in the system.") });
            return;
        }

        if (req.body.oid === undefined) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(-1, "Invalid or no order id present.") });
            return;
        }

        let orderId = parseInt(req.body.oid, 10);
        let order = await this.dal.orders.getOrderById(orderId);

        if (order === undefined) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(req.body.oid, "Cannot find order in the system.") });
            return;
        }

        if (order.userId !== req.user.id) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(order.id, "User doesnot match with user who made this order.") });
            return;
        }

        let totalPrice = this.dal.orders.computeTotalPrice(order);

        if (totalPrice <= 0) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(order.id, "Invalid order price, order cannot be processed.") });
            return;
        }

        if ((totalPrice * 100) !== currentPayment.amount) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(order.id, "Order total amount doesnot match the paid amount.") });
            return;
        }

        if (currentPayment.captured !== false) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(order.id, "Payment was already processed.") });
            return;
        }

        let capturePayment = await gateway.payments.capture(currentPayment.id, currentPayment.amount, currentPayment.currency)

        if (capturePayment.captured === false) {
            renderView('../pages/secure/gateway', { template: this.templateForFailedPayment(order.id) }, "Payment cannot be processed/captured.");
            return;
        }

        order.status = this.dal.orders.orderStatuses.paymentReceived;
        order.payment[capturePayment.id] = capturePayment;
        this.dal.orders.updateOrderStatusAndPayment(order);

        renderRedirect('/secure/success?oid=' + order.id);
    }

    templateForBlockedPayment(orderNumber) {
        return `<h3>Order #${orderNumber}</h3>
        <p>Payment against order number ${orderNumber} cannot be made as it is blocked/already paid. Please contact support for additional information please refer the order number for faster processing of queries.</p>`;
    }

    templateForPayment(order, user) {
        let tottalPrice = this.dal.orders.computeTotalPrice(order);
        let tottalQuantities = order.products.reduce((acc, ele) => acc + ele.quantity, 0);
        return `    <h3>Order #${order.id}</h3>
        <p>Awaiting payment form user. if you donot see payment screen automatically please click on pay now button below.</p>
         <form id="payform" action="/secure/gateway" method="POST">
            <script
                src="https://checkout.razorpay.com/v1/checkout.js"
                data-key="${process.env.RAZORID}"
                data-amount="${ tottalPrice * 100}"
                data-buttontext="Pay Now"
                data-name="Health Mall"
                data-description="Purchasing ${order.products.length} items with total quantity ${tottalQuantities} for &#8377; ${tottalPrice}."
                data-image="../static/resources/images/logo.png"
                data-prefill.name="${user.first + ' ' + user.last}"
                data-prefill.email="${user.email}"
                data-prefill.contact="${user.mobile}"
                data-notes.userid="${user.id}"
                data-notes.orderid="${order.id}"
                data-theme.color="#5cb85c"
            ></script>
            <input type="hidden" value="${order.id}" name="oid">
        </form>
    <script>
        document.querySelector("input[value='Pay Now']").click()
    </script>`;
    }

    templateForFailedPayment(orderNumber, detail) {
        return `<h3>Payment Failed!!</h3>
        <p>Payment against order number ${orderNumber} has failed!. Please contact support for additional information please refer the order number for faster processing of queries.</p><br/><small>System:${detail}</small>`;
    }

}

module.exports = pageGateway;