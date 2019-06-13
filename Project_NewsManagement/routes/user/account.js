var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('passport');
var moment = require('moment');
var config = require('../../config/default.json');
var isSubscriber = require('../../middlewares/isSubscriber');
var restricted = require('../../middlewares/restricted');
var verified = require('../../middlewares/verified');
var logedin = require('../../middlewares/logedin');
var accountModel = require('../../models/account.model');
var subscriberModel = require('../../models/subscriber.model');
var writerModel = require('../../models/writer.model');
var editorModel = require('../../models/editor.model');
var custom = require('../../public/js/custom');
var router = express.Router();

var saltRounds = config.bcrypt.saltRounds;

router.get('/register', logedin, (req, res, next) => {
    res.render('account/register', {
        success: req.session.success
    });
    
    req.session.success = null;
});

router.get('/username-is-available', (req, res, next) => {
    var username = req.query.username;
    accountModel.getByUsername(username).then(rows => {
        if (rows.length) res.json(false);
        else res.json(true);
    }).catch(next);
});

router.get('/username-is-unavailable', (req, res, next) => {
    var username = req.query.username;
    accountModel.getByUsername(username).then(rows => {
        if (rows.length) res.json(true);
        else res.json(false);
    }).catch(next);
});

router.post('/register', (req, res, next) => {
    var user = req.body;
    user.VerifyID = Math.floor(100000 + Math.random() * 900000);

    var accountEntity = {
        "RoleID": 1,
        "Username": user.Username,
        "Password": bcrypt.hashSync(user.Password, saltRounds),
        "AccIsActive": 0,
        "AccCreatedOn": custom.getDateTimeNow(),
        "VerifyID": user.VerifyID
    };

    accountModel.add(accountEntity).then(AccID => {
        var subEntity = {
            "AccID": AccID,
            "Avatar": '/img/user/default-avatar.jpg',
            "FullName": user.FullName,
            "DOB": moment(user.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD')
        };

        subscriberModel.add(subEntity).then(SubID => {
            req.session.success = true;
            res.redirect('/account/register');
        }).catch(next);

        require('../../middlewares/nodemailer')(user);
    }).catch(next);
});

router.get('/verify', restricted, verified, isSubscriber, (req, res, next) => {
    res.render('account/verify');
})

router.post('/verify', (req, res, next) => {
    var user = req.user;
    
    if (user.VerifyID == +req.body.VerifyID) {
        var entity = {
            "AccIsActive": 1
        }

        accountModel.update(user.AccID, entity).then(count => {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                req.session.passport.user = rows[0];
                res.redirect('/user/info');
            });
        }).catch(next);
    } else {
        res.redirect('/account/verify');
    }
});

router.get('/resent-verification', restricted, verified, isSubscriber, (req, res, next) => {
    var user = req.user;
    var verifyID = Math.floor(100000 + Math.random() * 900000);
    var entity = {
        "VerifyID": verifyID
    };
    accountModel.update(user.AccID, entity).then(count => {
        subscriberModel.getByAccID(user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            require('../../middlewares/nodemailer')(rows[0]);
            res.redirect('/account/verify');
        })
    });
});

router.get('/login', logedin, (req, res, next) => {
    res.render('account/login', {
        loginError: req.session.loginError
    });

    req.session.loginError = null;
});

router.post('/login', (req, res, next) => {
    var originalURL = req.query.originalURL || '/';

    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            req.session.loginError = info.message;
            return res.redirect('/account/login');
        }

        if (user.RoleID == 1) {
            await subscriberModel.getByAccID(user.AccID).then(rows => {
                user = rows[0];
            }).catch(next);
        } else if (user.RoleID == 2) {
            await writerModel.getByAccID(user.AccID).then(rows => {
                user = rows[0];
                originalURL = '/writer/welcome';
            });
        } else if (user.RoleID == 3) {
            await editorModel.getByAccID(user.AccID).then(rows => {
                user = rows[0];
                originalURL = '/editor/welcome';
            });
        } else {
            await accountModel.single(user.AccID).then(rows => {
                user = rows[0];
                originalURL = '/admin';
            });
        }

        req.logIn(user, err => {
            if (err) return next(err);

            return res.redirect(originalURL);
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/account/login');
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/account/login');
});

router.get('/forget-password', logedin, (req, res, next) => {
    res.render('account/forgetPassword');
});

router.post('/forget-password', (req, res, next) => {
    req.session.Username = req.body.Username;
    var verifyID = Math.floor(100000 + Math.random() * 900000);
    var entity = {
        "VerifyID": verifyID
    };

    subscriberModel.getByUsername(req.body.Username).then(rows => {
        var user = rows[0];
        
        accountModel.update(user.AccID, entity).then(count => {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                require('../../middlewares/nodemailer')(rows[0]);
                res.redirect('/account/verify-forget-password');
            }).catch(next);
        }).catch(next);
    }).catch(next);
});

router.get('/verify-forget-password', logedin, (req, res, next) => {
    res.render('account/verify');
});

router.post('/verify-forget-password', (req, res, next) => {
    subscriberModel.getByUsername(req.session.Username).then(rows => {
        var user = rows[0];

        if (user.VerifyID == +req.body.VerifyID) {
            res.redirect('/account/verify-new-password');
        } else {
            res.redirect('/account/verify-forget-password');
        }
    }).catch(next);
});

router.get('/verify-new-password', (req, res, next) => {
    res.render('user/changePassword');
});

router.post('/verify-new-password', (req, res, next) => {
    subscriberModel.getByUsername(req.session.Username).then(rows => {
        var user = rows[0];
        var entity = {
            "Password": bcrypt.hashSync(req.body.NewPassword, saltRounds)
        };
        console.log(user.AccID);
        accountModel.update(user.AccID, entity).then(count => {
            res.redirect('/account/login');
            req.session.Username = null;
        }).catch(next);
    }).catch(next);
});

module.exports = router;