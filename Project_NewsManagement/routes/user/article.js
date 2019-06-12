var express = require('express');
var restricted = require('../../middlewares/restricted');
var verify = require('../../middlewares/verify');
var articleModel = require('../../models/article.model');
var articalTagsModel = require('../../models/articletags.model');
var categoryModel = require('../../models/category.model');
var subcategoriesModel = require('../../models/subcategories.model');
var subscriberModel = require('../../models/subscriber.model');
var config = require('../../config/default.json');
var custom = require('../../public/js/custom');
var router = express.Router();

router.get('/search', (req, res, next) => {
    res.locals.lcCategory.forEach(x => {
        x.active = false;
    });
    res.locals.lcSubCategories.forEach(x => {
        x.active = false;
    });

    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 0 || isNaN(page)) page = 1;
    var start_offset = (page - 1) * lim;
    var keyword = req.query.keyword || '';

    Promise.all([
        articleModel.countByKeyword(keyword),
        articleModel.pagingByKeyword(keyword, start_offset)
    ]).then(([
        nRows, articles,
    ]) => {
        var total = nRows[0].total;
        var pages = (total % lim == 0) ? (total / lim) : (total / lim + 1);
        var totalPages = [];
        for (i = 1; i <= pages; i++) {
            totalPages.push({
                value: i,
                active: i == page
            });
        }

        res.render('article/search', {
            keyword, total, articles, totalPages,
            page: +page,
            previousInactive: page == 1,
            nextInactive: page == pages || total == 0
        });
    }).catch(next);
    
});

