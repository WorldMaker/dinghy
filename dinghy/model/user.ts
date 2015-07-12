import mongoose = require('mongoose');
import schema = require('public/schema/user');
import mongooseFindOrCreate = require('mongoose-findorcreate');

schema.plugin(mongooseFindOrCreate);
var user = mongoose.model('User', schema);

export = user;