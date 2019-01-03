let constants = require('./constants');
let validator = require('validator');
let hash = require('object-hash');

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

    async constructPageData(user, data, dataAccessLayer) {
        let footerLinks = [];
        if (dataAccessLayer !== undefined)
            footerLinks = await dataAccessLayer.getHealthLinksIndex()
        else
            throw new Error("Where is the dal!!?");
        return {
            user: user,
            pageData: data,
            footerLinks: footerLinks
        }
    },

    getCartItemsCount(req) {
        if (req.session.products === undefined) {
            req.session.products = [];
        }
        return req.session.products.length;
    },

    async addProductOrQuantityToCartItem(req, productId, productQuantity, dataAccessLayer) {

        if (req.session.products === undefined) {
            req.session.products = [];
        }

        if (productQuantity === undefined) productQuantity = 1;

        productQuantity = Math.round(productQuantity);

        if (productQuantity === 0) return;

        if (productQuantity < 0) throw new Error("Quantity cannot be less than zero.");

        if (req.session.locked !== undefined) throw new Error("User cart is locked for checkout.");

        if (productQuantity > constants.maxQuantity) throw new Error("Quantity cannot exceed " + constants.maxQuantity + " per product.");

        let requestedProduct = await dataAccessLayer.products.getProductById(productId);
        if (requestedProduct === undefined) throw new Error("Product doesnot exists :" + productId);

        let existingProduct = req.session.products.find((element) => { return element.productId === productId });

        if (existingProduct === undefined) {
            if (req.session.products.length + 1 > constants.maxProducts) throw new Error("Cannot have more than " + constants.maxProducts + " products in cart.");
            req.session.products.push({ "productId": productId, "quantity": productQuantity, offerprice: requestedProduct.offerprice });
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

    validateEmail(strInput) {
        try {
            return validator.isEmail(strInput);
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateMobilePhone(strInput) {
        try {
            return validator.isMobilePhone(strInput, "en-IN");
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateLength(strInput, maxLength, minLength) {
        try {
            return this.validateIsNotUndefiendNullEmpty(strInput) && typeof (strInput) === "string" && strInput.length >= minLength && strInput.length <= maxLength;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsNotUndefiendNullEmpty(strInput) {
        try {
            return strInput !== undefined && strInput !== null && strInput !== "";
        }
        catch (err) {
            console.error(err);
            return false;
        }

    },

    validateIsInOptions(strInput, options) {
        try {
            return options.find((e) => e === strInput) !== undefined;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsPostcode(strInput) {
        try {
            return validator.isPostalCode(strInput, 'IN');
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsDateBetween(strInput, startDate, endDate) {
        try {
            return validator.isAfter(strInput, startDate.toDateString()) && validator.isBefore(strInput, endDate.toDateString());
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsFloatNumberBetween(strInput, max, min) {
        try {
            let inputFloat = parseFloat(strInput);
            let inputMax = parseFloat(max);
            let inputMin = parseFloat(min);
            return inputFloat >= inputMin && inputFloat <= inputMax;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsWholeNumber(strInput) {
        try {
            let inputFloat = parseFloat(strInput);
            return Math.round(inputFloat) === inputFloat;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    },

    validateIsWholeNumberBetween(strInput, max, min) {
        return this.validateIsWholeNumber(strInput) && this.validateIsFloatNumberBetween(strInput, max, min);
    },

    validateIsArrayLengthBetween(object, max, min) {
        return Array.isArray(object) && object.length <= max && object.length >= min;
    },

    validateIsUrl(strInput) {
        return validator.isURL(strInput);
    },

    getHash(strInput) {
        return hash(strInput, { algorithm: 'md5' });
    },

    isAdmin(user) {
        return user.meta.type === "admin";
    },

    onlyAdmin(req, res, next) {
        if (require('../modules/utilities').isAdmin(req.user) === false) {
            console.warn("Security Alert: User(" + req.user.id + ") tried to access non privileged " + req.originalUrl + " resource.");
            res.redirect("/secure/profile");
            return;
        }
        else {
            next();
        }
    }

}