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


router.get('/welcome', (req, res, next) => {

    var id = req.user.EditorID;
    console.log(req.user)
    catModel.getByID(req.user.EditorID).then(rows => {
        catModel.countArt(req.user.EditorID).then(nArt=>{
            console.log(rows);
            res.render('writer/welcome', {
                layout: 'mainWrite.hbs',
                EditorID : rows.EditorID,
                CatOfEditor: rows,
                artOfEditor: nArt
            });
        }).catch(next);
    }).catch(next);
})
// router.get('/articles',(req,res,next)=>{
//     var id = req.user.EditorID;
//     articleModel.allOfEdit(id).then(rows=>{

//     })
// })
router.get('/articlesByCat/:id', (req, res, next) => {
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
        catModel.getByID(id).then(cat=>{
            catModel.countArt(id).then(num=>{
                res.render('editor/articlesByCat', {
                    layout: 'mainWrite.hbs',
                    articles: rows,
                    page_numbers,
                    curPage: +page,
                    CatOfEditor: cat,
                    artOfEditor:num
                });
            })
            
        }).catch(next);

        console.log(nPages);
        console.log(page_numbers.length);
        console.log(rows);
        console.log(page);
        
    }).catch(next);
})

router.get('/accept/:id', (req, res) => {
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
    console.log("a" + RankID);
    var ArtPostedOn = moment(req.body.ArtPostedOn, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

    var entity1 = {
        "SubCatID": SubCatID,
        "ArtPostedOn": ArtPostedOn,
        "StatusID": 2,
        "EditorID": EditorID,
        "RankID": RankID
    }
    articleModel.edit(entity1, artID).then(n => {
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
        res.redirect(req.originalUrl);
    }).catch(next);
})

router.get('/decline/:id', (req, res, next) => {
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