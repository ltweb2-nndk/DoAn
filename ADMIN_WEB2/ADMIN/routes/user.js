var express=require('express');
var subscriberModel=require('../models/subscriber.model')
var writerModel=require('../models/writer.model')
var editorModel=require('../models/editor.model')
var roleModel=require('../models/role.model')
var accountModel=require('../models/account.model')
var categoryModel=require('../models/category.model')
var accountModel=require('../models/account.model')
var bcrypt=require('bcrypt')
var moment=require('moment')
var helpersFunc=require('../public/js/custom');
var router = express.Router();

router.get('/',(req,res,next)=>{
    Promise.all([
        subscriberModel.all(),
        editorModel.all(),
        writerModel.all(),
        roleModel.all()
    ]).then(([rowsSub,rowsEditor,rowsWriter,rowsRole])=>{
        res.render('user/index',{
            subscriber:rowsSub,
            editor:rowsEditor,
            writer:rowsWriter,
            role:rowsRole,
            layout:false
        })
    }).catch(next);
})

router.post('/search',(req,res,next)=>{
    var entity={value:req.body.timkiem,RoleID:req.body.RoleID};
    if(entity.RoleID==1)
   {
        subscriberModel.search(entity.value).then(rowsSub=>{
            for(var r of res.locals.lcRole)
            {
                if(r.RoleID===+entity.RoleID)
                r.active=true;
                else r.active=false;
            }
           res.render('user/index',{
               subscriber:rowsSub,
               layout:false
           })   
        }).catch(next);
   }
   else if(entity.RoleID==2)
   {
        writerModel.search(entity.value).then(rowsWriter=>{
            for(var r of res.locals.lcRole)
            {
                if(r.RoleID===+entity.RoleID)
                r.active=true;
                else r.active=false;
            }
           res.render('user/index',{
               writer:rowsWriter,
               layout:false
           })
       }).catch(next);
   }
   else if(entity.RoleID==3)
   {
        editorModel.search(entity.value).then(rowsEditor=>{
            for(var r of res.locals.lcRole)
            {
                if(r.RoleID===+entity.RoleID)
                r.active=true;
                else r.active=false;
            }
           res.render('user/index',{
               editor:rowsEditor,
               layout:false
           })
       }).catch(next);
   }
   else 
   {
    Promise.all([
        subscriberModel.search(entity.value),
        editorModel.search(entity.value),
        writerModel.search(entity.value),
        roleModel.all()
    ]).then(([rowsSub,rowsEditor,rowsWriter,rowsRole])=>{
        res.render('User/index',{
            subscriber:rowsSub,
            editor:rowsEditor,
            writer:rowsWriter,
            role:rowsRole,
            layout:false
        })
    }).catch(next);
   }
});

router.post('/role',(req,res,next)=>{
    var RoleID=req.body.RoleID;
    roleModel.all().then(rows=>{
        var entity=rows;
        for(var r of res.locals.lcRole)
        {
            if(r.RoleID===+RoleID)
            r.active=true;
            else r.active=false;
        }
        if(RoleID==1)
        subscriberModel.all().then(rows=>{
            res.render('user/index',{subscriber:rows,role:entity,layout:false}) 
        })
        else if(RoleID==2)
        writerModel.all().then(rows=>{
            res.render('user/index',{writer:rows,role:entity,layout:false}) 
        }) 
        else if(RoleID==3)
        editorModel.all().then(rows=>{
            res.render('user/index',{editor:rows,role:entity,layout:false}) 
        })
        else 
        {
            res.redirect('/admin/user');
        }
    }).catch(next);
});

router.post('/add',(req,res)=>{
    var entity={RoleID:req.body.TypeAccount};
    if(entity.RoleID==2)
    res.render('user/add_writer',{layout:false});
    else if(entity.RoleID==3)
    res.render('user/add_editor',{layout:false});
    else res.redirect('/admin/user');
 });

 
router.post('/add/writer',(req,res,next)=>{
    var entity=req.body;
    var account={
        Username:entity.UserName,
        Password:entity.Password,
        RoleID:2,
        AccIsActive:1,
        AccCreatedOn:helpersFunc.getDateTimeNow()
    };
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(account.Password, salt);
    account.Password=hash;

    var writer={
        FullName: entity.FullName,
        Avatar:"/images/user/default_avartar.png",
        DOB: entity.DOB,
        AccID: 1,
        Pseudonym: entity.Pseudonym
    };

    accountModel.insert(account).then(id=>{
        writer.AccID=id;
        writerModel.insert(writer).then(id=>{
            res.redirect('/admin/user');
        }).catch(next); 
    }).catch(next);
});

