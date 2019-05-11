var express = require('express');
var bcrypt = require('bcrypt');
var helpersFunc = require('../public/js/custom');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
var router = express.Router();

router.get('/info', (req, res) => {
    req.session.user.DOB = helpersFunc.formatDate(req.session.user.DOB);
    console.log(req.session.user);
    res.render('user/info', {
        user: req.session.user,
        userExistence: req.session.userExistence
    });
});

module.exports = router;