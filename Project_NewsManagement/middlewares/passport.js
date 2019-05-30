var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
var writerModel = require('../models/writer.model');

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new localStrategy({
            usernameField: 'Username',
            passwordField: 'Password'
        }, (username, password, done) => {
            accountModel.getByUsername(username).then(rows => {
                if (!rows.length) {
                    return done(null, false, { message: 'Địa chỉ email không tồn tại.' });
                }

                var user = rows[0];
                var match = bcrypt.compareSync(password, user.Password);

                if (!match) {
                    return done(null, false, { message: 'Mật khẩu không đúng.' });
                }

                return done(null, user);
            }).catch(err => {
                return done(err, false);
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};