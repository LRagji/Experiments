let page = require('../modules/page')
class pageCart extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderCart = this.renderCart.bind(this);
        this.processCart = this.processCart.bind(this);
        this.manipulateProductsInCart = this.manipulateProductsInCart.bind(this);
        this.fillShippingDetails = this.fillShippingDetails.bind(this);
        this.clearShoppingCartSession = this.clearShoppingCartSession.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/cart', this.safeRender(this.renderCart));
        server.post('/cart', this.safeRedirect(this.processCart));
        server.post('/cart/items', this.safeRedirect(this.manipulateProductsInCart))
    }

    async renderCart(req, renderView) {

        let pageData = {};

        pageData[this.const.state] = req.session.locked === undefined ? undefined : req.session.locked.state;
        pageData[this.const.shoppingCartProducts] = [];
        pageData[this.const.shoppingInfo] = undefined;

        if (req.session.products === undefined) {
            req.session.products = [];
        }

        let productIds = req.session.products.map(ele => ele.productId);
        let productInfo = await this.dal.products.readProducts(productIds);

        productInfo.map(p => p.quantity = req.session.products.find(ele => ele.productId === p.id).quantity);
        productIds.forEach(pid => {
            let product = productInfo.find((p) => p.id === pid);
            let productKVP = req.session.products.find(ele => ele.productId === pid);
            if (product === undefined) {
                {
                    //Product is deleted? then remove it from cart.
                    this.util.subtractProductOrQuantityToCartItem(req, productKVP.productId, (productKVP.quantity + 1));
                }
            }
            else {
                if (productKVP.offerprice !== product.offerprice) productKVP.offerprice = product.offerprice;  //Check if the cart has updated offer price. TODO:Move this to dal or utilities if possible as it is session manupilation.
                product.quantity = productKVP.quantity;//Set quantity in product info
            }
        });

        pageData[this.const.shoppingCartProducts] = productInfo;
        if (req.session.locked !== undefined && req.session.locked.state === 2) {
            pageData[this.const.shoppingInfo] = req.session.locked;
        }

        if (req.session.locked !== undefined) pageData[this.const.taxSettingsKey] = req.session.locked.tax;

        pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
        renderView('../pages/cart', pageData);
    }

    async processCart(req, renderRedirect) {

        let redirectPage = "/cart";
        if (req.body.state !== undefined) {
            //User needs to login to process any state
            if (req.user === undefined) {
                req.session.returnTo = req.originalUrl;
                renderRedirect("/secure/login");
                return;
            }

            switch (req.body.state) {
                case "1":
                    if (req.session.locked !== undefined) throw new Error("This session is already under a checkout process on some other device.");
                    if (this.util.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
                    req.session.locked = {
                        "userId": req.user.id,
                        "state": 1,
                        "products": req.session.products,
                        "tax": await this.dal.appSettings.readSetting(this.const.taxSettingsKey)
                    }
                    break;

                case "2":
                    //TODO:Server side data input validations
                    if (req.session.locked === undefined) throw new Error("This session may have been cancelled on other device.");
                    if (this.util.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
                    if (req.session.locked.userId !== req.user.id) throw new Error("This user cannot checkout cart for other user.");
                    if (req.session.locked.state !== 1) throw new Error("Please complete your order on previous step.");

                    let copyBillingInfo = req.body.chkSameAsBilling === undefined ? false : true;
                    let shippingDetails = { billing: {}, shipping: {} };

                    this.fillShippingDetails(req.body, copyBillingInfo, "Salutation", shippingDetails, (value) => this.util.validateIsInOptions(value, this.const.salutations));
                    this.fillShippingDetails(req.body, copyBillingInfo, "FirstName", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "LastName", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "Add1", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "Add2", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "Add3", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "City", shippingDetails, (value) => this.util.validateLength(value, 50, 1));
                    this.fillShippingDetails(req.body, copyBillingInfo, "Pincode", shippingDetails, (value) => this.util.validateIsPostcode(value));
                    this.fillShippingDetails(req.body, copyBillingInfo, "State", shippingDetails, (value) => this.util.validateIsInOptions(value, this.const.states));
                    this.fillShippingDetails(req.body, copyBillingInfo, "Mobile", shippingDetails, (value) => this.util.validateMobilePhone(value));

                    req.session.locked.shippingDetails = shippingDetails;
                    req.session.locked.state = 2;
                    break;

                case "3":
                    if (req.session.locked === undefined) throw new Error("This session may have been cancelled on other device.");
                    if (this.util.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
                    if (req.session.locked.userId !== req.user.id) throw new Error("This user cannot checkout cart for other user.");
                    if (req.session.locked.state !== 2) throw new Error("Please complete your order on previous step.");

                    if (req.body.cancel === undefined) throw new Error("Invalid or incomplete request, parameter cancel missing.");
                    if (req.body.paymentMode === undefined) throw new Error("Invalid or incomplete request, parameter payment mode missing.");
                    if (req.body.amount === undefined) throw new Error("Invalid or incomplete request, parameter amount missing.");

                    if (req.body.cancel === "true") {
                        this.clearShoppingCartSession(req);
                    }
                    else {
                        //TODO:Server side data input validations
                        let orderId = undefined;
                        let endDate = new Date();
                        let startDate = new Date();
                        switch (req.body.paymentMode) {

                            case "cheque":
                                endDate = new Date();
                                startDate = new Date();
                                endDate.setDate(endDate.getDate() + 2); //Time windows is current + 2 days.
                                startDate.setDate(endDate.getDate() - 10); //Time windows is (current +2)-10) days .

                                if (this.util.validateLength(req.body.chequeChequeNo, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeChequeNo");
                                if (this.util.validateIsDateBetween(req.body.chequeDate, startDate, endDate) === false) throw new Error("Incomplete or Invalid request for parameter:chequeDate");
                                if (this.util.validateLength(req.body.chequeBankName, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeBankName");
                                if (this.util.validateLength(req.body.chequeBankBranch, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeBankBranch");
                                if (this.util.validateIsInOptions(req.body.chequeDepositedBank, this.const.bankAccounts) === false) throw new Error("Incomplete or Invalid request for parameter:chequeDepositedBank");
                                if (req.body.chequeDeclaration === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeDeclaration");

                                req.session.locked.payment = {
                                    "type": req.body.paymentMode,
                                    "no": req.body.chequeChequeNo,
                                    "date": req.body.chequeDate,
                                    "bank name": req.body.chequeBankName,
                                    "bank branch": req.body.chequeBankBranch,
                                    "deposited bank": req.body.chequeDepositedBank,
                                    "amount": req.body.amount
                                }

                                orderId = this.dal.orders.createOrder(req.session.locked);
                                this.clearShoppingCartSession(req);
                                redirectPage = '/secure/success?oid=' + orderId; //TODO:Confirm if these are right page links
                                break;

                            case "bankTransfer":
                                endDate = new Date();
                                startDate = new Date();
                                endDate.setDate(endDate.getDate() + 2); //Time windows is current + 2 days.
                                startDate.setDate(endDate.getDate() - 10); //Time windows is (current +2)-10) days .

                                if (this.util.validateLength(req.body.bankTransferRefNo, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:bankTransferRefNo");
                                if (this.util.validateIsDateBetween(req.body.bankTransferDate, startDate, endDate) === false) throw new Error("Incomplete or Invalid request for parameter:bankTransferDate");
                                if (req.body.bankTransferDeclaration === undefined) throw new Error("Incomplete or Invalid request for parameter:bankTransferDeclaration");

                                req.session.locked.payment = {
                                    "type": req.body.paymentMode,
                                    "txnno": req.body.bankTransferRefNo,
                                    "date": req.body.bankTransferDate,
                                    "amount": req.body.amount
                                }

                                orderId = this.dal.orders.createOrder(req.session.locked);
                                this.clearShoppingCartSession(req);
                                redirectPage = '/secure/success?oid=' + orderId; //TODO:Confirm if these are right page links
                                break;

                            case "gateway":
                                if (req.body.gatewayDeclaration === undefined) throw new Error("Incomplete or Invalid request for parameter:gatewayDeclaration");

                                req.session.locked.payment = {
                                    "type": req.body.paymentMode,
                                    "amount": req.body.amount
                                }

                                orderId = this.dal.orders.createOrder(req.session.locked);
                                this.clearShoppingCartSession(req);
                                redirectPage = '/secure/gateway?oid=' + orderId; //TODO:Confirm if these are right page links
                                break;

                            default:
                                throw new Error("Invalid or incomplete request, unknown pyament mode:" + req.body.payment);
                        }
                    }
                    break;
                default:
                    throw new Error("Invalid or incomplete request, unknown state parameter:" + req.body.state);
            }
            renderRedirect(redirectPage);
            return;
        }
        else {
            throw new Error("Invalid Request:Invalid or Missing State Info")
        }
    }

    clearShoppingCartSession(req) {
        delete req.session.locked;
    }

    fillShippingDetails(body, copyBillingInfo, propertyName, shippingDetails, validationFunction) {
        const ship = "s";
        const bill = "b";
        if (validationFunction(body[bill + propertyName]) === false) throw new Error("Invalid or Incomplete request, billing " + propertyName + " parameter.");
        if (copyBillingInfo === false && validationFunction(body[ship + propertyName]) === false) throw new Error("Invalid or Incomplete request, shipping " + propertyName + " parameter.");

        shippingDetails.billing[bill + propertyName] = body[bill + propertyName];
        shippingDetails.shipping[ship + propertyName] = copyBillingInfo ? body[bill + propertyName] : body[ship + propertyName];
    }

    async manipulateProductsInCart(req, renderRedirect) {

        switch (req.body.operator) {
            case "add":
                await this.util.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1, this.dal);
                renderRedirect("/cart");
                break;
            case "sub":
                this.util.subtractProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1);
                renderRedirect("/cart");
                break;
            case "rem":
                this.util.subtractProductOrQuantityToCartItem(req, parseInt(req.body.productId), this.const.maxQuantity + 1);
                renderRedirect("/cart");
                break;
            default:
                throw new Error("Unknown Operator");
                break
        }
    }

}

module.exports = pageCart;