let express = require('express');
var app = new express();
let secureApp = require('./modules/secureApp.js');
let _secureApp = new secureApp();
let pg = require('pg');
let _cookiesecret = "secret";
let _timeout = (10 * 10 * 1000); //10 seconds;
let sessionBuilder = require('./modules/sessionBuilder')
let appSession = new sessionBuilder();
let pgPool = new pg.Pool({ user: 'postgres', host: 'localhost', database: 'sessionStore', password: 'P@55word', port: 5432, });
let _port = 3000;

//Body-Parser
app.use(require('body-parser').urlencoded({ extended: true }));
//Session
app.use(appSession.build(pgPool, _cookiesecret, _timeout)); 
//Secure
app.use('/secure', _secureApp.initialize());
//Static
app.use('/',express.static('./static'));

app.listen(_port, () => {
    console.log('Application active on ' + _port);
});