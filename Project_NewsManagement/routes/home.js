var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var passport = require('passport');
var helpersFunc = require('../public/js/custom');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
var articleModel = require('../models/article.model');
var roleModel = require('../models/role.model');
var router = express.Router();
var writeModel = require('../models/writer.model');


const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newsweek.project@gmail.com',
        pass: 'Newsweek2019'
    }
});

router.get('/', (req, res) => {
    res.render('home/index', {
        user: req.session.user,
        userExistence: req.session.userExistence
    });
});

router.get('/register', (req, res) => {
    var day = [];
    for (i = 1; i <= 31; i++) {
        day.push({
            value: i
        });
    }
    var month = [];
    for (i = 1; i <= 12; i++) {
        month.push({
            value: i
        });
    }
    var date = new Date();
    var year = [];
    for (i = 1900; i <= date.getFullYear(); i++) {
        year.push({
            value: i
        });
    }

    res.render('home/register', {
        day, month, year,
        success: req.session.success,
        errors: req.session.errors,
        subErrors: req.session.subErrors
    });

    req.session.errors = null;
    req.session.success = null,
    req.session.subErrors = null;
});

router.post('/register', async (req, res) => {
    req.session.subErrors = [];

    await accountModel.checkUsernameExistence(req.body.Username).then(rows => {
        if (rows.length) {
            req.session.subErrors.push({
                err: "Địa chỉ email đã tồn tại."
            });
        }
    });

    if (req.body.Day != null && req.body.Month != null && req.body.Year != null) {
        if (!helpersFunc.isDate(req.body.Day, req.body.Month,req.body.Year)) {
            req.session.subErrors.push({
                err: "Ngày sinh không hợp lệ."
            })
        }
    }

    req.check('Username')
        .notEmpty().withMessage('Vui lòng nhập địa chỉ email.')
        .isEmail().withMessage('Địa chỉ email không hợp lệ.');
    req.check('Fullname')
        .notEmpty().withMessage('Vui lòng nhập tên hiển thị.')
        .containsSpecialCharacters(req.body.Fullname).withMessage('Tên hiển thị chỉ chứa chữ và khoảng trắng.');
    req.check('Password')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu.')
        .len(6, 20).withMessage('Mật khẩu từ 6-20 kí tự.');
    req.check('ConfirmPassword')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu xác nhận.')
        .equals(req.body.Password).withMessage('Mật khẩu xác nhận không đúng.');
    req.check('Day', 'Vui lòng chọn ngày sinh.').notEmpty();
    req.check('Month', 'Vui lòng chọn tháng sinh.').notEmpty();
    req.check('Year', 'Vui lòng chọn năm sinh.').notEmpty();

    //Thêm "true" vào để lấy cái lỗi đầu tiên, không cần trả hết lỗi.
    var errors = req.validationErrors(true);
    if (errors) {
        req.session.errors = errors;
    } 

    if (!errors && !req.session.subErrors.length) {
        req.body.VerifyID = Math.floor(100000 + Math.random() * 900000);
        req.body.Password = bcrypt.hashSync(req.body.Password, saltRounds);

        accountModel.add(req.body).then(AccID => {
            console.log(`- From account table: ${AccID} added.`);

            req.body.AccID = AccID;
            subscriberModel.add(req.body).then(SubID => {
                console.log(`- From subscriber table: ${SubID} added.`);
            });

            var htmlContent = `
                <h4>Chào ${req.body.Fullname},</h4>
                <h5>Mã xác nhận tài khoản của bạn là: ${req.body.VerifyID}.</h5>
            `;

            var mailOptions = {
                from: 'Newsweek <newsweek.project@gmail.com>',
                to: req.body.Username,
                subject: 'Báo mạng điện tử Newsweek',
                html: htmlContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });

        req.session.success = true;
    }

    res.redirect('/register');
});

router.get('/verify', (req, res) => {
    res.render('home/verify');
})

router.get('/login', (req, res) => {
    res.render('home/login', {
        errors: req.session.errors,
        subErrors: req.session.subErrors
    });

    req.session.errors = null;
    req.session.subErrors = null;
});

router.post('/login', async (req, res) => {
    req.session.subErrors = [];

    await accountModel.checkUsernameExistence(req.body.Username).then(accRows => {
        if (!accRows.length) {
            req.session.subErrors.push({
                err: "Địa chỉ email chưa đăng ký."
            });
        } else {
            var user = accRows[0];
            var match = bcrypt.compareSync(req.body.Password, user.Password);
            console.log(req.body.Password);
            console.log(user.Password);
            
            if (match) {
                roleModel.getByRoleID(user.RoleID).then(roleRows => {
                    var userRole = roleRows[0].RoleName;

                    if (userRole == 'Subscriber') {
                        subscriberModel.getByAccID(user.AccID).then(subRows => {
                            req.session.user = subRows[0];
                            req.session.userExistence = true;
                            res.redirect('/');
                        });
                    } else if (userRole == 'Writer') {
                        writeModel.getByAccID(user.AccID).then(writerRows=>{
                            req.session.user = writerRows[0];
                            req.session.userExistence = true;
                            res.redirect('/writer');
                        })
                    } else if (userRole == 'Editor') {
                        // như Writer
                    } else {
                        // phần của Admin
                        // như Writer
                    }
                });
            } else {
                req.session.subErrors.push({
                    err: "Mật khẩu không đúng."
                });
            }
        }
    });

    req.check('Username')
        .notEmpty().withMessage('Vui lòng nhập địa chỉ email.')
        .isEmail().withMessage('Địa chỉ email không hợp lệ.');
    req.check('Password', 'Vui lòng nhập mật khẩu').notEmpty();

    var errors = req.validationErrors(true);
    if (errors || req.session.subErrors.length) {
        req.session.errors = errors;

        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.user = null;
    req.session.userExistence = null;

    res.redirect('/login');
});

router.get('/article/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {

    }

    articleModel.getByArtID(id).then(rows => {
        if (rows.length) {
            console.log(rows[0]);
            
            rows[0].ArtPostedOn = helpersFunc.formatDateTime(rows[0].ArtPostedOn);
            res.render('home/article', {
                article: rows[0],
                user: req.session.user,
                userExistence: req.session.userExistence 
            });
        } else {

        }
    });
});

// router.get('/login/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// router.get('/login/google/redirect', passport.authenticate('google'), (req, res) => {
//     res.send('You reached the callback URL')
// });

module.exports = router;