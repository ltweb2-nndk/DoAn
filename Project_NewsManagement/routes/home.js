var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
var router = express.Router();

const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newsweek.project@gmail.com',
        pass: 'Newsweek2019'
    }
});

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register', {
        success: req.session.success,
        errors: req.session.errors,
        existedEmail: req.session.existedEmail
    });

    req.session.errors = null;
    req.session.success = null,
    req.session.existedEmail = null;
});

router.post('/register', async (req, res) => {
    var countEmail = 0;
    await accountModel.getByUsername(req.body.Username).then(count => {
        if (count == 1) {
            countEmail = count;
            req.session.existedEmail = true;
        }
    });

    req.check('Username')
        .notEmpty().withMessage('Vui lòng nhập địa chỉ email.')
        .isEmail().withMessage('Địa chỉ email không hợp lệ.');
    req.check('Fullname')
        .notEmpty().withMessage('Vui lòng nhập tên hiển thị.')
        .containsSpecialCharacters(req.body.Fullname).withMessage('Tên hiển thị chỉ chứa chữ và khoảng trắng.');
    req.check('Password')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu.')
        .len(6, 20).withMessage('Mật khẩu từ 6-20 kí tự.');
    req.check('passwordconfirm')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu xác nhận.')
        .equals(req.body.Password).withMessage('Mật khẩu xác nhận không đúng.');
    req.check('DOB', 'Vui lòng nhập ngày sinh.').notEmpty();
    //Thêm "true" vào để lấy cái lỗi đầu tiên, không cần trả hết lỗi.
    var errors = req.validationErrors(true);
    if (errors) {
        req.session.errors = errors;
    } else {
        if (countEmail == 0) {
            req.body.Password = bcrypt.hashSync(req.body.Password, saltRounds);
            accountModel.add(req.body).then(AccID => {
                console.log(`- From account table: ${AccID} added.`);

                req.body.AccID = AccID;
                subscriberModel.add(req.body).then(SubID => {
                    console.log(`- From subscriber table: ${SubID} added.`);
                });

                var htmlContent = `
                    <h4>Chào ${req.body.Fullname}</h4>
                    <h5>Xác nhận đăng ký, bạn hãy nhấn <a href="http://localhost:4000/verify/${AccID}">vào đây</a> để hoàn thành đăng ký.</h5>
                `;

                var mailOptions = {
                    from: 'Newsweek <newsweek.project@gmail.com>',
                    to: req.body.Username,
                    subject: 'Báo mạng điện tử Newsweek',
                    text: `Chào Nguyen Dat, bạn đã đăng ký thành công!`,
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
    }

    res.redirect('/register');
});

router.get('/login', (req, res) => {
    res.send('Hello cô gái Hiền');
});

router.get('/verify/:id', (req, res) => {
    var id = req.params.id;

    // if (isNaN(id)) {
    //     res.render('categories/edit', {
    //         error: true 
    //      });
    //     return;
    // }

    accountModel.verify(id).then(rows => {
        res.render('verify');
        console.log(`- Account with AccID = ${id} verified.`)
    })
});

module.exports = router;