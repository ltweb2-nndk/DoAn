var subCategoriesModel = require('../models/subcategories.model');

module.exports = (req, res, next) => {
    subCategoriesModel.all().then(rows => {
        res.locals.lcSubCategories = rows;
        next();
    });
};