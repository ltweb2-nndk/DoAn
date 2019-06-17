var express = require('express');
var router = express.Router();
var categoryModel = require('../../models/category.model')
var subcategoryModel = require('../../models/subcategories.model')
var config = require('../../config/default.json')
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');

router.get('/', restricted ,isAdmin,(req, res, next) => {
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

router.get('/search', (req, res, next) => {
    var timkiem=req.query.timkiem;
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    Promise.all([
        categoryModel.countByKeyword(timkiem),
        categoryModel.pageByKeyword(timkiem,start_offset)
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
        res.render('category/search', {
            timkiem,
            category: rows,
            page_number,
            layout: false
        })
    }).catch(next);
});

router.get('/add',  (req, res) => {
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

router.get('/edit/:id',  (req, res, next) => {
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
    if(req.body.CatIsActive==1)
    {
        subcategoryModel.singles(entity.CatID).then(rows => {
            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].SubCatIsActive = 1;
                    subcategoryModel.update(rows[i]);
                }
            }
        }).catch(next);    
    }
   else  if(req.body.CatIsActive==0)
    {
        subcategoryModel.singles(entity.CatID).then(rows => {
            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].SubCatIsActive = 0;
                    subcategoryModel.update(rows[i]);
                }
            }
        }).catch(next);    
    }
    categoryModel.update(entity).then(n => {
        res.redirect('/admin/category')
    }).catch(next);
})

router.get('/delete',  (req, res, next) => {
    var entity = {
        CatID: req.query.CatID,
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

router.get('/detail/:id',  (req, res, next) => {
    var entity = req.params.id;
    var CatName=req.query.CatName;
    subcategoryModel.singles(entity).then(rows => {
        res.render('category/detail', {
            subcategories: rows,
            CatID: entity,
            CatName,
            layout: false
        });
    }).catch(next);
})
router.get('/detail/:id/add',(req,res,next)=>{
    var entity = req.params.id;
    res.render('subCategory/add', {
        CatID: entity,
        layout: false
    });
})

module.exports = router;