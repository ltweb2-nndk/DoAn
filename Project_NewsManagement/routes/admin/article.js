var express = require('express');
var router = express.Router();
var articleModel = require('../../models/article.model')
var subcategoriesModel = require('../../models/subcategories.model')
var statusModel = require('../../models/status.model')
var rankModel = require('../../models/rank.model')
var editorModel = require('../../models/editor.model')
var writerModel = require('../../models/writer.model')
var config = require('../../config/default.json')
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');
var moment = require('moment');

router.get('/', restricted ,isAdmin, (req, res, next) => {
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    Promise.all([
        articleModel.count(),
        articleModel.pageByArt(start_offset),
        statusModel.all()
    ]).then(([nRows, rows,statuses]) => {
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
        res.render('article/index', {
            article: rows,
            page_number,
            statuses,
            layout: false
        })
    }).catch(next);
});

router.get('/search', (req, res, next) => {
    var timkiem=req.query.timkiem;
    var CatID=req.query.CatID;
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
   if(CatID>1)
    {
    Promise.all([
        articleModel.searchByCatCount(CatID,timkiem),
        articleModel.searchPageByCat(CatID,timkiem,start_offset),
        ]).then(([nRows, rows,rowsSub]) => {
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
        res.render('article/searchAdmin',{
            timkiem,
            article: rows,
            page_number,
            subcategories:rowsSub,
            layout: false
        })
    }).catch(next);
 }
 else 
 {
    Promise.all([
        articleModel.searchCountByKeyWord(timkiem),
        articleModel.searchPageByKeyword(timkiem,start_offset)
    ]).then(([nRows, rows,rowsSub]) => {
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
        res.render('article/searchAdmin',{
            timkiem,
            article: rows,
            page_number,
            subcategories:rowsSub,
            layout: false
        })
    }).catch(next);
 }
});
router.get('/category', (req, res, next) => {
    var entity = req.query.CatID;

    articleModel.searchByCat(entity).then(rows => {
        for (var c of res.locals.lcCategory) {
            if (c.CatID === +entity)
                c.active = true;
            else c.active = false;
        }
        res.render('article/index', {
            article: rows,
            layout: false
        });
    }).catch(next);
});

router.get('/status', (req, res, next) => {
    var statusID = req.query.StatusID;
    Promise.all([
        statusModel.all(),
        articleModel.searchByStatus(statusID)
    ]).then(([statuses,article])=>{
        res.render('article/index',{
            statuses,
            article,
            statusID,
            layout:false
        })
    })
});
router.get('/detail/:id',  (req, res, next) => {
    var entity = req.params.id;
    articleModel.single(entity).then(rows => {
        Promise.all([
            subcategoriesModel.single(rows[0].SubCatID),
            statusModel.single(rows[0].StatusID),
            rankModel.single(rows[0].RankID),
            editorModel.single(rows[0].EditorID),
            writerModel.single(rows[0].WriterID)
        ]).then(([rowsSub, rowsStatus, rowsRank, rowsEditor, rowsWriter]) => {
            res.render('article/details', {
                article: rows[0],
                subcategories: rowsSub[0],
                status: rowsStatus[0],
                rank: rowsRank[0],
                editor: rowsEditor[0],
                writer: rowsWriter[0],
                layout: false
            })
        })
    }).catch(next);
})
router.get('/edit/:id',  (req, res, next) => {
    var id = req.params.id;
    Promise.all([
        statusModel.all(),
        articleModel.single(id)
    ]).then(([
        statuses, article
    ]) => {
       article[0].ArtPostedOn=moment(new Date(article[0].ArtPostedOn), 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
        res.render('article/edit', {
            layout: false,
            statuses,
            article
        });
    }).catch(next);
})
router.post('/update', (req, res, next) => {
    var entity = req.body;
    var id = req.body.ArtID;
    delete entity.ArtID;
     entity.ArtPostedOn = moment(entity.ArtPostedOn, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
    articleModel.update(id, entity).then(n => {
        res.redirect('/admin/article');
    }).catch(next);
})
router.get('/delete', (req, res, next) => {
    var id = req.query.ArtID;
    articleModel.delete(id).then(n => {
        res.redirect('/admin/article')
    }).catch(next);
})
module.exports = router;
