let utils = require('../modules/utilities');
let constants = require('../modules/constants');
let pgDal = require('../db/dataAccessLayer');
let dal = new pgDal();

class cart {
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

    renderCart(req, res) {
        try {
            let pageData = {};
            pageData[constants.cartItems] = utils.getCartItemsCount(req);
            pageData[constants.state] = req.session.locked === undefined ? undefined : req.session.locked.state;
            pageData[constants.shoppingCartProducts] = [];
            pageData[constants.shoppingInfo] = undefined;

            if (req.session.products !== undefined) {
                let productIds = req.session.products.map(ele => ele.productId);
                dal.getProducts(productIds).then((productInfo) => {
                    productInfo.map(p => p.quantity = req.session.products.find(ele => ele.productId === p.id).quantity);
                    pageData[constants.shoppingCartProducts] = productInfo;
                    return pageData;
                }).then((pagedata) => {
                    if (req.session.locked !== undefined && req.session.locked.state === 2) {
                        pagedata[constants.shoppingInfo] = req.session.locked;
                    }
                    res.render('../pages/cart', utils.constructPageData(req.user, pagedata));
                }).catch((err) => {
                    utils.navigateToError(req, res, err, undefined);
                });
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

                        this.fillShippingDetails(req.body, copyBillingInfo, "Salutation", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "FirstName", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "LastName", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add1", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add2", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "Add3", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "City", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "Pincode", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "State", shippingDetails);
                        this.fillShippingDetails(req.body, copyBillingInfo, "Mobile", shippingDetails);

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
                            switch (req.body.paymentMode) {

                                case "cheque":
                                    if (req.body.chequeChequeNo === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeChequeNo");
                                    if (req.body.chequeDate === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeDate");
                                    if (req.body.chequeBankName === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeBankName");
                                    if (req.body.chequeBankBranch === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeBankBranch");
                                    if (req.body.chequeDepositedBank === undefined) throw new Error("Incomplete or Invalid request for parameter:chequeDepositedBank");
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
                                    if (req.body.bankTransferRefNo === undefined) throw new Error("Incomplete or Invalid request for parameter:bankTransferRefNo");
                                    if (req.body.bankTransferDate === undefined) throw new Error("Incomplete or Invalid request for parameter:bankTransferDate");
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

    fillShippingDetails(body, copyBillingInfo, propertyName, shippingDetails) {
        const ship = "s";
        const bill = "b";
        if (body[bill + propertyName] === undefined) throw new Error("Invalid or Incomplete request, Missing billing " + propertyName + " parameter.");
        if (copyBillingInfo === false && body[ship + propertyName] === undefined) throw new Error("Invalid or Incomplete request, Missing shipping " + propertyName + " parameter.");

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

module.exports = cart;