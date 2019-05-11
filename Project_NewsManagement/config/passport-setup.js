var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');

// passport.use(
//     new GoogleStrategy({
//         // options for the google start
//         callbackURL: '/login/google/redirect',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret
//     }, async (accessToken, refreshToken, profile, callback) => {
//         // passport callback function
//         console.log(profile);
//         //accountModel.getByUsername(profile.id)
//     })
// );