var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newsweek.project@gmail.com',
        pass: 'Newsweek2019'
    }
});

var mailOptions = {
    from: 'Newsweek <newsweek.project@gmail.com>',
    to: `tandatng163@gmail.com`,
    subject: 'Báo mạng điện tử Newsweek',
    text: `Chào Nguyen Dat, bạn đã đăng ký thành công!`,
    html: `<h5>Xác nhận đăng ký, bạn hãy nhấn <a href="http://localhost:4000/">vào đây</a> để hoàn thành đăng ký.</h5>`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});