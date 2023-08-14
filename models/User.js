const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    major: String,
    class: String
})

UserSchema.plugin(passportLocalMongoose)

User = new mongoose.model('User', UserSchema)

module.exports = mongoose.model('User', UserSchema)