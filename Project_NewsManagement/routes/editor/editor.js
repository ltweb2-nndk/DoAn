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

router.get('/welcome', restricted, isEditor, (req, res, next) => {
    var id = req.user.EditorID;
    console.log(req.user)
    catModel.getByID(req.user.EditorID).then(rows => {
        catModel.countArt(req.user.EditorID).then(nArt => {
            articleModel.countAllDraft(id).then(nAll => {
                articleModel.countArtEdited(id).then(n => {

                    console.log(n[0].nArt);
                    res.render('writer/welcome', {
                        layout: 'mainWrite.hbs',
                        EditorID: rows.EditorID,
                        CatOfEditor: rows,
                        artOfEditor: nArt,
                        totalAll: nAll[0].total,
                        nEdited: n[0].nArt
                    });
                })

            })

        }).catch(next);
    }).catch(next);
})
router.get('/articles', restricted, isEditor, (req, res, next) => {
    var id = req.user.EditorID;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    Promise.all([
        articleModel.countAllDraft(id), //return total
        articleModel.pageAll(id, start_offset), //return articles
        articleModel.countArtEdited(id)
    ]).then(([nrow, row, n]) => {
        var total = nrow[0].total;
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
        catModel.getByID(id).then(cat => {
            catModel.countArt(id).then(avc => {
                res.render('editor/articlesByCat', {
                    layout: 'mainWrite.hbs',
                    articles: row,
                    page_numbers,
                    curPage: +page,
                    totalAll: total,
                    CatOfEditor: cat,
                    artOfEditor: avc,
                    nEdited: n[0].nArt
                });
            }).catch(next);
        }).catch(next);
    })
})

router.get('/Edited_Articles', restricted, isEditor, (req, res, next) => {
    var id = req.user.EditorID;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    Promise.all([
        articleModel.countArtEdited(id), //return total
        articleModel.pageArtEdited(id, start_offset), //return articles
    ]).then(([nPage, nArt]) => {
        var total = nPage[0].nArt;
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

        catModel.getByID(id).then(cat => {
            catModel.countArt(id).then(avc => {
                res.render('editor/articlesByCat', {
                    layout: 'mainWrite.hbs',
                    articles: nArt,
                    page_numbers,
                    curPage: +page,
                    totalAll: total,
                    CatOfEditor: cat,
                    artOfEditor: avc,
                    nEdited: nPage[0].nArt
                });
            }).catch(next);
        }).catch(next);
    })
})
router.get('/articlesByCat/:id', restricted, isEditor, (req, res, next) => {
    var catID = req.params.id;
    var id = req.user.EditorID;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    Promise.all([
        articleModel.countDraftByCat(catID),
        articleModel.pageByCat(catID, start_offset),
        articleModel.countAllDraft(id),
        articleModel.countArtEdited(id)
    ]).then(([nRows, rows, nAll, n]) => {


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

        console.log(req.user)
        catModel.getByID(id).then(cat => {
            catModel.countArt(id).then(num => {
                res.render('editor/articlesByCat', {
                    layout: 'mainWrite.hbs',
                    articles: rows,
                    page_numbers,
                    curPage: +page,
                    CatOfEditor: cat,
                    artOfEditor: num,
                    totalAll: nAll[0].total,
                    nEdited: n[0].nArt
                });
            })

        }).catch(next);
    }).catch(next);
})

router.get('/accept/:id', restricted, isEditor, (req, res, next) => {
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
    var EditorID = req.user.EditorID;
    var RankID = req.body.RankID;
    console.log(EditorID);
    var ArtPostedOn = moment(req.body.ArtPostedOn, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

    var entity1 = {
        "SubCatID": SubCatID,
        "ArtPostedOn": ArtPostedOn,
        "StatusID": 2,
        "EditorID": EditorID,
        "RankID": RankID
    }
    articleModel.update(artID, entity1).then(n => {
        var tags = req.body.TagName.split(',');
        tags.forEach(element => {
            tagModel.add(element).then(id => {
                var entity = {
                    "ArtID": artID,
                    "TagID": id
                };
                console.log(entity);
                artTagsModel.delete(artID).then(id => {
                    artTagsModel.add(entity).then();
                }).catch(next);

            }).catch(next);
        });
        res.redirect('/editor/Edited_Articles');
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
    var EditorID = req.user.EditorID;
    var entity = {
        "StatusID": 4,
        "EditorID": EditorID,
    }
    articleModel.update(artID, entity).then(n => {
        res.redirect('/editor/Edited_Articles');
    }).catch(next);
})

module.exports = router;