var express = require('express');
var router = express.Router();
var categoryModel = require('../../models/category.model')
var subcategoryModel = require('../../models/subcategories.model')
var config = require('../../config/default.json')
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');

router.get('/', restricted, isAdmin, (req, res, next) => {
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    Promise.all([
        categoryModel.count(),
        categoryModel.pageByCat(start_offset)
    ]).then(([nRows, rows]) => {
        var total = nRows[0].total;
        var nPage = Math.floor(total / limit);

        if (total % limit > 0) nPage++;

        var page_number = [];
        for (i = 1; i <= nPage; i++) {
            page_number.push({
                value: i,
                active: i === +page
            })
        }
        res.render('category/index', {
            category: rows,
            page_number,
            layout: false
        })
    }).catch(next);
});

router.post('/', (req, res, next) => {
    var entity = req.body;
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    Promise.all([
        categoryModel.count(),
        categoryModel.search(entity.timkiem)
    ]).then(([nRows, rows]) => {
        var total = nRows[0].total;
        var nPage = Math.floor(total / limit);

        if (total % limit > 0) nPage++;

        var page_number = [];
        for (i = 1; i <= nPage; i++) {
            page_number.push({
                value: i,
                active: i === +page
            })
        }
        res.render('category/index', {
            category: rows,
            page_number,
            layout: false
        })
    }).catch(next);
});

router.get('/add', restricted, isAdmin, (req, res) => {
    res.render('category/add', {
        layout: false
    });
});

router.post('/add', (req, res, next) => {
    var entity = req.body;
    categoryModel.insert(entity).then(id => {
        res.redirect('/admin/category');
    }).catch(next);
});

router.get('/is-available', (req, res) => {
    var CatName = req.query.catname;
    categoryModel.singleByCatName(CatName).then(rows => {
        if (rows.length > 0)
            res.json(false);
        else res.json(true);
    })
})

router.get('/edit/:id', restricted, isAdmin, (req, res, next) => {
    var id = req.params.id;
    categoryModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('category/edit', {

                success: true,
                category: rows[0],
                layout: false,
            });
        } else {
            res.render('category/edit', {
                success: false
            });
        }
    }).catch(next);
});

router.post('/update', (req, res, next) => {
    var entity = req.body;
    categoryModel.update(entity).then(n => {
        res.redirect('/admin/category')
    }).catch(next);
})

router.get('/delete/:id', restricted, isAdmin, (req, res, next) => {
    var entity = {
        CatID: req.params.id,
        CatIsActive: 0
    };
    subcategoryModel.singles(entity.CatID).then(rows => {
        if (rows.length > 0) {
            for (var i = 0; i < rows.length; i++) {
                rows[i].SubCatIsActive = 0;
                subcategoryModel.update(rows[i]);
            }
        }
    }).catch(next);
    categoryModel.update(entity).then(n => {
        res.redirect('/admin/category');
    }).catch(next);
})

router.get('/detail/:id', restricted, isAdmin, (req, res, next) => {
    var entity = req.params.id;
    subcategoryModel.singles(entity).then(rows => {
        res.render('category/detail', {
            subcategories: rows,
            CatID: entity,
            layout: false
        });
    }).catch(next);
})

module.exports = router;