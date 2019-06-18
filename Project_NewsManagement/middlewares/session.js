var session = require('express-session');

module.exports = app => {
    app.use(session({
        secret: 'i do not know',
        saveUninitialized: true,
        resave: true
    }));
};