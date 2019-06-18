var lruCache = require('lru-cache');
var categoryModel = require('../models/category.model');

var cache_options = {
    max: 500,
    maxAge: 1000* 60
};
var cache = new lruCache(cache_options);

module.exports = (req, res, next) => {
    var data = cache.get('gbCategory');

    if (!data) {
        console.log('-- fetch gbCategory');
        categoryModel.all().then(rows => {
            cache.set('gbCategory', rows);
            res.locals.lcCategory = rows;
            next();
        });
    } else {
        console.log('-- catch hit for gbCategory');
        res.locals.lcCategory = data;
        next();
    }
};