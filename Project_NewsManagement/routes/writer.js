var express = require('express');
var router = express.Router();
var statusModel = require('../models/status.model');
var articleModel = require('../models/article.model');
var artTagsModel = require('../models/articleTags.model');
var Promise=require('promise');
var config = require('../config/default.json');
var tagModel = require('../models/tag.model');
var subCatModel = require('../models/subcategories.model');

router.get('/',(req,res)=>{

    res.render('layouts/mainWrite.hbs',{layout:false,
        user: req.session.user,
        userExistence: req.session.userExistence,

    });
})

router.get('/info',(req,res)=>{
    res.render('writer/info',{layout:false,
        user: req.session.user,
        userExistence: req.session.userExistence 
    });
})

router.get('/add',(req,res)=>{

    res.render('writer/addArticle',{layout:'mainWrite.hbs',
        user: req.session.user,
        userExistence: req.session.userExistence,

    });
})

router.post('/add',(req,res)=>{
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
                artTagsModel.add(entity).then();
            });
            res.redirect('/writer');
        });
    });
    
})

router.get('/articlesByStatus/:id',(req,res)=>{
    var id = req.params.id;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if(page<1){
        page = 1;
    }
    var start_offset=(page-1)*lim; 
    console.log(start_offset);
    Promise.all([
        articleModel.countByStatus(id),
        articleModel.pageByStatus(id, start_offset)
    ]).then(([nRows, rows])=>{

        var total = nRows[0].total;

        var nPages = Math.floor(total/lim);
        if(total % lim > 0){
            nPages++;
        }
        var page_numbers = [];
        for(i=1;i<=nPages;i++){
            page_numbers.push({
                value : i,
                active: i=== +page
            })
        }
        
        console.log(nPages);
        console.log(page_numbers.length);
        console.log(nRows);
        console.log(page);
        res.render('writer/articlesByStatus',{layout:'mainWrite.hbs',
        user: req.session.user,
        userExistence: req.session.userExistence,
            stusName: rows[0].StatusName,
            articles : rows,
            page_numbers,
            curPage : +page,   
        });
    });
})

router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    Promise.all([articleModel.getByArtID(id),artTagsModel.getArticleTags(id)])
    .then(([rowsArt,rowsTag])=>{
        // console.log(rowsArt[0]);
        // console.log(rowsArt);
        // console.log(rowsTag);
        var catID = rowsArt[0].CatID;
        subCatModel.allByCatID(catID).then(rowsCat=>{
            console.log(rowsCat)
            res.render('writer/editArticle',{layout:'mainWrite.hbs',
                user: req.session.user,
                userExistence: req.session.userExistence,
                articles:rowsArt[0],
                artTags:rowsTag,
                subCat: rowsCat
            });
        })
        
    });
})

router.post('/edit/:id',(req,res)=>{
    var artID = req.params.id;
    articleModel.update(req.body)
    .then(n=>{
        console.log(n);
        var tags = req.body.TagName.split(',');
        tags.forEach(element => {
            tagModel.add(element).then(id => {
                var entity = {
                    "ArtID": artID,
                    "TagID": id
                };
                console.log(entity);
                    artTagsModel.delete(artID).then(id=>{
                    artTagsModel.add(entity).then();
                });
                
            });
        });
        res.redirect('/writer');
    });
})

module.exports = router;