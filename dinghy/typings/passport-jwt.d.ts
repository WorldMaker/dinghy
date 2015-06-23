// TypeScript Definition for passport-jwt
// Definition file by Max Battcher

declare module 'passport-jwt' {
    import express = require('express');
    import passport = require('passport');

    interface JwtStrategyOptions {
        /** (REQUIRED) String or buffer containing the secret or PEM- encoded public key */
        secretOrKey: string;
        /**  If defined issuer will be verified against this value */
        issuer?: string;
        /** If defined audience will be verified against this value  */
        audience?: string;
        /** Field in request body containing token.Default is auth_token. */
        tokenBodyField?: string;
        /** Query parameter name containing the token.Default is auth_token. */
        tokenQueryParameterName?: string;
        /** Expected scheme when JWT can be found in HTTP Authorize header.Default is JWT. */
        authScheme?: string;
        /** If true the, the verify callback will be called with args (request, jwt_payload, done_callback). */
        passReqToCallback?: boolean;
    }

    // TODO: This should probably be contributed to the main passport.d.ts
    interface VerifyCallback {
        (request: express.Request, jwt_payload: any, done_callback: any): void;
        (jwt_payload: any, done_callback: any): void;
    }

    export class JwtStrategy implements passport.Strategy {
        constructor(options: JwtStrategyOptions, verify: VerifyCallback);
        name: string;
        authenticate(req: express.Request, options?: Object): void;
    }
}