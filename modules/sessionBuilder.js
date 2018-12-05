let session = require('express-session');
let pgSession = require('connect-pg-simple')(session);

class sessionBuilder {

    constructor() {
        this.build = this.build.bind(this);
    }

    build(dbPool, cookieHashSecret, sessionMaxTimeout) {
        return session(
            {
                store: new pgSession({
                    pool: dbPool
                }),
                secret: cookieHashSecret,
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: sessionMaxTimeout } // 10 seconds
            })
    }

}

/*
Tables that should exits for sessions

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

*/

module.exports = sessionBuilder