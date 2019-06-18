var express = require('express');
var subscriberModel = require('../../models/subscriber.model')
var writerModel = require('../../models/writer.model')
var editorModel = require('../../models/editor.model')
var roleModel = require('../../models/role.model')
var accountModel = require('../../models/account.model')
var categoryModel = require('../../models/category.model')
var accountModel = require('../../models/account.model')
var bcrypt = require('bcrypt')
var moment = require('moment')
var helpersFunc = require('../../public/js/custom');
var router = express.Router();
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');
var config = require('../../config/default.json')

router.get('/', restricted ,isAdmin, (req, res, next) => {
    Promise.all([
        subscriberModel.all(),
        editorModel.all(),
        writerModel.all(),
        roleModel.all()
    ]).then(([rowsSub, rowsEditor, rowsWriter, rowsRole]) => {
        delete rowsRole[3];
        delete rowsRole[0];
        delete  res.locals.lcRole[3];
        res.render('user/index', {
            subscriber: rowsSub,
            editor: rowsEditor,
            writer: rowsWriter,
            role: rowsRole,
            layout: false
        })
    }).catch(next);
})

router.get('/search', (req, res, next) => {
    var entity = {
        value: req.query.timkiem,
        RoleID: req.query.RoleID
    };
    if (entity.RoleID == 1) {
        subscriberModel.search(entity.value).then(rowsSub => {
            for (var r of res.locals.lcRole) {
                if (r.RoleID === +entity.RoleID)
                    r.active = true;
                else r.active = false;
            }
            res.render('user/index', {
                subscriber: rowsSub,
                layout: false
            })
        }).catch(next);
    } else if (entity.RoleID == 2) {
        writerModel.search(entity.value).then(rowsWriter => {
            for (var r of res.locals.lcRole) {
                if (r.RoleID === +entity.RoleID)
                    r.active = true;
                else r.active = false;
            }
            res.render('user/index', {
                writer: rowsWriter,
                layout: false
            })
        }).catch(next);
    } else if (entity.RoleID == 3) {
        editorModel.search(entity.value).then(rowsEditor => {
           for (var r of res.locals.lcRole) {
                if (r.RoleID === +entity.RoleID)
                    r.active = true;
                else r.active = false;
            }
            res.render('user/index', {
                editor: rowsEditor,
                layout: false
            })
        }).catch(next);
    } else {
        Promise.all([
            subscriberModel.search(entity.value),
            editorModel.search(entity.value),
            writerModel.search(entity.value),
            roleModel.all()
        ]).then(([rowsSub, rowsEditor, rowsWriter, rowsRole]) => {
            res.render('user/index', {
                subscriber: rowsSub,
                editor: rowsEditor,
                writer: rowsWriter,
                role: rowsRole,
                layout: false
            })
        }).catch(next);
    }
});

router.get('/role', (req, res, next) => {
    var RoleID = req.query.RoleID;
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    var start_offset = (page - 1) * limit;
    if (page < 1) page = 1;
    roleModel.all().then(rows => {
        var entity = rows;
        for (var r of res.locals.lcRole) {
            if (r.RoleID === +RoleID)
                r.active = true;
            else r.active = false;
        }
        if (RoleID == 1)
        Promise.all([
            subscriberModel.count(),
            subscriberModel.pageBySub(start_offset)
        ]).then(([nRows, rows]) => {
            var total = nRows[0].total;
            var nPage = Math.floor(total / limit);
    
            if (total % limit > 0) nPage++;
    
            var page_number = [];
            for (i = 1; i <= nPage; i++) {
                page_number.push({
                    value: i,
                    active: i === +page
                })
            }
            res.render('user/role', {
                RoleID,
                subscriber:rows,
                page_number,
                layout: false
            })
        }).catch(next);
        else if (RoleID == 2)
        Promise.all([
            writerModel.count(),
            writerModel.pageByWrt(start_offset)
        ]).then(([nRows, rows]) => {
            var total = nRows[0].total;
            var nPage = Math.floor(total / limit);
    
            if (total % limit > 0) nPage++;
    
            var page_number = [];
            for (i = 1; i <= nPage; i++) {
                page_number.push({
                    value: i,
                    active: i === +page
                })
            }
            res.render('user/role', {
                RoleID,
                writer:rows,
                page_number,
                layout: false
            })
        }).catch(next);     
        else if (RoleID == 3)
        Promise.all([
            editorModel.count(),
            editorModel.pageByEdi(start_offset)
        ]).then(([nRows, rows]) => {
            var total = nRows[0].total;
            var nPage = Math.floor(total / limit);
    
            if (total % limit > 0) nPage++;
    
            var page_number = [];
            for (i = 1; i <= nPage; i++) {
                page_number.push({
                    value: i,
                    active: i === +page
                })
            }
            res.render('user/role', {
                RoleID,
                editor: rows,
                page_number,
                layout: false
            })
        }).catch(next);    else {
            res.redirect('/admin/user');
        }
    }).catch(next);
});

