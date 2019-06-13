var express = require('express');
var router = express.Router();
var catModel = require('../../models/category.model');
var Promise = require('promise');
var config = require('../../config/default.json');
var articleModel = require('../../models/article.model');
var subCatModel = require('../../models/subcategories.model');
var artTagsModel = require('../../models/articleTags.model');
var moment = require('moment');
var tagModel = require('../../models/tag.model');
var restricted = require('../../middlewares/restricted');
var isEditor = require('../../middlewares/isEditor');
var custom = require('../../public/js/custom');

router.get('/welcome', restricted, isEditor, (req, res, next) => {
    catModel.getByID(req.user.EditorID).then(rows => {
        catModel.countByID.then(ncount=>{
            console.log(rows);
                res.render('writer/welcome', {
                    layout: 'mainWrite.hbs',
                    CatOfEditor: rows,
                    EditorID : rows.EditorID,
                    
                });
            }).catch(next);
        })
        
})

router.get('/articlesByCat', restricted, isEditor, (req, res, next) => {
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    Promise.all([
        articleModel.countAllDraft(),
        articleModel.pageDraft(start_offset)
    ]).then(([nRows, rows]) => {


        var total = nRows.total;
        var nPages = Math.floor(total / lim);
        if (total % lim > 0) {
            nPages++;
        }
        var page_numbers = [];
        for (i = 1; i <= nPages; i++) {
            page_numbers.push({
                value: i,
                active: i === +page
            })
        }
        var id = req.user.EditorID;
        console.log(req.user)
        catModel.getByID(id).then(Numb=>{
            res.render('editor/articlesByCat', {
                layout: 'mainWrite.hbs',
                articles: rows,
                page_numbers,
                curPage: +page,
                CatOfEditor: total
            });
        })

        console.log(nPages);
        console.log(page_numbers.length);
        console.log(rows);
        console.log(page);
        
    }).catch(next);
})

router.get('/articlesByCat/:id', restricted, isEditor, (req, res, next) => {
    var catID = req.params.id;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    Promise.all([
        articleModel.countDraftByCat(catID),
        articleModel.pageByCat(catID, start_offset)
    ]).then(([nRows, rows]) => {


        var total = nRows[0].total;
        var nPages = Math.floor(total / lim);
        if (total % lim > 0) {
            nPages++;
        }
        var page_numbers = [];
        for (i = 1; i <= nPages; i++) {
            page_numbers.push({
                value: i,
                active: i === +page
            })
        }
        var id = req.user.EditorID;
        console.log(req.user)
        catModel.getByID(id).then(Numb=>{
            res.render('editor/articlesByCat', {
                layout: 'mainWrite.hbs',
                catName: rows[0].CatName,
                articles: rows,
                page_numbers,
                curPage: +page,
                CatOfEditor: Numb
            });
        })

        console.log(nPages);
        console.log(page_numbers.length);
        console.log(rows);
        console.log(page);
        
    }).catch(next);
})

router.get('/accept/:id', restricted, isEditor, (req, res) => {
    var artID = req.params.id;
    articleModel.getByArtID(artID).then(rows => {
        var catID = rows[0].CatID;
        subCatModel.allByCatID(catID).then(rowSub => {
            artTagsModel.getArticleTags(artID).then(rowsTag => {
                res.render('editor/acceptArt', {
                    layout: false,
                    article: rows,
                    subCat: rowSub,
                    artTags: rowsTag
                });
            }).catch(next);
        })

    })

})

router.post('/accept/:id', (req, res, next) => {
    var artID = req.params.id;
    var SubCatID = req.body.SubCatID;
    var EditorID = req.body.EditorID;
    var RankID = req.body.RankID;
    var ArtPostedOn = moment(req.body.ArtPostedOn, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    
    var entity = {
        "SubCatID": SubCatID,
        "ArtPostedOn": ArtPostedOn,
        "StatusID": 3,
        "EditorID": EditorID,
        "RankID": RankID
    }
    articleModel.update(artID, entity).then(n => {
        var tags = req.body.TagName.split(',');
        tags.forEach(element => {
            tagModel.add(element).then(id => {
                var entity = {
                    "ArtID": artID,
                    "TagID": id
                };
                console.log(entity);
                artTagsModel.delete(artID).then(id => {
                    artTagsModel.add(entity).then(count => {
                        
                    }).catch(next);
                }).catch(next);

            }).catch(next);
        });
        res.redirect('/editor/welcome');
    }).catch(next);
})

router.get('/decline/:id', restricted, isEditor, (req, res, next) => {
    var artID = req.params.id;
    articleModel.getByArtID(artID).then(rows => {
        res.render('editor/declineArt', {
            layout: false,
            article: rows
        });
    }).catch(next);
})

router.post('/decline/:id', (req, res, next) => {
    var artID = req.params.id;
    var entity = {
        "StatusID": 4
    }
    articleModel.update( artID,entity).then(n => {
        res.redirect(req.originalUrl);
    }).catch(next);
})

module.exports = router;