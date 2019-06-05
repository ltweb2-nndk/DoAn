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
        checkStatus: (val, options) => {
            if (Number(val) == 1) {
                return options.fn(this);
            } else if(Number(val) == 4){
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        },
        formatDatefromDB:(date)=>{
            return moment(date).format("DD/MM/YYYY hh:mm:ss");
        },
        format:(date)=>{
            return moment(date).format("YYY-MM-DD hh:mm:ss");
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
app.use(require('./middlewares/status.mdw'));
app.use(require('./middlewares/rank.mdw'));
app.use(require('./middlewares/role.mdw'));
require('./middlewares/upload')(app);


app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/user', require('./routes/user'));
app.use('/article', require('./routes/article'));
app.use('/', require('./routes/home'));
app.use('/user', require('./routes/user'));
app.use('/writer',require('./routes/writer'));
app.use('/admin',require('./routes/admin'));
app.use('/admin/category',require('./routes/category'));
app.use('/admin/subCategory',require('./routes/subCategory'));
app.use('/admin/tag',require('./routes/tag'));
app.use('/admin/article',require('./routes/article'));
app.use('/admin/user',require('./routes/user'));
app.use('/admin/account',require('./routes/account'));
app.use('/editor',require('./routes/editor'));

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
