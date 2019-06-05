var express = require('express');
var bcrypt = require('bcrypt');
var multer = require('multer');
var moment = require('moment');
var config = require('../config/default.json');
var custom = require('../public/js/custom');
var restricted = require('../middlewares/restricted');
var verify = require('../middlewares/verify');
var accountModel = require('../models/account.model');
var subscriberModel = require('../models/subscriber.model');
var writerModel=require('../models/writer.model')
var editorModel=require('../models/editor.model')
var roleModel=require('../models/role.model')
var categoryModel=require('../models/category.model')
var accountModel=require('../models/account.model')
var date=new Date();
var helpersFunc=require('../public/js/custom');
var moment=require('moment');

var router = express.Router();

var saltRounds = config.bcrypt.saltRounds;
var storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        var user = req.user;
        var avatarPath;

        if (user.RoleID == 1) avatarPath = "./public/img/user/subscriber/";
        else if (user.RoleID == 2) avatarPath = "./public/img/user/writer/";
        else if (user.RoleID == 3) avatarPath = "./public/img/user/editor/";

        cb(null, avatarPath);
    },
    filename: (req, file, cb) => {
        var user = req.user;
        var avatarName;

        if (user.RoleID == 1) avatarName = `${user.SubscriberID}.jpg`;
        else if (user.RoleID == 2) avatarName = `${user.WriterID}.jpg`;
        else if (user.RoleID == 3) avatarName = `${user.EditorID}.jpg`;

        cb(null, avatarName);
    }
});
var upload = multer({storage: storageAvatar});

router.get('/info', restricted, verify, (req, res, next) => {
    var expiredOn = new Date(req.user.ExpiredOn);
    var datetimeNow = new Date(custom.getDateTimeNow());
    var expired = false;

    if (expiredOn < datetimeNow) expired = true;

    res.render('user/info', {
        expired
    });
});

router.get('/change-avatar', restricted, verify, (req, res, next) => {
    res.render('user/changeAvatar');
});

router.post('/change-avatar', upload.single('Avatar'), (req, res, next) => {
    var path = req.file.path.substring(6); // remove "public"
    var user = req.user;

    if (user.RoleID == 1) {
        var entity = {
            "Avatar": path
        }

        subscriberModel.update(user.SubscriberID, entity).then(count => {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                req.user = rows[0];
            }).catch(next);
        }).catch(next);
    } else if (user.RoleID == 2) {
        //Writer
    } else if (user.RoleID == 3) {
        //Editor
    }

    res.redirect('/user/info');
});

router.get('/edit-info', restricted, verify, (req, res, next) => {
    var day = custom.day;
    var month = custom.month;
    var year = custom.year;
    var dob = moment(new Date(req.user.DOB), 'YYYY-MM-DD').format('DD/MM/YYYY').split("/");

    res.render('user/editInfo', {
        day, month, year,
        dobDay: +dob[0],
        dobMonth: +dob[1],
        dobYear: +dob[2],
        subError: req.session.subError
    });

    req.session.subError = null;
});

router.post('/edit-info', (req, res, next) => {
    var userReq = req.body;
    var user = req.user;

    if (custom.isDate(userReq.Day, userReq.Month, userReq.Year)) {
        if (user.RoleID == 1) {
            var entity = {
                "SubscriberName": userReq.Fullname,
                "DOB": new Date(userReq.Year, userReq.Month - 1, userReq.Day)
            };

            subscriberModel.update(user.SubscriberID, entity).then(rows => {
                subscriberModel.getByAccID(user.AccID).then(rows => {
                    req.session.passport.user = rows[0];
                    res.redirect('/user/info');
                }).catch(next);
            }).catch(next);
        }
    } else {
        req.session.subError = true;
        res.redirect('/user/edit-info');
    }
});

router.get('/change-password', restricted, verify, (req, res, next) => {
    res.render('user/changePassword', {
        success: req.session.success
    });

    req.session.success = null;
});

router.get('/password-is-correct', (req, res, next) => {
    var password = req.query.password;
    var match = bcrypt.compareSync(password, req.user.Password);

    if (match) res.json(true);
    else res.json(false);
});

