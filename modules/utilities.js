let constants = require('./constants');

module.exports = {
    navigateToError(req, res, err, userMessage) {
        if (userMessage === undefined) userMessage = "Unknown Error";
        let errObj = { "userMessage": userMessage };
        if (err['message'] !== undefined) errObj.message = err.message;
        if (err['name'] !== undefined) errObj.name = err.name;
        if (err['stack'] !== undefined) errObj.stack = err.stack;
        req.flash(constants.error, errObj);
        res.redirect('/error');
    },

    constructPageData(user, data) {
        return {
            user: user,
            pageData: data
        }
    },

    getCartItemsCount(req) {
        if (req.session.products === undefined) {
            req.session.products = [];
        }
        return req.session.products.length;
    },

    addProductOrQuantityToCartItem(req, productId, productQuantity) {

        if (req.session.products === undefined) {
            req.session.products = [];
        }

        if (productQuantity === undefined) productQuantity = 1;

        productQuantity = Math.round(productQuantity);

        if (productQuantity === 0) return;

        if (productQuantity < 0) throw new Error("Quantity cannot be less than zero.");

        if (req.session.locked !== undefined) throw new Error("User cart is locked for checkout.");

        if (productQuantity > constants.maxQuantity) throw new Error("Quantity cannot exceed " + constants.maxQuantity + " per product.");

        let existingProduct = req.session.products.find((element) => { return element.productId === productId });

        if (existingProduct === undefined) {
            if (req.session.products.length + 1 > constants.maxProducts) throw new Error("Cannot have more than " + constants.maxProducts + " products in cart.");
            req.session.products.push({ "productId": req.body.productId, "quantity": productQuantity });
        }
        else {
            if ((existingProduct.quantity + productQuantity) > constants.maxQuantity) throw new Error("Quantity cannot exceed " + constants.maxQuantity + " per product.");
            existingProduct.quantity += productQuantity;
        }
    },

    subtractProductOrQuantityToCartItem(req, productId, productQuantity) {

        if (req.session.products === undefined) {
            throw new Error("Product doesnt exist in users cart.");
        }

        if (productQuantity === undefined) productQuantity = 1;

        productQuantity = Math.round(productQuantity);

        if (productQuantity === 0) return;

        if (productQuantity < 0) throw new Error("Quantity cannot be less than zero.");

        if (req.session.locked !== undefined) throw new Error("User cart is locked for checkout.");

        let existingProduct = req.session.products.find((element) => { return element.productId === productId });

        if (existingProduct !== undefined) {
            existingProduct.quantity -= productQuantity;
            if (existingProduct.quantity <= 0) {
                req.session.products.splice(req.session.products.indexOf(existingProduct), 1);
            }
        }
        else {
            throw new Error("Product doesnt exist in users cart.");
        }
    },

}