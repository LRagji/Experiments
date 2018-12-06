let express = require('express');
var app = new express();
let secureApp = require('./modules/secureApp.js');
let _secureApp = new secureApp();
let pgdal = require('./db/dataAccessLayer');
let dal = new pgdal();
let _cookiesecret = "secret";
let _timeout = (10 * 10 * 1000); //10 seconds;
let sessionBuilder = require('./modules/sessionBuilder')
let appSession = new sessionBuilder();
let _port = 3000;
let dp = require('./modules/activeServerProcessing');
let webServer = new dp();

//Body-Parser
app.use(require('body-parser').urlencoded({ extended: true }));
//Session
app.use(appSession.build(dal.pool(), _cookiesecret, _timeout));
//Secure
app.use('/secure', _secureApp.initialize());
//Dynamic Pages
app.use('/', webServer.initialize());
//Static Content
app.use('/static', express.static('static'));


app.listen(_port, () => {
    console.log('Application active on ' + _port);
});