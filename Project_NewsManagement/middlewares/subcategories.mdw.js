var lruCache = require('lru-cache');
var subCategoriesModel = require('../models/subcategories.model');

var cache_options = {
    max: 500,
    maxAge: 1000* 60
};
var cache = new lruCache(cache_options);

module.exports = (req, res, next) => {
    
    var data = cache.get('gbSubcategories');

    if (!data) {
        subCategoriesModel.all().then(rows => {
            console.log('-- fetch gbSubcategories');
            cache.set('gbSubcategories', rows);
            res.locals.lcSubCategories = rows;
            next();
        });
    } else {
        console.log('-- catch hit for gbSubcategories');
        res.locals.lcSubCategories = data;
        next();
    }
};