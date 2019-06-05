var express=require('express');
var subcategoryModel=require('../models/subcategories.model')
var router=express.Router();

router.get('/edit/:id',(req,res,next)=>{
    var entity=req.params.id;
    subcategoryModel.single(entity).then(rows=>{
        res.render('subCategory/edit',{subcategories:rows[0],layout:false});
    }).catch(next);
})

router.post('/update',(req,res,next)=>{
    var entity=req.body;
    subcategoryModel.update(entity).then(n=>{
      res.redirect(`/admin/category/Detail/${entity.CatID}`)
    }).catch(next);
})
router.get('/delete/:id',(req,res,next)=>{
    var entity={SubCatID:req.params.id,SubCatIsActive:0};
    subcategoryModel.update(entity).then(n => {
     res.send('<center><h1>Xóa thành công</h1><center>')
  }).catch(next);
})

router.get('/add/:id',(req,res)=>{
    var entity=req.params.id;
    res.render('subCategory/add',{CatID:entity,layout:false});
})
router.post('/add/:id',(req,res,next)=>{
    var entity=req.body;
    subcategoryModel.insert(entity).then(id=>{
        res.redirect(`/admin/category/detail/${entity.CatID}`);
    }).catch(next);
})
router.get('/is-available', (req, res) => {
    var subCatName = req.query.subCatName;
    subcategoryModel.singlebyname(subCatName).then(rows => {
      if (rows.length > 0)
        res.json(false);
      else res.json(true);
    })
})
module.exports=router;