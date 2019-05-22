var express=require('express');
var categoryModel=require('../models/category.model')
var subcategoryModel=require('../models/subcategories.model')
var config=require('../config/default.json')
var router=express.Router();

router.get('/',(req,res)=>{
    var limit=config.paginate.default;
    var page=req.query.page ||1;
    var start_offset=(page-1)*limit;
    if(page<1) page=1;
    Promise.all([
        categoryModel.count(),
        categoryModel.pageByCat(start_offset)
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
        res.render('category/index',{
            category:rows,
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
        categoryModel.count(),
        categoryModel.search(entity.timkiem)
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
        res.render('category/index',{
            category:rows,
            page_number,
            layout:false
        })
    })
});
router.get('/Add',(req,res)=>{
    res.render('category/add',{layout:false});
});
router.post('/Add',(req,res)=>{
    var entity=req.body;
    categoryModel.insert(entity).then(id=>{
        res.send('<h1>Thêm thành công</h1>')
    }).catch(error=>{
        console.log(error);
        res.render('error',{layout:false});
    })
});
router.get('/Edit/:id',(req,res)=>{
    var id=req.params.id;
    categoryModel.single(id).then(rows=>{
        if(rows.length>0)
        {
            res.render('category/edit',
            {
            
                success:true,
                category:rows[0],
                layout:false,
            });
        }
        else {
            res.render('category/edit',{
                success:false
            });
        }
    }).catch(error=>{
        console.log(error);
        res.render('error',{layout:false});
    });
});
router.post('/Update',(req,res)=>{
    var entity=req.body;
    categoryModel.update(entity).then(n=>{
      res.redirect('/Admin/category')
    });
})

router.get('/Delete/:id', (req, res) => {
   var entity={CatID:req.params.id,CatIsActive:0};
  subcategoryModel.singles(entity.CatID).then(rows=>{
        if(rows.length>0)
        {
            for(var i=0;i<rows.length;i++)
            {
                rows[i].SubCatIsActive=0;
                subcategoryModel.update(rows[i]);
            }
        }
   })
   categoryModel.update(entity).then(n=>{
    res.redirect('/Admin/category');
   })
})
   
router.get('/Detail/:id',(req,res)=>{
    var entity=req.params.id;
    subcategoryModel.singles(entity).then(rows=>{
        res.render('category/details',{subcategories:rows,CatID:entity,layout:false});
    })
})

module.exports=router;