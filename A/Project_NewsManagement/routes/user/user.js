var express = require('express');
var bcrypt = require('bcrypt');
var multer = require('multer');
var moment = require('moment');
var config = require('../../config/default.json');
var custom = require('../../public/js/custom');
var restricted = require('../../middlewares/restricted');
var verify = require('../../middlewares/verify');
var isSubscriber = require('../../middlewares/isSubscriber');
var accountModel = require('../../models/account.model');
var subscriberModel = require('../../models/subscriber.model');
var writerModel = require('../../models/writer.model');
var accountModel= require('../../models/account.model')

var router = express.Router();

var saltRounds = config.bcrypt.saltRounds;
var storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        var user = req.user;
        var avatarPath;

        if (user.RoleID == 1) avatarPath = "./public/img/user/subscriber/";
        else if (user.RoleID == 2) avatarPath = "./public/img/user/writer/";
        else if (user.RoleID == 3) avatarPath = "./public/img/user/editor/";

        cb(null, avatarPath);
    },
    filename: (req, file, cb) => {
        var user = req.user;
        var avatarName;

        if (user.RoleID == 1) avatarName = `${user.SubscriberID}.jpg`;
        else if (user.RoleID == 2) avatarName = `${user.WriterID}.jpg`;
        else if (user.RoleID == 3) avatarName = `${user.EditorID}.jpg`;

        cb(null, avatarName);
    }
});
var upload = multer({storage: storageAvatar});

router.get('/info', restricted, verify, (req, res, next) => {
    console.log(req.user);
    var expiredOn = new Date(req.user.ExpiredOn);
    var datetimeNow = new Date(custom.getDateTimeNow());
    var expired = false;

    if (expiredOn < datetimeNow) expired = true;

    res.render('user/info', {
        expired
    });
});

router.get('/change-avatar', restricted, verify, (req, res, next) => {
    res.render('user/changeAvatar');
});

router.post('/change-avatar', upload.single('Avatar'), (req, res, next) => {
    var path = req.file.path.substring(6); // remove "public"
    var user = req.user;
    var entity = {
        "Avatar": path
    }

    if (user.RoleID == 1) {
        subscriberModel.update(user.SubscriberID, entity).then(count => {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                req.user = rows[0];
            }).catch(next);
        }).catch(next);
    } else if (user.RoleID == 2) {
        writerModel.update(user.WriterID, entity).then(count => {
            writerModel.getByAccID(user.AccID).then(rows => {
                req.user = rows[0];
            }).catch(next);
        }).catch(next);
    } else if (user.RoleID == 3) {
        //Editor
    }

    res.redirect('/user/info');
});

router.get('/edit-info', restricted, verify, (req, res, next) => {
    var day = custom.day;
    var month = custom.month;
    var year = custom.year;
    var dob = moment(new Date(req.user.DOB), 'YYYY-MM-DD').format('DD/MM/YYYY').split("/");

    res.render('user/editInfo', {
        day, month, year,
        dobDay: +dob[0],
        dobMonth: +dob[1],
        dobYear: +dob[2],
        subError: req.session.subError
    });

    req.session.subError = null;
});

router.post('/edit-info', (req, res, next) => {
    var userReq = req.body;
    var user = req.user;
    var entity = {
        "FullName": userReq.Fullname,
        "DOB": new Date(userReq.Year, userReq.Month - 1, userReq.Day)
    };

    if (custom.isDate(userReq.Day, userReq.Month, userReq.Year)) {
        if (user.RoleID == 1) {
            subscriberModel.update(user.SubscriberID, entity).then(rows => {
                subscriberModel.getByAccID(user.AccID).then(rows => {
                    req.session.passport.user = rows[0];
                    res.redirect('/user/info');
                }).catch(next);
            }).catch(next);
        } else if (user.RoleID == 2) {
            writerModel.update(user.WriterID, entity).then(rows => {
                writerModel.getByAccID(user.AccID).then(rows => {
                    req.session.passport.user = rows[0];
                    res.redirect('/user/info');
                }).catch(next);
            }).catch(next);
        }
    } else {
        req.session.subError = true;
        res.redirect('/user/edit-info');
    }
});

router.get('/change-password', restricted, verify, (req, res, next) => {
    res.render('user/changePassword', {
        success: req.session.success
    });

    req.session.success = null;
});

router.get('/password-is-correct', (req, res, next) => {
    var password = req.query.password;
    var match = bcrypt.compareSync(password, req.user.Password);

    if (match) res.json(true);
    else res.json(false);
});

router.post('/change-password', async (req, res, next) => {
    var user = req.user;
    var entity = {
        "Password": bcrypt.hashSync(req.body.NewPassword, saltRounds)
    }

    await accountModel.update(user.AccID, entity).then(count => {
        if (user.RoleID == 1) {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                req.session.passport.user = rows[0];
                req.session.success = true;
                res.redirect('/user/change-password');
            }).catch(next);
        } else if (user.RoleID == 2) {
            writerModel.getByAccID(user.AccID).then(rows => {
                req.session.passport.user = rows[0];
                req.session.success = true;
                res.redirect('/user/change-password');
            }).catch(next);
        } else if (user.RoleID == 3) {
            // Editor
        }
    }).catch(next);
});

router.get('/buy-premium', restricted, verify, isSubscriber, (req, res, next) => {
    var expiredOn = new Date(req.user.ExpiredOn);
    var datetimeNow = new Date(custom.getDateTimeNow());
    var expired = false;

    if (expiredOn < datetimeNow) expired = true;

    res.render('user/buyPremium', {
        expired
    });
});

router.post('/buy-premium', (req, res, next) => {
    var entity = {
        "BoughtOn": custom.getDateTimeNow(),
        "ExpiredOn": custom.addDaysFromNow(7)
    };

    subscriberModel.update(req.user.SubscriberID, entity).then(count => {
        subscriberModel.getByAccID(req.user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            res.redirect('/user/info');
        });
    });
});

router.post('/expire-premium', (req, res, next) => {
    var entity = {
        "ExpiredOn": custom.addDays(req.user.ExpiredOn, 7)
    };

    subscriberModel.update(req.user.SubscriberID, entity).then(count => {
        subscriberModel.getByAccID(req.user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            res.redirect('/user/info');
        });
    });
});

module.exports = router;