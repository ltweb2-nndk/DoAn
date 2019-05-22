var express=require('express');
var subcategoryModel=require('../models/subcategories.model')
var router=express.Router();

router.get('/Edit/:id',(req,res)=>{
    var entity=req.params.id;
    subcategoryModel.single(entity).then(rows=>{
        res.render('subCategory/edit',{subcategories:rows[0],layout:false});
    })
})

router.post('/Update',(req,res)=>{
    var entity=req.body;
    subcategoryModel.update(entity).then(n=>{
      res.redirect(`/admin/category/Detail/${entity.CatID}`)
    });
})
router.get('/Delete/:id',(req,res)=>{
    var entity={SubCatID:req.params.id,SubCatIsActive:0};
    subcategoryModel.update(entity).then(n => {
     res.send('<h1>Xóa thành công</h1>')
  })
})

router.get('/Add/:id',(req,res)=>{
    var entity=req.params.id;
    res.render('subCategory/add',{CatID:entity,layout:false});
})
router.post('/Add/:id',(req,res)=>{
    var entity=req.body;
    subcategoryModel.insert(entity).then(id=>{
        res.redirect(`/admin/category/Detail/${entity.CatID}`);
    }).catch(error=>{
        console.log(error);
        res.render('error',{layout:false});
    })
})
module.exports=router;