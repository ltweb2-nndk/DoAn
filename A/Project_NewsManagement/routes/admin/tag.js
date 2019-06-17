var express = require('express');
var tagModel = require('../../models/tag.model')
var config = require('../../config/default.json')
var router = express.Router();
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');

router.get('/',restricted ,isAdmin,  (req, res, next) => {
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    Promise.all([
        tagModel.count(),
        tagModel.pageByTag(start_offset)
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
        res.render('tag/index', {
            tag: rows,
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
        tagModel.countByKeyword(timkiem),
        tagModel.pageByKeyword(timkiem,start_offset)
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
        res.render('tag/search', {
            timkiem,
            tag: rows,
            page_number,
            layout: false
        })
    }).catch(next);
});
router.get('/add',  (req, res) => {
    res.render('tag/add', {
        layout: false
    });
});
router.post('/add', (req, res, next) => {
    var entity = req.body;
    tagModel.insert(entity).then(id => {
        res.redirect('/admin/tag');
    }).catch(next);
});
router.get('/is-available', (req, res, next) => {
    var TagName = req.query.TagName;
    tagModel.singlebyname(TagName).then(rows => {
        if (rows.length > 0)
            res.json(false);
        else res.json(true);
    })
})
router.get('/edit/:id',  (req, res, next) => {
    var id = req.params.id;
    tagModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('tag/edit', {

                success: true,
                Tag: rows[0],
                layout: false,
            });
        } else {
            res.render('tag/edit', {
                success: false
            });
        }
    }).catch(next);
});
router.post('/update', (req, res, next) => {
    var entity = req.body;
    tagModel.update(entity).then(n => {
        res.redirect('/admin/tag')
    }).catch(next);
});
router.get('/delete',  (req, res, next) => {
    var id = req.query.TagID;
    tagModel.delete(id).then(n => {
        res.redirect('/admin/tag')
    }).catch(next);
});

module.exports = router;