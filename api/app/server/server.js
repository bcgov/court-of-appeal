let RestAdaptor = require('./rest.adaptor');
let express = require('express');
let bodyParser = require("body-parser");
let morgan = require('morgan');
let Keycloak = require('keycloak-connect');
let pg = require('pg')
let session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
function Server() {
    this.restAdaptor = new RestAdaptor();

    this.app = express();
    this.headers = [
        { name:'Access-Control-Allow-Origin', value:'*' },
        { name:'Access-Control-Allow-Headers', value:'Content-Type, Authorization, Content-Length, X-Requested-With' },
        { name:'Access-Control-Allow-Methods', value:'GET, PUT, POST, OPTIONS' },
        { name:'Content-Type', value:'application/json' },
    ];
    this.requestheaders = [];
}

Server.prototype.start = function (port, ip, done) {
    // Keycloak Start
    if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_AUTH_URL || !process.env.KEYCLOAK_REALM || !process.env.KEYCLOAK_SECRET) {
        console.error('Keycloak environment variables not provided, exiting... ')
        process.kill(process.pid, 'SIGTERM')
    }

    var pgStore = new pgSession({
      pool: new pg.Pool(),
    });

    this.app.use(
      session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: pgStore,
      })
    );

    this.keycloak = new Keycloak(
      { store: pgStore, idpHint: "bceid" },
      {
        realm: process.env.KEYCLOAK_REALM,
        "bearer-only": false,
        "auth-server-url": process.env.KEYCLOAK_AUTH_URL,
        "ssl-required": "external",
        resource: process.env.KEYCLOAK_CLIENT_ID,
        credentials: {
          secret: process.env.KEYCLOAK_SECRET,
        },
      }
    );

    //Rewrite the host, protocol headers, for keycloak. 
    this.app.use(function (request, response, next) {
        if (request.header('x-forwarded-host')) {
            request.headers.protocol = request.header('x-forwarded-proto');
            request.headers.host = request.header('x-forwarded-host') + ":" + request.header('x-forwarded-port');
        }
        next();
    });

    Keycloak.prototype.logoutUrl = function (redirectUrl) {
        var keycloakLogoutUrl = this.config.realmUrl +
        '/protocol/openid-connect/logout' +
        '?post_logout_redirect_uri=' + encodeURIComponent(redirectUrl);
        var siteMinderLogoutUrl = `https://logontest.gov.bc.ca/clp-cgi/logoff.cgi?returl=${keycloakLogoutUrl}&retnow=1`
        return siteMinderLogoutUrl;
    };
      
    Keycloak.prototype.redirectToLogin = function(req) {
        var apiReqMatcher = /\/api\/login/i;
        return apiReqMatcher.test(req.originalUrl || req.url);
    };

    this.app.use(this.keycloak.middleware({
        logout: '/api/logout',
        admin: '/'
    }));
    // Keycloak END

    this.app.use((request, response, next)=>{
        for (let i=0; i<this.requestheaders.length; i++) {
            let header = this.requestheaders[i];
            request.headers[header.name] = header.value;
        }
        for (let i=0; i<this.headers.length; i++) {
            let header = this.headers[i];
            response.setHeader(header.name, header.value);
        }
        //This will force the frontend to hit /api/login, and will check there for IDIR user
        //if the IDIR user is detected It will log them out, and attempt to login with BCEID. 
        if (!["/api/login","/api/logout"].some(v => request.url.includes(v)) && request.kauth && request.kauth.grant) {
            let notBCEID = !request.kauth.grant.id_token.content['universal-id'];
            if (notBCEID) {
                response.sendStatus(403)
                return;
            }
        }
        next();
    });

    this.app.use(morgan(':method :url', { immediate:true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.restAdaptor.route(this.app, this.keycloak);
    this.server = this.app.listen(port, ip, done);
};

Server.prototype.stop = function (done) {
    this.server.close();
    done();
};

Server.prototype.useService = function(hub) {
    this.restAdaptor.useHub(hub);
};

Server.prototype.useDatabase = function(database) {
    this.restAdaptor.useDatabase(database);
};


module.exports = Server;
