var express = require('express');
var router = express.Router();
var subCatModel = require('../models/subcategories.model');
var statusModel = require('../models/status.model');
var articleModel = require('../models/article.model');
var artTagsModel = require('../models/articleTags.model');
var Promise = require('promise');

router.get('/',(req,res)=>{
    res.render('layouts/mainWrite.hbs',{layout:false,
        user: req.session.user,
        userExistence: req.session.userExistence 
    });
})

router.get('/add',(req,res)=>{

    res.render('writer/addArticle',{layout:'mainWrite.hbs',
        user: req.session.user,
        userExistence: req.session.userExistence 
    });
})

router.post('/add',(req,res)=>{
    articleModel.add(req.body)
    .then(id=>{
        console.log(req.body)
        res.render('writer/addArticle',{layout:'mainWrite.hbs'});
    });
})

router.get('/articlesByStatus/:id',(req,res)=>{
    var id = req.params.id;
    articleModel.getByStatus(id)
    .then(rows=>{
        res.render('writer/articlesByStatus',{layout:'mainWrite.hbs',
            articles : rows
        });
    });
    
})


router.get('/article',(req,res)=>{
    res.render('writer/articlesByStatus',{layout:'mainWrite.hbs'});
})

router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    Promise.all([articleModel.getByArtID(id),artTagsModel.getArticleTags(id)])
    .then(([rowsArt,rowsTag])=>{
        res.render('writer/editArticle',{layout:'mainWrite.hbs',
            articles:rowsArt[0],
            artTags:rowsTag
            //tai sao article phai co [0]
        });
    });
})

router.post('/edit/:id',(req,res)=>{
    articleModel.update(req.body)
    .then(n=>{
        console.log(req.body.StatusID);
        res.redirect('/writer');
    });
    
})
module.exports = router;