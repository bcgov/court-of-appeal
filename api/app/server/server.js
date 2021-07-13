const config = require('../config/environment');
let RestAdaptor = require('./rest.adaptor');
let express = require('express');
let helmet = require('helmet');
let morgan = require('morgan');
let Keycloak = require('keycloak-connect');
let pg = require('pg')
let session = require('express-session');
let pgSession = require('connect-pg-simple')(session);

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
    this.app.use(helmet({
        frameguard: { action: 'deny' }
    }));
    this.app.set('trust proxy', true)
    this.app.use(
      session({
        name: 'session',
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

    if (process.env.MOCK_KEYCLOAK){
        this.keycloak.protect = function () {
            return function protect (request, response, next) {
                request.session.universalId = process.env.MOCK_UNIVERSAL_ID;
                request.session.userId = 16;
                next();
            }
        }
    }

    //Rewrite the host, protocol headers, for keycloak. 
    this.app.use(function (request, response, next) {
        if (request.header('x-forwarded-host')) {
            request.headers.host = request.header('x-forwarded-host');

            //Openshift fix
            if (request.headers.host.endsWith(':443')) { 
                request.headers.host = request.headers.host.split(':')[0];
            }

        //Docker fix
        if (request.header('x-forwarded-port') && request.header('x-forwarded-port') != '443')
            request.headers.host += `:${request.header('x-forwarded-port')}`;
        }

        //OriginalUrl is used to form our callback url for keycloak.
        if (request.originalUrl.startsWith('/api/login') || request.originalUrl.startsWith('/api/logout')) {
            request.originalUrl = `${process.env.WEB_BASE_HREF}${request.originalUrl.slice(1)}`;
            var oldRedirect = response.redirect;
            response.redirect = function(url) {
                arguments[0] = url.includes('/api/login') ? `${process.env.WEB_BASE_HREF}${url}`.replace("//","/") : url;
                oldRedirect.apply(response, arguments);
            }
        }

        next();
    });

    Keycloak.prototype.logoutUrl = function (redirectUrl) {
        const keycloakLogoutUrl = `${this.config.realmUrl}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(redirectUrl)}`
        const siteMinderLogoutUrl = `${config.SM_LOGOUT_URL_PREFIX}?returl=${keycloakLogoutUrl}&retnow=1`
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
                response.sendStatus(403);
                return;
            } 
        }
        next();
    });

    //Optional chaining in newer versions of node.
    morgan.token('sub', function (req, res) {  
        return (req.kauth && req.kauth.grant && req.kauth.grant.id_token && req.kauth.grant.id_token.content) ? req.kauth.grant.id_token.content.sub : '';
    })

    this.app.use(morgan(':date - :sub - :method :url', { immediate:true,
        skip: function (req, res) { return req.path == '/api/health/' }
    }));
    
    this.app.use(express.json());   
    this.app.use(express.urlencoded({extended: true})); 
    this.restAdaptor.route(this.app, this.keycloak);

    process.on('unhandledRejection', function(reason) {
        console.log("Unhandled Rejection:", reason);
        process.exit(1);
    });

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
