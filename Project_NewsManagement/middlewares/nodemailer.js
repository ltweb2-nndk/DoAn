var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newsweek.project@gmail.com',
        pass: 'Newsweek2019'
    }
});

module.exports = user => {
    var htmlContent = `
        <h4>Chào ${user.Fullname},</h4>
        <h5>Mã xác nhận tài khoản của bạn là: ${user.VerifyID}.</h5>
    `;

    var mailOptions = {
        from: 'Newsweek <newsweek.project@gmail.com>',
        to: user.Username,
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
};


