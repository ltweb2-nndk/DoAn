var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var morgan = require('morgan');
var createError = require('http-errors');
var expValidator = require('express-validator');
var expSession = require('express-session');
var passportSetup = require('./config/passport-setup');
var categoryModel = require('./models/category.model');
var subcategoriesModel = require('./models/subcategories.model');
var app = express();

app.use(morgan('dev'));
var hbs = exphbs.create({
    defaultLayout: 'main.hbs',
    helpers: {
        calculation: value => {
            return value + 5;
        },
        ifeq: (firstEle, secondEle, options) => {
            if (firstEle == secondEle) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(expValidator({
    customValidators: {
        lt0: (entity) => {
            return entity <= 0;
        },
        containsSpecialCharacters: (entity) => {
            return !(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(entity));
        }
    },
    customSanitizers: {
        
    }
}));
// Đặt đường dẫn là bắt đầu từ public
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(require('./middlewares/category.mdw'));
app.use(require('./middlewares/subcategories.mdw'));
app.use(expSession({
    secret: 'i do not know',
    saveUninitialized: true,
    resave: false
    // cookie : {maxAge: 1000 * 15}
}));
app.use('/', require('./routes/home'));
app.use('/user', require('./routes/user'));

var port = 4000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