router.post('/add/editor',(req,res,next)=>{
    var entity=req.body;
    var account={
        Username:entity.UserName,
        Password:entity.Password,
        RoleID:3,
        AccCreatedOn:helpersFunc.getDateTimeNow(),
        AccIsActive:1
    };
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(entity.Password, salt);
    account.Password=hash;

    var editor={
        FullName:entity.FullName,
        Avatar:"/images/user/default_avartar.png",
        DOB:req.body.DOB,
        AccID:1
    };
    accountModel.insert(account).then(id=>{
        editor.AccID=id;
        editorModel.insert(editor).then(id=>{
            res.redirect('/admin/user');
        }).catch(next);
    }).catch(next);
});

router.get('/detail/subscriber/:id',(req,res)=>{
    var id=req.params.id;
    subscriberModel.single(id).then(rows=>{
        rows[0].DOB= moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');  
        rows[0].BoughtOn=helpersFunc.formatDateTime(rows[0].BoughtOn);
        rows[0].ExpiredOn=helpersFunc.formatDateTime(rows[0].ExpiredOn);
    res.render('user/detail_subscriber',{subscriber:rows[0],layout:false})
 })
});

router.get('/update/subscriber/:id',(req,res,next)=>{
    var id=req.params.id;
    var date=new Date();
    subscriberModel.single(id).then(rows=>{
    if(rows.length>0)
    {  
        if(rows[0].ExpiredOn==null)
           {
            rows[0].BoughtOn.setDate(rows[0].BoughtOn.getDate()+7) 
            var entity={
                SubscriberID:rows[0].SubscriberID,
                ExpiredOn:rows[0].BoughtOn
            }
            subscriberModel.update(entity).then(n=>{
                res.redirect(`/admin/user/detail/subscriber/${id}`)
                })
           }
        else if(rows[0].ExpiredOn<=date)
        {
                date.setDate(date.getDate()+7)
                var entity={
                    SubscriberID:rows[0].SubscriberID,
                    ExpiredOn:date
                }
                subscriberModel.update(entity).then(n=>{
                    res.redirect(`/admin/user/detail/subscriber/${id}`)
                })   
        }
        else if(rows[0].ExpiredOn>date)
        {
            res.redirect(`/admin/user/detail/subscriber/${id}`);   
        }
    }
    }).catch(next);
})

router.get('/detail/editor/:id',(req,res)=>{
    var id=req.params.id;
        editorModel.single(id).then(rows=>{ 
            rows[0].DOB= moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');  
            for(var c  of res.locals.lcCategory)
        {
            if(c.CatID===+rows[0].CatID)
            c.active=true;
            else c.active=false;
        }
        res.render('user/detail_editor',{editor:rows[0],layout:false});
    })
})
router.post('/update/editor',(req,res,next)=>{
    var entity=req.body;
    editorModel.update(entity).then(n=>{
        res.redirect('/admin/user');
    }).catch(next);
})

router.get('/detail/writer/:id',(req,res,next)=>{
    var id=req.params.id;
    writerModel.single(id).then(rows=>{
       rows[0].DOB= moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');  
       res.render('user/detail_writer',{writer:rows[0],layout:false});
    }).catch(next);
})
router.post('/update/writer',(req,res,next)=>{
    var entity=req.body;
    writerModel.update(entity).then(n=>{
        res.redirect('/admin/User');
    }).catch(next);
})

router.get('/delete/subscriber/:id',(req,res,next)=>{
    var id=req.params.id;
    subscriberModel.single(id).then(rows=>{
        if(rows.length>0)
        accountModel.delete(rows[0].AccID).then(n=>{
            res.redirect('/admin/user')
        })
    }).catch(next);
});
router.get('/delete/writer/:id',(req,res,next)=>{
    var id=req.params.id;
    writerModel.single(id).then(rows=>{
        if(rows.length>0)
        accountModel.delete(rows[0].AccID).then(n=>{
            res.redirect('/admin/user')
        })
    }).catch(next);
});
router.get('/delete/editor/:id',(req,res,next)=>{
    var id=req.params.id;
    editorModel.single(id).then(rows=>{
        if(rows.length>0)
        accountModel.delete(rows[0].AccID).then(n=>{
            res.redirect('/admin/user')
        })
        res.redirect('/admin/user')
    }).catch(next);
});

module.exports = router;