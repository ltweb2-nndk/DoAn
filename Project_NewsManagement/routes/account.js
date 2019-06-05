var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('passport');
var moment = require('moment');
var config = require('../config/default.json');
var restricted = require('../middlewares/restricted');
var verified = require('../middlewares/verified');
var logedin = require('../middlewares/logedin');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
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
    user.Password = bcrypt.hashSync(user.Password, saltRounds);
    user.DOB = moment(user.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');

    accountModel.add(user).then(AccID => {
        user.AccID = AccID;
        subscriberModel.add(user).then(SubID => {
        }).catch(next);

        require('../middlewares/nodemailer')(user);
    }).catch(next);

    req.session.success = true;
    res.redirect('/account/register');
});

router.get('/verify', restricted, verified, (req, res, next) => {
    console.log(req.user);
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

router.get('/resent-verification', restricted, verified, (req, res, next) => {
    var user = req.user;
    var verifyID = Math.floor(100000 + Math.random() * 900000);
    var entity = {
        "VerifyID": verifyID
    };
    accountModel.update(user.AccID, entity).then(count => {
        subscriberModel.getByAccID(user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            require('../middlewares/nodemailer')(rows[0]);
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
        }

        var originalURL = req.query.originalURL || '/';
        req.logIn(user, err => {
            if (err) return next(err);

            return res.redirect(originalURL);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/account/login');
});

router.get('/edit/:id',(req,res,next)=>{
    var id=req.params.id;
    accountModel.single(id).then(rows=>{
        res.render('account/edit',{account:rows[0],layout:false})
    }).catch(next);
})

router.post('/update',(req,res,next)=>{
    var entity=req.body;
    accountModel.update(entity).then(n=>{
        res.send('<h3><center>Cập nhật thành công<center></h3>')
    }).catch(next);
})

module.exports = router;