var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var createError = require('http-errors');
var moment=require('moment');
var app = express();


app.use(morgan('dev'));
var hbs = exphbs.create({
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
        },
    formatDate:date=>{
    return moment(new Date(date),'YYYY-MM-DD').format('DD/MM/YYYY');
    },
    formatDateTime:date=>{
    return moment(new Date(datetime),'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm');
    },
  }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(require('./middlewares/category.mdw'));
app.use(require('./middlewares/subcategories.mdw'));
app.use(require('./middlewares/status.mdw'));
app.use(require('./middlewares/rank.mdw'));
app.use(require('./middlewares/role.mdw'));

app.use('/admin',require('./routes/admin'));
app.use('/admin/category',require('./routes/category'));
app.use('/admin/subCategory',require('./routes/subCategory'));
app.use('/admin/tag',require('./routes/tag'));
app.use('/admin/article',require('./routes/article'));
app.use('/admin/user',require('./routes/user'));
app.use('/admin/account',require('./routes/account'));
var port = 5016;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
