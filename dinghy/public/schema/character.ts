import mongoose = require('mongoose');

var character = new mongoose.Schema({
    name: String,
    description: String,
    hp: Number,
    maxhp: Number,
});

export = character;