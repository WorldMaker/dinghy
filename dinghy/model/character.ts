import mongoose = require('mongoose');
import schema = require('public/schema/character');

var character = mongoose.model('Character', schema);

export = character;