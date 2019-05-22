var express=require('express');
var tagModel=require('../models/tag.model')
var config=require('../config/default.json')
var router=express.Router();

router.get('/',(req,res)=>{
    var limit=config.paginate.default;
    var page=req.query.page ||1;
    var start_offset=(page-1)*limit;
    if(page<1) page=1;
    Promise.all([
        tagModel.count(),
        tagModel.pageByTag(start_offset)
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
        res.render('tag/index',{
            tag:rows,
            page_number,
            layout:false
        })
    })
});

router.post('/',(req,res)=>{
    var entity=req.body;
    var limit=config.paginate.default;
    var page=req.query.page ||1;
    var start_offset=(page-1)*limit;
    if(page<1) page=1;
    Promise.all([
        tagModel.count(),
        tagModel.search(entity.timkiem)
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
        res.render('tag/index',{
            tag:rows,
            page_number,
            layout:false
        })
    })
});
router.get('/Add',(req,res)=>{
    res.render('tag/add',{layout:false});
});
router.post('/Add',(req,res)=>{
    var entity=req.body;
    tagModel.insert(entity).then(id=>{
        res.send('<h1><font color:red>Thêm thành công</font></h1>')
    }).catch(error=>{
        console.log(error);
        res.end('error');
    })
});
router.get('/Edit/:id',(req,res)=>{
    var id=req.params.id;
    tagModel.single(id).then(rows=>{
        if(rows.length>0)
        {
            res.render('tag/edit',
            {
            
                success:true,
                Tag:rows[0],
                layout:false,
            });
        }
        else {
            res.render('tag/edit',{
                success:false
            });
        }
    });
});
router.post('/Update',(req,res)=>{
    var entity=req.body;
    tagModel.update(entity).then(n=>{
      res.redirect('/admin/tag')
    });
});
router.get('/Delete/:id', (req, res) => {
    var id=req.params.id;
    tagModel.delete(id).then(n => {
     res.redirect('/admin/tag')
    })
 });

module.exports=router;