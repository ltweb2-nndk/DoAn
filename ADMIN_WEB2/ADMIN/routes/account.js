var express=require('express');
var router=express.Router();
var accountModel=require('../models/account.model');

router.get('/username-is-available', (req, res, next) => {
    var username = req.query.user;
    accountModel.singleByUserName(username).then(rows => {
        if (rows.length>0) res.json(false);
        else res.json(true);
    }).catch(next);
});
router.get('/edit/:id',(req,res,next)=>{
    var id=req.params.id;
    accountModel.single(id).then(rows=>{
        res.render('account/edit',{account:rows[0],layout:false})
    }).catch(next);
})

router.post('/update',(req,res,next)=>{
    var entity=req.body;
    accountModel.update(entity).then(n=>{
        res.redirect('/admin/user');
   }).catch(next);
})

module.exports=router;