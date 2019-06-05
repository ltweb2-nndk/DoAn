var express = require('express');
var restricted = require('../middlewares/restricted');
var verify = require('../middlewares/verify');
var articleModel = require('../models/article.model');
var articalTagsModel = require('../models/articletags.model');
var categoryModel = require('../models/category.model');
var subcategoriesModel = require('../models/subcategories.model');
var subscriberModel = require('../models/subscriber.model');
var statusModel=require('../models/status.model')
var rankModel=require('../models/rank.model')
var editorModel=require('../models/editor.model')
var writerModel=require('../models/writer.model')
var config = require('../config/default.json');
var custom = require('../public/js/custom');
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

router.get('/',(req,res)=>{
    var limit=config.paginate.default;
    var page=req.query.page ||1;
    var start_offset=(page-1)*limit;
    if(page<1) page=1;
    Promise.all([
        articleModel.count(),
        articleModel.pageByArt(start_offset)
    ]).then(([nRows,rows])=>{
        var total=nRows[0].total;
        var nPage=Math.floor(total/limit);
       
        if(total%limit>0) nPage++;

        var page_number=[];
        for( i=1;i<=nPage;i++)
        {
            page_number.push({
                value:i,
                active:i===+page
            })
        }
        res.render('article/index',{
            article:rows,
            page_number,
            layout:false
        })
    })
  });
    
router.post('/search',(req,res,next)=>{
    subcategoriesModel.all().then(rows=>{
        var entity=rows;
        articleModel.search(req.body.timkiem).then(rows=>{
            res.render('article/index',{article:rows,subcategories:entity,layout:false});
        })
    }).catch(next);
});
router.post('/subcategory',(req,res,next)=>{
        var entity=req.body.SubCatID;
        
        articleModel.searchfollowsubct(entity).then(rows=>{
            for(var s  of res.locals.lcSubCategories)
            {
                if(s.SubCatID===+entity)
                s.active=true;
                else s.active=false;
            }
            res.render('article/index',{article:rows,layout:false});
        }).catch(next);
});
router.get('/detail/:id',(req,res,next)=>{
    var entity=req.params.id;
    articleModel.single(entity).then(rows=>{
    Promise.all([
        subcategoriesModel.single(rows[0].SubCatID),
        statusModel.single(rows[0].StatusID),
        rankModel.single(rows[0].RankID),
        editorModel.single(rows[0].EditorID),
        writerModel.single(rows[0].WriterID)
    ]).then(([rowsSub,rowsStatus,rowsRank,rowsEditor,rowsWriter])=>{
        res.render('article/details',{
            article:rows[0],
            subcategories:rowsSub[0],
            status:rowsStatus[0],
            rank:rowsRank[0],
            editor:rowsEditor[0],
            writer:rowsWriter[0],
            layout:false
        })
    })
  }).catch(next);
})
router.get('/edit/:id',(req,res,next)=>{
    var entity=req.params.id;

      articleModel.single(entity).then((rows)=>{
          for(var s of res.locals.lcStatus)
          {
              if(s.StatusID===+rows[0].StatusID)
              s.active=true;
              else s.active=false;
          }
       res.render('article/edit',{article:rows[0],layout:false});
    }).catch(next);
})
router.post('/update',(req,res,next)=>{
    var entity=req.body;
    articleModel.update(entity).then(n=>{
      res.redirect('/admin/article')
    }).catch(next);
})
router.get('/delete/:id', (req, res, next) => {
    var id=req.params.id;
    articleModel.delete(id).then(n => {
     res.redirect('/admin/article')
    }).catch(next);
 })
module.exports=router;
