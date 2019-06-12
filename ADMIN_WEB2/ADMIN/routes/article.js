var express=require('express');
var router=express.Router();
var articleModel=require('../models/article.model')
var subcategoriesModel=require('../models/subcategories.model')
var statusModel=require('../models/status.model')
var rankModel=require('../models/rank.model')
var editorModel=require('../models/editor.model')
var writerModel=require('../models/writer.model')
var config=require('../config/default.json')

router.get('/',(req,res,next)=>{
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
    }).catch(next);
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
