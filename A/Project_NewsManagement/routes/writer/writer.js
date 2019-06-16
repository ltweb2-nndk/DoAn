var express = require('express');
var router = express.Router();
var articleModel = require('../../models/article.model');
var artTagsModel = require('../../models/articleTags.model');
var Promise = require('promise');
var config = require('../../config/default.json');
var tagModel = require('../../models/tag.model');
var subCatModel = require('../../models/subcategories.model');
var restricted = require('../../middlewares/restricted');
var custom = require('../../public/js/custom');
var isWriter = require('../../middlewares/isWriter');

router.get('/welcome', restricted, isWriter, (req, res, next) => {
    console.log(req.user);
    res.render('writer/welcome', {
        layout: 'mainWrite.hbs'
    });
})

router.get('/add', restricted, isWriter, (req, res, next) => {
    res.render('writer/addArticle', {
        layout: 'mainWrite.hbs'
    });
})

router.post('/add', restricted, (req, res, next) => {
    console.log(req.body);
    var article = req.body;
    articleModel.add(article).then(id => {
        var artID = id;
        var tags = article.TagName.split(',');

        tags.forEach(x => {
            tagModel.add(x).then(id => {
                var entity = {
                    "ArtID": artID,
                    "TagID": id
                };
                console.log(entity);
                artTagsModel.add(entity)
                .then()
                .catch(next);
            }).catch(next);
            
        })
        req.session.success = true;
        res.redirect('/writer/add');
    }).catch(next);

})

router.get('/articlesByStatus/:id', isWriter, (req, res, next) => {
    var id = req.params.id;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) {
        page = 1;
    }
    var start_offset = (page - 1) * lim;
    console.log(start_offset);
    Promise.all([
        articleModel.countByStatus(id),
        articleModel.pageByStatus(id, start_offset)
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

        console.log(nPages);
        console.log(page_numbers.length);
        console.log(nRows);
        console.log(page);
        res.render('writer/articlesByStatus', {
            layout: 'mainWrite.hbs',
            stusName: rows[0].StatusName,
            articles: rows,
            page_numbers,
            curPage: +page,
        });
    }).catch(next);
})

router.get('/edit/:id', restricted, isWriter, (req, res, next) => {
    var id = req.params.id;
    Promise.all([articleModel.getSomeByID(id), artTagsModel.getArticleTags(id)])
        .then(([rowsArt, rowsTag]) => {
            // console.log(rowsArt[0]);
            // console.log(rowsArt);
            // console.log(rowsTag);
            var catID = rowsArt[0].CatID;
            console.log(catID)
            subCatModel.allByCatID(catID).then(rowsCat => {
                console.log(rowsCat)
                res.render('writer/editArticle', {
                    layout: 'mainWrite.hbs',
                    articles: rowsArt[0],
                    artTags: rowsTag,
                    subCat: rowsCat
                });
            }).catch(next);

        }).catch(next);
})

router.post('/edit/:id', restricted, (req, res, next) => {
    var artID = req.params.id;
    var article = req.body;
    var avatar = req.body.avaArt;
    console.log('ád'+ avatar);
    // Phần cũ của Đào:
    //articleModel.update(article)

    // Phần Đạt bổ sung
    delete article.ArtID;
    article.ArtCreatedOn = custom.getDateTimeNow();
    article.StatusID = 1;
    // /Phần Đạt bổ sung
    
    articleModel.update(artID, article)
        .then(nRows => {
    
            
            var tags = req.body.TagName.split(',');
            tags.forEach(element => {
                tagModel.add(element).then(id => {
                    var entity = {
                        "ArtID": artID,
                        "TagID": id
                    };
                    artTagsModel.delete(artID).then(id => {
                        artTagsModel.add(entity).then().catch(next);
                    }).catch(next);

                }).catch(next);
            });
            console.log(nRows)
            res.redirect('/writer/welcome');
        }).catch(next);
})

module.exports = router;