router.get('/premium', restricted, verify, (req, res, next) => {
    res.locals.lcCategory.forEach(x => {
        x.active = false;
    });
    res.locals.lcSubCategories.forEach(x => {
        x.active = false;
    });

    //var lim = config.paginate.default;
    var lim = 5;
    var page = req.query.page || 1;
    if (page < 0 || isNaN(page)) page = 1;
    var start_offset = (page - 1) * lim;

    Promise.all([
        articleModel.countPremium(),
        articleModel.pagingPremium(start_offset)
    ]).then(([
        nRows, articles
    ]) => {
        var total = nRows[0].total;
        var pages = (total % lim == 0) ? (total / lim) : (total / lim + 1);
        var totalPages = [];
        for (i = 1; i <= pages; i++) {
            totalPages.push({
                value: i,
                active: i == page
            });
        }

        res.render('article/premium', {
            articles, totalPages,
            page: +page,
            previousInactive: page == 1,
            nextInactive: page == pages || total == 0
        });
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    if (isNaN(id)) {

    }

    articleModel.getByArtID(id).then(rows => {
        if (rows.length) {
            var article = rows[0];

            if (article.RankID == 2) {
                if (!req.user) return res.redirect(`/account/login?originalURL=${req.originalUrl}`);
                else {
                    subscriberModel.getByAccID(req.user.AccID).then(rows => {
                        var user = rows[0];
                        var expiredOn = new Date(user.ExpiredOn);
                        var datetimeNow = new Date(custom.getDateTimeNow());

                        if (expiredOn < datetimeNow) {
                            res.render('article/detail', {
                                canRead: false
                            });
                        } else {
                            var entity = {
                                "Views": article.Views + 1
                            };
            
                            Promise.all([
                                articleModel.update(id, entity),
                                articleModel.getTopFeatured(4, 0),
                                articleModel.getRandomTopByCatID(8, article.CatID),
                                articleModel.getTopByProperty(12, 'Views'),
                                articalTagsModel.getByArtID(article.ArtID)
                            ]).then(([
                                views, top4Art, randomTop8OfCategoryArts, top12TheMostViewedArt, tags
                            ]) => {
                                res.locals.lcCategory.forEach(x => {
                                    if (x.CatID == article.CatID) x.active = true;
                                    else x.active = false;
                                });
                                res.locals.lcSubCategories.forEach(x => {
                                    if (x.SubCatID == article.SubCatID) x.active = true;
                                    else x.active = false;
                                });
            
                                res.render('article/detail', {
                                    article, top4Art, randomTop8OfCategoryArts, top12TheMostViewedArt, tags,
                                    canRead: true
                                });
                            }).catch(next);
                        }
                    });
                }
            } else {
                var entity = {
                    "ID": id,
                    "Views": article.Views + 1
                };

                Promise.all([
                    articleModel.updateViews(entity),
                    articleModel.getTopFeatured(4, 0),
                    articleModel.getRandomTopByCatID(8, article.CatID),
                    articleModel.getTopByProperty(12, 'Views'),
                    articalTagsModel.getByArtID(article.ArtID)
                ]).then(([
                    views, top4Art, randomTop8OfCategoryArts, top12TheMostViewedArt, tags
                ]) => {
                    res.locals.lcCategory.forEach(x => {
                        if (x.CatID == article.CatID) x.active = true;
                        else x.active = false;
                    });
                    res.locals.lcSubCategories.forEach(x => {
                        if (x.SubCatID == article.SubCatID) x.active = true;
                        else x.active = false;
                    });

                    res.render('article/detail', {
                        article, top4Art, randomTop8OfCategoryArts, top12TheMostViewedArt, tags,
                        canRead: true
                    });
                }).catch(next);
            }
        } else {
            res.redirect('/');
        }
    }).catch(next);
});

router.get('/category/:id', (req, res, next) => {
    res.locals.lcSubCategories.forEach(x => {
        x.active = false;
    });

    var id = req.params.id;

    if (isNaN(id)) {

    }

    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 0 || isNaN(page)) page = 1;
    var start_offset = (page - 1) * lim;

    categoryModel.getByCatID(id).then(rows => {
        if (rows.length) {
            var category = rows[0];

            Promise.all([
                subcategoriesModel.getByCatID(id),
                articleModel.getTopFeaturedOfCategory(id, 1, 0),
                articleModel.getTopFeaturedOfCategory(id, 4, 1),
                articleModel.countArticlesOfCategory(id),
                articleModel.pagingOfCategory(id, start_offset)
            ]).then(([
                subcategories, top1OfCategory, top2To5OfCategory, nRows, articles
            ]) => {
                res.locals.lcCategory.forEach(x => {
                    if (x.CatID == id) x.active = true;
                    else x.active = false;
                });

                var total = nRows[0].total;
                var pages = (total % lim == 0) ? (total / lim) : (total / lim + 1);
                var totalPages = [];
                for (i = 1; i <= pages; i++) {
                    totalPages.push({
                        value: i,
                        active: i == page
                    });
                }

                res.render('article/category', {
                    category, subcategories, articles, top1OfCategory, top2To5OfCategory, totalPages,
                    page: +page,
                    previousInactive: page == 1,
                    nextInactive: page == pages || total == 0
                });
            }).catch(next);
        } else {
            res.redirect('/');
        }
    }).catch(next);
});

router.get('/subcategory/:id', (req, res, next) => {
    var id = req.params.id;

    if (isNaN(id)) {

    }

    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 0 || isNaN(page)) page = 1;
    var start_offset = (page - 1) * lim;

    subcategoriesModel.getBySubCatID(id).then(rows => {
        if (rows.length) {
            var subcategory = rows[0];
            var catID = subcategory.CatID;
            
            Promise.all([
                categoryModel.getByCatID(catID),
                subcategoriesModel.getByCatID(catID),
                articleModel.countArticlesOfSubcategory(id),
                articleModel.pagingOfSubcategory(id, start_offset)
            ]).then(([
                category, subcategories, nRows, articles
            ]) => {
                res.locals.lcCategory.forEach(x => {
                    if (x.CatID == catID) x.active = true;
                    else x.active = false;
                });
                res.locals.lcSubCategories.forEach(x => {
                    if (x.SubCatID == id) x.active = true;
                    else x.active = false;
                });
                subcategories.forEach(x => {
                    if (x.SubCatID == id) x.active = true;
                    else x.active = false;
                });

                var total = nRows[0].total;
                var pages = (total % lim == 0) ? (total / lim) : (total / lim + 1);
                var totalPages = [];
                for (i = 1; i <= pages; i++) {
                    totalPages.push({
                        value: i,
                        active: i == page
                    });
                }
                
                res.render('article/subcategory', {
                    subcategory, category, subcategories, articles, totalPages,
                    page: +page,
                    previousInactive: page == 1,
                    nextInactive: page == pages || total == 0
                });
            }).catch(next);
        } else {
            res.redirect('/');
        }
    }).catch(next);
});

module.exports = router;