var express = require('express');
var router = express.Router();
var catModel = require('../models/category.model');
var Promise=require('promise');
var config = require('../config/default.json');
var articleModel = require('../models/article.model');
var subCatModel = require('../models/subcategories.model');
var artTagsModel =require('../models/articleTags.model');
var moment=require('moment');
var tagModel = require('../models/tag.model');

router.get('/',(req,res)=>{

    var id = req.session.user.EditorID;
    console.log(id)
    catModel.getByID(id).then(rows=>{
        console.log(rows);
        res.render('layouts/mainWrite.hbs',{layout:false,
            user: req.user,
            // user: req.session.user,
            // userExistence: req.session.userExistence,
            CatOfEditor:rows
        });
    })
}),
router.get('/articlesByCat/:id',(req,res)=>{
    var catID = req.params.id;
    var lim = config.paginate.default;
    var page = req.query.page || 1;
    if(page<1){
        page = 1;
    }
    var start_offset=(page-1)*lim; 
    Promise.all([
        articleModel.countByCat(catID),
        articleModel.pageByCat(catID, start_offset)
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
        console.log(rows);
        console.log(page);
        res.render('editor/articlesByCat',{layout:'mainWrite.hbs',
            user: req.user,
        // user: req.session.user,
        // userExistence: req.session.userExistence,
            catName : rows[0].CatName,
            articles : rows,
            page_numbers,
            curPage : +page,   
        });
    });
}),
router.get('/accept/:id',(req,res)=>{
    var artID = req.params.id;
    articleModel.getByArtID(artID).then(rows=>{
        var catID = rows[0].CatID;
        subCatModel.allByCatID(catID).then(rowSub=>{
            artTagsModel.getArticleTags(artID).then(rowsTag=>{
                res.render('editor/acceptArt',{layout: false,
                    user: req.user,
                    // user: req.session.user,
                    // userExistence: req.session.userExistence,
                    article: rows,
                    subCat:rowSub,
                    artTags : rowsTag
                });
            })
            
        });
        
    });
    
}),
router.post('/accept/:id',(req,res)=>{
    var artID = req.params.id;
    var SubCatID = req.body.SubCatID;
    var EditorID = req.body.EditorID;
    var RankID = req.body.RankID;
    console.log("a"+RankID);
    var ArtPostedOn = moment(req.body.ArtPostedOn,'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') ;

    var entity1 = {
        "SubCatID":SubCatID,
        "ArtPostedOn":ArtPostedOn,
        "StatusID":2,
        "EditorID":EditorID,
        "RankID":RankID
    }
    articleModel.edit(entity1,artID).then(n=>{
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
        res.redirect(req.originalUrl);
    });
}),
router.get('/decline/:id',(req,res)=>{
    var artID = req.params.id;
    articleModel.getByArtID(artID).then(rows=>{
        res.render('editor/declineArt',{layout:false,
            article: rows
        });
    });
}),
router.post('/decline/:id',(req,res)=>{
    var artID = req.params.id;
    var entity = {
        "StatusID":4
    }
    articleModel.edit(entity,artID).then(n=>{
        res.redirect('/editor');
    });
})
module.exports = router;