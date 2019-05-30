var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var createError = require('http-errors');
var hbsSections = require('express-handlebars-sections');
var moment = require('moment');
var custom = require('./public/js/custom');
var app = express();

app.use(morgan('dev'));
var hbs = exphbs.create({
    defaultLayout: 'main.hbs',
    helpers: {
        ifeq: (firstEle, secondEle, options) => {
            if (firstEle === secondEle) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },

        formatDate: date => {
            return moment(new Date(date), 'YYYY-MM-DD').format('DD/MM/YYYY');
        },  

        formatDateTime: datetime => {
            return moment(new Date(datetime), 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm');
        },

        formatArticleDateTime: articleDateTime => {
            var distance = moment(custom.getDateTimeNow()).diff(moment(articleDateTime));
            var asMinutes = parseInt(moment.duration(distance).as('minutes'));
            var asHours = parseInt(moment.duration(distance).as('hours'));

            if (asHours < 24) {
                if (asMinutes < 60) {
                    return `${asMinutes} phút trước`;
                } else {
                    return `${asHours} giờ trước`;
                }
            }
    
            return moment(articleDateTime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm DD/MM/YYYY');
        },

        next: (value) => {
            return value + 1;
        },
        
        previous: (value) => {
            return value - 1;
        },

        section: hbsSections()
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
// Đặt đường dẫn là bắt đầu từ public
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth'));
app.use(require('./middlewares/category.mdw'));
app.use(require('./middlewares/subcategories.mdw'));

app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/user', require('./routes/user'));
app.use('/article', require('./routes/article'));

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {

    var status = err.status || 500;
    var vwErr = 'home/error';

    if (status === 404) {
        vwErr = 'home/404';
    }

    process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
    var isProd = process.env.NODE_ENV === 'prod';
    var message = isProd ? 'An error has occured. Please contact administartor for more support.' : err.message;
    var error = isProd ? {} : err;

    res.status(status).render(vwErr, {
        layout: false,
        message,
        error
    });
})

var port = 4000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
