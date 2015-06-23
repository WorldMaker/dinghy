// Project "BoatAuth" Single Sign-On Strategy for Passport
// This is essentially just the normal JWT strategy with an extra wrapper to check for an auth cookie.
// (This is because most "BoatAuth" apps should be running on the same server/IP address/"domain", so
// it makes sense that they may share a cookie as the fastest single-sign on option.)
import express = require('express');
import passportJwt = require('passport-jwt');

export class BoatAuthStrategy extends passportJwt.JwtStrategy {
    name = "BoatAuth";

    constructor(options: passportJwt.JwtStrategyOptions, callback: passportJwt.VerifyCallback) {
        super(options, callback);
    }

    authenticate(req: express.Request, options?: Object) {
        // Doing this the lazy way by simply converting cookie to header before passing it on
        if (req.cookies.AUTH_TOKEN) {
            req.headers['authorization'] = "JWT " + req.cookies.AUTH_TOKEN; // TODO: Maybe handle if overrides in constructor options?
        }

        super.authenticate(req, options);
    }
}