router.get('/add', (req, res) => {
    var entity = {
        RoleID: req.query.TypeAccount
    };
    if (entity.RoleID == 2)
        res.render('user/add_writer', {
            layout: false
        });
    else if (entity.RoleID == 3)
        res.render('user/add_editor', {
            layout: false
        });
    else res.redirect('/admin/user');
});


router.post('/add/writer', (req, res, next) => {
    var entity = req.body;
    var account = {
        Username: entity.UserName,
        Password: entity.Password,
        RoleID: 2,
        AccIsActive: 1,
        AccCreatedOn: helpersFunc.getDateTimeNow()
    };
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(account.Password, salt);
    account.Password = hash;

    var writer = {
        FullName: entity.FullName,
        Avatar: "/img/user/default-avatar.jpg",
        DOB: entity.DOB,
        AccID: 1,
        Pseudonym: entity.Pseudonym
    };

    accountModel.add(account).then(id => {
        writer.AccID = id;
        writerModel.insert(writer).then(id => {
            res.redirect('/admin/user');
        }).catch(next);
    }).catch(next);
});

router.post('/add/editor', (req, res, next) => {
    var entity = req.body;
    var account = {
        Username: entity.UserName,
        Password: entity.Password,
        RoleID: 3,
        AccCreatedOn: helpersFunc.getDateTimeNow(),
        AccIsActive: 1
    };
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(entity.Password, salt);
    account.Password = hash;

    var editor = {
        FullName: entity.FullName,
        Avatar: "/img/user/default-avatar.jpg",
        DOB: req.body.DOB,
        AccID: 1
    };
    accountModel.add(account).then(id => {
        editor.AccID = id;
        editorModel.insert(editor).then(id => {
            res.redirect('/admin/user');
        }).catch(next);
    }).catch(next);
});

router.get('/detail/subscriber/:id',  (req, res) => {
    var id = req.params.id;
    subscriberModel.single(id).then(rows => {
        rows[0].DOB = moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');
        rows[0].BoughtOn = helpersFunc.formatDateTime(rows[0].BoughtOn);
        rows[0].ExpiredOn = helpersFunc.formatDateTime(rows[0].ExpiredOn);
        res.render('user/detail_subscriber', {
            subscriber: rows[0],
            layout: false
        })
    })
});

router.get('/update/subscriber/:id',  (req, res, next) => {
    var id = req.params.id;
    var date = new Date();
    subscriberModel.single(id).then(rows => {
        if (rows.length > 0) {
            if (rows[0].ExpiredOn == null) {
                rows[0].BoughtOn.setDate(rows[0].BoughtOn.getDate() + 7)
                var entity = {
                    ExpiredOn: rows[0].BoughtOn
                }
                subscriberModel.update(rows[0].SubscriberID,entity).then(n => {
                    res.redirect(`/admin/user/detail/subscriber/${id}`)
                })
            } else if (rows[0].ExpiredOn <= date) {
                date.setDate(date.getDate() + 7)
                var entity = {
                    ExpiredOn: date
                }
                subscriberModel.update(rows[0].SubscriberID,entity).then(n => {
                    res.redirect(`/admin/user/detail/subscriber/${id}`)
                })
            } else if (rows[0].ExpiredOn > date) {
                res.redirect(`/admin/user/detail/subscriber/${id}`);
            }
        }
    }).catch(next);
})

