// TypeScript definitions for npm mongoose-findorcreate
// Definitions by Max Battcher

interface MongooseFindOrCreatable {
    findOrCreate(query: any, callback: (err: any, obj: any, created: boolean) => void): void;
    findOrCreate(query: any, props: any, callback: (err: any, obj: any, created: boolean) => void): void;
}

declare module "mongoose-findorcreate" {
    import mongoose = require('mongoose');

    interface MongooseSchemaPlugin {
        (schema: mongoose.Schema, options?: any): void;
    }

    var findOrCreatePlugin: MongooseSchemaPlugin;

    export = findOrCreatePlugin;
}