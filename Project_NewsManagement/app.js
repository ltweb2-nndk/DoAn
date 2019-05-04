var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var hbsIntl = require('handlebars-intl');
var morgan = require('morgan');
var createError = require('http-errors');
var categoryModel = require('./models/category.model');
var subcategoriesModel = require('./models/subcategories.model');
var app = express();

app.use(morgan('dev'));

// app.engine('hbs', exphbs({
//     defaultLayout: 'main.hbs'
// }));
// app.set('view engine', 'hbs');
var hbs = exphbs.create({
    defaultLayout: 'main.hbs',
    helpers : {
        calculation: value => {
            return value + 5;
        },
        ifeq : (firstEle, secondEle, options) => {
            if (firstEle == secondEle) {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        }
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

app.use(require('./middlewares/category.mdw'));
app.use(require('./middlewares/subcategories.mdw'));

app.get('/', (req, res) => {
    categoryModel.all()
        .then(rows => {
            res.render('home', {
                category: rows
            });
        });
});

var port = 4000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
