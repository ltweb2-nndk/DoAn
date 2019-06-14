var express = require('express');
var subcategoryModel = require('../../models/subcategories.model')
var router = express.Router();
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');


router.get('/edit/:id', restricted, isAdmin, (req, res, next) => {
    var entity = req.params.id;
    subcategoryModel.single(entity).then(rows => {
        res.render('subCategory/edit', {
            subcategories: rows[0],
            layout: false
        });
    }).catch(next);
})

router.post('/update', (req, res, next) => {
    var entity = req.body;
    subcategoryModel.update(entity).then(n => {
        res.redirect(`/admin/category/detail/${entity.CatID}`)
    }).catch(next);
})
router.get('/delete/:id', restricted, isAdmin, (req, res, next) => {
    var entity = {
        SubCatID: req.params.id,
        SubCatIsActive: 0
    };
    subcategoryModel.update(entity).then(n => {
        res.send('<center><h1>Xóa thành công</h1><center>')
    }).catch(next);
})

router.get('/add/:id', restricted, isAdmin, (req, res) => {
    var entity = req.params.id;
    res.render('subCategory/add', {
        CatID: entity,
        layout: false
    });
})
router.post('/add/:id', (req, res, next) => {
    var entity = req.body;
    subcategoryModel.insert(entity).then(id => {
        res.redirect(`/admin/category/detail/${entity.CatID}`);
    }).catch(next);
})

module.exports = router;