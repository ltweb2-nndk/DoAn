var express = require('express');
var subcategoryModel = require('../../models/subcategories.model')
var router = express.Router();
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');


router.get('/edit/:id',  (req, res, next) => {
    var entity = req.params.id;
    var CatName=req.query.CatName;
    subcategoryModel.single(entity).then(rows => {
        res.render('subCategory/edit', {
            subcategories: rows[0],
            CatName,
            layout: false
        });
    }).catch(next);
})

router.post('/update', (req, res, next) => {
    var entity = req.body;
    var CatName=req.body.CatName;
    delete entity.CatName;
    subcategoryModel.update(entity).then(n => {
        res.redirect(`/admin/category/detail/${entity.CatID}?CatName=${CatName}`)
    }).catch(next);
})
router.post('/delete',  (req, res, next) => {
    var entity = {
        SubCatID: req.body.SubCatID,
        SubCatIsActive: 0
    };
    console.log(req.body.CatName);
    subcategoryModel.update(entity).then(n => {
        res.redirect(`/admin/category/detail/${req.body.CatID}?CatName=${req.body.CatName}`)
    }).catch(next);
})

router.post('/add', (req, res, next) => {
    var entity = req.body;
    subcategoryModel.insert(entity).then(id => {
        res.redirect(`/admin/category/detail/${entity.CatID}`);
    }).catch(next);
})

module.exports = router;