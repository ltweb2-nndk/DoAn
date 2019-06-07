var express = require('express');
var articleModel = require('../../models/article.model');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.locals.lcCategory.forEach(x => {
        x.active = false;
    });

    res.locals.lcSubCategories.forEach(x => {
        x.active = false;
    });

    Promise.all([
        articleModel.getTopFeatured(1, 0),
        articleModel.getTopFeatured(2, 1),
        articleModel.getTopFeatured(3, 3),
        articleModel.getTopByProperty(12, 'ArtPostedOn'),
        articleModel.getTopByProperty(12, 'Views'),
        articleModel.getTheNewestOfCategories()
    ]).then(([
        top1Art,
        top2To3Art,
        top4To6Art,
        top12TheNewestArt,
        top12TheMostViewedArt,
        theNewestOfCategories
    ]) => {
        res.render('home/index', {
            top1Art, top2To3Art, top4To6Art, top12TheNewestArt,
            top12TheMostViewedArt, theNewestOfCategories
        });
    }).catch(next);
});

router.get('/error', (req, res, next) => {
    res.render('error', {
        layout: false
    });
})

module.exports = router;