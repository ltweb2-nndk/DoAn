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
//upload file
var bodyParser = require('body-parser');
var multer  =   require('multer');
var fs = require('fs')
var path = require('path')
var crypto = require('crypto');
        //folder upload
var storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
      })
    }
  })
  var upload = multer({ storage: storage });
//  

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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(require('./middlewares/category.mdw'));
app.use(require('./middlewares/subcategories.mdw'));
app.use(require('./middlewares/status.mdw'));
app.use(require('./middlewares/rank.mdw'));
app.use(expSession({
    secret: 'i do not know',
    saveUninitialized: true,
    resave: false
    // cookie : {maxAge: 1000 * 15}
}));
app.use('/', require('./routes/home'));
app.use('/user', require('./routes/user'));
app.use('/writer',require('./routes/writer'));

//show all images in folder upload to json
app.get('/files', function (req, res) {
    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images){
        if(item.split('.').pop() === 'png'
        || item.split('.').pop() === 'jpg'
        || item.split('.').pop() === 'jpeg'
        || item.split('.').pop() === 'svg'){
            var abc = {
                  "image" : "/upload/"+item,
                  "folder" : '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
  })
//upload image to folder upload
  app.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
      res.redirect('back')
  });
//delete image
  app.post('/delete_file', function(req, res, next){
  	var url_del = 'public' + req.body.url_del
    console.log(url_del)
  	if(fs.existsSync(url_del)){
  		fs.unlinkSync(url_del)
  	}
      res.redirect('back')
  });

var port = 5016;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