router.get('/detail/editor/:id',  (req, res) => {
    var id = req.params.id;
    editorModel.single(id).then(rows => {
        rows[0].DOB = moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');
            res.render('user/detail_editor', {
                editor: rows[0],
                layout: false
            });
    })
})
router.post('/update/editor', (req, res, next) => {
    var entity=req.body;
    var catEntity={CatID:entity.CatID,EditorID:entity.EditorID};
    delete entity.CatID;
     Promise.all([
        editorModel.update(entity),
        categoryModel.update(catEntity)
    ]).then(([nE])=>{
        res.redirect('/admin/user')
    }).catch(next);
})

router.get('/detail/writer/:id',  (req, res, next) => {
    var id = req.params.id;
    writerModel.single(id).then(rows => {
        rows[0].DOB = moment(new Date(rows[0].DOB), 'YYYY-MM-DD').format('YYYY-MM-DD');
        res.render('user/detail_writer', {
            writer: rows[0],
            layout: false
        });
    }).catch(next);
})
router.post('/update/writer', (req, res, next) => {
    var entity = req.body;
    var id=req.body.WriterID;
    delete entity.WriterID;
    writerModel.update(id, entity).then(n => {
        res.redirect('/admin/User');
    }).catch(next);
})

router.get('/editor/:id/category',(req,res,next)=>{
    var EditorID=req.params.id;
    Promise.all([
        categoryModel.allByEditor(EditorID),
        categoryModel.allByEditorIsNull()
    ]).then(([rows1,rows2])=>{
        res.render('user/editor_category',{
            layout:false,
            categoryEditor:rows1,
            category:rows2,
            EditorID
        })
    })
})

router.post('/editor/category/update',(req,res,next)=>{
    var EditorID=req.body.EditorID;
    var CatID=req.body.CatID;
    var entity={
        CatID:CatID,
        EditorID:EditorID
    }
    categoryModel.update(entity).then(n=>{
        res.redirect(`/admin/user/editor/${EditorID}/category`);
    })
})

router.post('/editor/category/delete',(req,res,next)=>{
    var EditorID=req.body.EditorID;
    var id=req.body.CatID;
    entity={CatID:id,
        EditorID:null
    };
    categoryModel.update(entity).then(n=>{
        res.redirect(`/admin/user/editor/${EditorID}/category`);
    })
})
router.get('/delete/subscriber',  (req, res, next) => {
    var id = req.query.SubscriberID;
    subscriberModel.single(id).then(rows => {
        if (rows.length > 0)
            accountModel.delete(rows[0].AccID).then(n => {
                res.redirect('/admin/user')
            })
    }).catch(next);
});
router.get('/delete/writer',  (req, res, next) => {
    var id = req.query.WriterID;
    writerModel.single(id).then(rows => {
        if (rows.length > 0)
            accountModel.delete(rows[0].AccID).then(n => {
                res.redirect('/admin/user')
            })
    }).catch(next);
});
router.get('/delete/editor',  (req, res, next) => {
    var id = req.query.EditorID;
    categoryModel.allByEditor(id).then(rows=>{
        if(rows.length>0)
        {
            for(var i=0;i<rows.length;i++)
            {
                entity={CatID:rows[i].CatID,
                    EditorID:null
                };
                categoryModel.update(entity).then(n=>{
                })
            }
        }
    }).catch(next);

    editorModel.single(id).then(rows => {
        if (rows.length > 0)
            accountModel.delete(rows[0].AccID).then(n => {
                res.redirect('/admin/user')
            })
        res.redirect('/admin/user')
    }).catch(next);
});

module.exports = router;