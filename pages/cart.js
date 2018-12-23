let utils = require('../modules/utilities');
let constants = require('../modules/constants');
let pgDal = require('../db/dataAccessLayer');
let dal = new pgDal();

class pageCart {
    constructor(server) {
        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderCart = this.renderCart.bind(this);
        this.processCart = this.processCart.bind(this);
        this.manipulateProductsInCart = this.manipulateProductsInCart.bind(this);
        this.fillShippingDetails = this.fillShippingDetails.bind(this);
        this.clearShoppingCartSession = this.clearShoppingCartSession.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/cart', this.renderCart);
        server.post('/cart', this.processCart);
        server.post('/cart/items', this.manipulateProductsInCart);
    }

    async  renderCart(req, res) {
        try {
            let pageData = {};
            pageData[constants.cartItems] = utils.getCartItemsCount(req);
            pageData[constants.state] = req.session.locked === undefined ? undefined : req.session.locked.state;
            pageData[constants.shoppingCartProducts] = [];
            pageData[constants.shoppingInfo] = undefined;

            if (req.session.products !== undefined) {
                let productIds = req.session.products.map(ele => ele.productId);
                let productInfo = await dal.getProducts(productIds)
                productInfo.map(p => p.quantity = req.session.products.find(ele => ele.productId === p.id).quantity);
                pageData[constants.shoppingCartProducts] = productInfo;
                if (req.session.locked !== undefined && req.session.locked.state === 2) {
                    pageData[constants.shoppingInfo] = req.session.locked;
                }
                res.render('../pages/cart', utils.constructPageData(req.user, pageData));
            }
        }
        catch (err) {
            utils.navigateToError(req, res, err, undefined);
        }
    }

    processCart(req, res) {
        try {
            let redirectPage = "/cart";
            if (req.body.state !== undefined) {
                //User needs to login to process any state
                if (req.user === undefined) {
                    req.session.returnTo = req.originalUrl;
                    res.redirect("/secure/login");
                    return;
                }

                switch (req.body.state) {
                    case "1":
                        if (req.session.locked !== undefined) throw new Error("This session is already under a checkout process on some other device.");
                        if (utils.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
                        req.session.locked = {
                            "userId": req.user.id,
                            "state": 1,
                            "products": req.session.products
                        }
                        break;

                    case "2":
                        //TODO:Server side data input validations
                        if (req.session.locked === undefined) throw new Error("This session may have been cancelled on other device.");
                        if (utils.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
                        if (req.session.locked.userId !== req.user.id) throw new Error("This user cannot checkout cart for other user.");
                        if (req.session.locked.state !== 1) throw new Error("Please complete your order on previous step.");

                        let copyBillingInfo = req.body.chkSameAsBilling === undefined ? false : true;
                        let shippingDetails = { billing: {}, shipping: {} };

                        this.fillShippingDetails(req.body, copyBillingInfo, "Salutation", shippingDetails, (value) => utils.validateIsInOptions(value, constants.salutations));
                        this.fillShippingDetails(req.body, copyBillingInfo, "FirstName", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "LastName", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add1", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add2", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add3", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "City", shippingDetails, (value) => utils.validateLength(value, 50, 1));
                        this.fillShippingDetails(req.body, copyBillingInfo, "Pincode", shippingDetails, (value) => utils.validateIsPostcode(value));
                        this.fillShippingDetails(req.body, copyBillingInfo, "State", shippingDetails, (value) => utils.validateIsInOptions(value, constants.states));
                        this.fillShippingDetails(req.body, copyBillingInfo, "Mobile", shippingDetails, (value) => utils.validateMobilePhone(value));

                        req.session.locked.shippingDetails = shippingDetails;
                        req.session.locked.state = 2;
                        break;

                    case "3":
                        if (req.session.locked === undefined) throw new Error("This session may have been cancelled on other device.");
                        if (utils.getCartItemsCount(req) <= 0) throw new Error("There are no products to checkout.");
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
                                    startDate.setDate(endDate.getDate() - 10); //Time windows is 10 days.

                                    if (utils.validateLength(req.body.chequeChequeNo, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeChequeNo");
                                    if (utils.validateIsDateBetween(req.body.chequeDate, startDate, endDate) === false) throw new Error("Incomplete or Invalid request for parameter:chequeDate");
                                    if (utils.validateLength(req.body.chequeBankName, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeBankName");
                                    if (utils.validateLength(req.body.chequeBankBranch, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:chequeBankBranch");
                                    if (utils.validateIsInOptions(req.body.chequeDepositedBank, constants.bankAccounts) === false) throw new Error("Incomplete or Invalid request for parameter:chequeDepositedBank");
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

                                    orderId = dal.createOrder(req.session.locked);
                                    this.clearShoppingCartSession(req);
                                    redirectPage = '/secure/success?oid=' + orderId; //TODO:Confirm if these are right page links
                                    break;

                                case "bankTransfer":
                                    endDate = new Date();
                                    startDate = new Date();
                                    startDate.setDate(endDate.getDate() - 10); //Time windows is 10 days.

                                    if (utils.validateLength(req.body.bankTransferRefNo, 50, 1) === false) throw new Error("Incomplete or Invalid request for parameter:bankTransferRefNo");
                                    if (utils.validateIsDateBetween(req.body.bankTransferDate, startDate, endDate) === false) throw new Error("Incomplete or Invalid request for parameter:bankTransferDate");
                                    if (req.body.bankTransferDeclaration === undefined) throw new Error("Incomplete or Invalid request for parameter:bankTransferDeclaration");

                                    req.session.locked.payment = {
                                        "type": req.body.paymentMode,
                                        "txnno": req.body.bankTransferRefNo,
                                        "date": req.body.bankTransferDate,
                                        "amount": req.body.amount
                                    }

                                    orderId = dal.createOrder(req.session.locked);
                                    this.clearShoppingCartSession(req);
                                    redirectPage = '/secure/success?oid=' + orderId; //TODO:Confirm if these are right page links
                                    break;

                                case "gateway":
                                    if (req.body.gatewayDeclaration === undefined) throw new Error("Incomplete or Invalid request for parameter:gatewayDeclaration");

                                    req.session.locked.payment = {
                                        "type": req.body.paymentMode,
                                        "amount": req.body.amount
                                    }

                                    orderId = dal.createOrder(req.session.locked);
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
                res.redirect(redirectPage);
                return;
            }
            else {
                throw new Error("Invalid Request:Invalid or Missing State Info")
            }

        }
        catch (err) {
            utils.navigateToError(req, res, err, undefined);
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

    manipulateProductsInCart(req, res) {
        try {

            switch (req.body.operator) {
                case "add":
                    utils.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1);
                    res.redirect("/cart");
                    break;
                case "sub":
                    utils.subtractProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1);
                    res.redirect("/cart");
                    break;
                case "rem":
                    utils.subtractProductOrQuantityToCartItem(req, parseInt(req.body.productId), constants.maxQuantity + 1);
                    res.redirect("/cart");
                    break;
                default:
                    throw new Error("Unknown Operator");
                    break
            }
        }
        catch (err) {
            utils.navigateToError(req, res, err, undefined);
        }
    }

}

module.exports = pageCart;