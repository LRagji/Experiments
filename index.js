let express = require('express');
var app = new express();
let pgdal = require('./db/dataAccessLayer');
let dal = new pgdal();
let _cookiesecret = "secret";
let _timeout = (10 * 10 * 1000); //10 seconds;
let sessionBuilder = require('./modules/sessionBuilder')
let appSession = new sessionBuilder();
let _port = 3000;
let dynamicPages = require('./modules/dynamicPages');
let webServer = null;
let api = require('./modules/apis');
let apiServer = null;
var minifyHTML = require('express-minify-html');

// Minify on the fly
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

//Body-Parser
app.use(require('body-parser').urlencoded({ extended: true }));

//Session
app.use(appSession.build(dal.pool(), _cookiesecret, _timeout));

//Dynamic & Secured Pages
webServer = new dynamicPages(app);

//API Server
apiServer = new api(app);

//Static Content
app.use('/static', express.static('static'));


app.listen(_port, () => {
    console.log('Application active on ' + _port);
});