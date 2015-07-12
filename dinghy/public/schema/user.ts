import mongoose = require('mongoose');

var user = new mongoose.Schema({
    username: String,
    is_admin: Boolean,
    is_dm: Boolean,
});

export = user;