router.post('/change-password', async (req, res, next) => {
    var user = req.user;
    var entity = {
        "Password": bcrypt.hashSync(req.body.NewPassword, saltRounds)
    }

    await accountModel.update(user.AccID, entity).then(count => {
        if (user.RoleID == 1) {
            subscriberModel.getByAccID(user.AccID).then(rows => {
                req.session.passport.user = rows[0];
                req.session.success = true;
                res.redirect('/user/change-password');
            });
        } else if (user.RoleID == 2) {
            // Writer
        } else if (user.RoleID == 3) {
            // Editor
        }
    }).catch(next);
});

router.get('/buy-premium', restricted, verify, (req, res, next) => {
    var expiredOn = new Date(req.user.ExpiredOn);
    var datetimeNow = new Date(custom.getDateTimeNow());
    var expired = false;

    if (expiredOn < datetimeNow) expired = true;

    res.render('user/buyPremium', {
        expired
    });
});

router.post('/buy-premium', (req, res, next) => {
    var entity = {
        "BoughtOn": custom.getDateTimeNow(),
        "ExpiredOn": custom.addDaysFromNow(7)
    };

    subscriberModel.update(req.user.SubscriberID, entity).then(count => {
        subscriberModel.getByAccID(req.user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            res.redirect('/user/info');
        });
    });
});

router.post('/expire-premium', (req, res, next) => {
    var entity = {
        "ExpiredOn": custom.addDays(req.user.ExpiredOn, 7)
    };

    subscriberModel.update(req.user.SubscriberID, entity).then(count => {
        subscriberModel.getByAccID(req.user.AccID).then(rows => {
            req.session.passport.user = rows[0];
            res.redirect('/user/info');
        });
    });
});

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
           res.render('User/index',{
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
           res.render('User/index',{
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

router.post('/role',(req,res)=>{
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

router.get('/is-available', (req, res) => {
    var UserName = req.query.UserName;
    accountModel.singlebyUserName(UserName).then(rows => {
      if (rows.length > 0)
        res.json(false);
      else res.json(true);
    })
})
router.post('/add',(req,res)=>{
    var entity={RoleID:req.body.TypeAccount};
    if(entity.RoleID==2)
    res.render('user/add_writer',{layout:false});
    else if(entity.RoleID==3)
    res.render('user/add_editor',{layout:false});
    else res.redirect('/admin/user');
 });

 
router.post('/add/writer',(req,res)=>{
    var entity=req.body;
    var account={
        Username:entity.UserName,
        Password:entity.Password,
        RoleID:2,
        AccIsActive:1
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
            res.send("<center><h1>Thêm thành công</h1><center>")
        }).catch(error=>{
            console.log(error);
            res.render('error',{layout:false});
        })    
    }).catch(next);
});

router.post('/add/editor',(req,res,next)=>{
    var entity=req.body;
    var account={
        Username:entity.UserName,
        Password:entity.Password,
        RoleID:3,
        AccCreatedOn:"",
        AccIsActive:1
    };
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(entity.Password, salt);
    entity.Password=hash;

    var editor={
        FullName:entity.FullName,
        Avatar:"/images/user/default_avartar.png",
        DOB:req.body.DOB,
        AccID:1
    };
    accountModel.insert(account).then(id=>{
        editor.AccID=id;
        editorModel.insert(editor).then(id=>{
            res.send('<center><h1>Thêm thành công</h1><center>')
        }).catch(error=>{
            console.log(error);
            res.render('error',{layout:false})
        })
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

router.get('/update/subscriber/:id',(req,res)=>{
    var id=req.params.id;
    subscriberModel.single(id).then(rows=>{
    if(rows.length>0)
    {  
        if(rows[0].ExpiredOn==null)
           {
            subscriberModel.updateDate1(rows[0].SubscriberID).then(n=>{
                res.redirect(`/admin/user/detail/subscriber/${id}`)
                })
           }
        else if(rows[0].ExpiredOn<=date)
        {
                subscriberModel.updateDate2(rows[0].SubscriberID).then(n=>{
                    res.redirect(`/admin/user/detail/subscriber/${id}`)
                })   
        }
        else if(rows[0].ExpiredOn>date)
        {
            res.redirect(`/admin/user/detail/subscriber/${id}`);   
        }
    }
    })
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