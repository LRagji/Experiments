let express = require('express');
var app = new express();
let constants = require('./modules/constants');
let pgdal = require('./db/dataAccessLayer');
let dal = new pgdal(constants);
let _cookiesecret = "secret";
let _timeout = (100 * 10 * 1000); //16.xx minutes;
let sessionBuilder = require('./modules/sessionBuilder')
let appSession = new sessionBuilder();
let _port = process.env.PORT || 3000;
let dynamicPages = require('./modules/dynamicPages');
let flash = require('connect-flash');
let webServer = null;
let api = require('./modules/apis');
let apiServer = null;
var minifyHTML = require('express-minify-html');
let authenticationModule = require('./modules/auth');
let authenticationService = null;
let util = require('./modules/utilities');


//Minify on the fly
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    }
}));

//Use Flash
console.log("Piping flash service..");
app.use(flash());

//Body-Parser
console.log("Piping body parser..");
app.use(require('body-parser').urlencoded({ extended: true }));

//Session
console.log("Piping session server..");
app.use(appSession.build(dal.pool(), _cookiesecret, _timeout));

//Authentication Pages
console.log("Piping authentication service..");
authenticationService = new authenticationModule(app, dal, util, constants);

//Dynamic & Secured Pages
console.log("Initializing dynamic pages..");
webServer = new dynamicPages(app, authenticationService,dal, util, constants);

//API Server
console.log("Initializing API server..");
apiServer = new api(app,dal, util, constants);

//Static Content
console.log("Hosting static items..");
app.use('/static', express.static('static'));

console.log("App engine starting..");
app.listen(_port, () => {
    console.log('Application active on ' + _port);
});