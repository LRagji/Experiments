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
    }
}