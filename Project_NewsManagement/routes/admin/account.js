var express = require('express');
var router = express.Router();
var accountModel = require('../../models/account.model');
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');

router.get('/username-is-available',restricted ,isAdmin, (req, res, next) => {
    var username = req.query.user;
    accountModel.getByUsername(username).then(rows => {
        if (rows.length > 0) res.json(false);
        else res.json(true);
    }).catch(next);
});
router.get('/edit/:id', restricted,isAdmin,(req, res, next) => {
    var id = req.params.id;
    var UserID=req.query.UserID;
    var UserName=req.query.UserName;
    accountModel.single(id).then(rows => {
        res.render('account/edit', {
            account: rows[0],
            UserID,
            UserName,
            layout: false
        })
    }).catch(next);
})

router.post('/update', (req, res, next) => {
    var entity = req.body;
    var id = entity.AccID;
    var UserID=entity.UserID;
    var UserName=entity.UserName;
    delete entity.AccID;
    delete entity.UserID;
    delete entity.UserName
    console.log(UserName);
    accountModel.update(id, entity).then(n => {
        if(UserName=='Editor')
        res.redirect(`/admin/user/detail/editor/${UserID}`);
        else if(UserName=='Subscriber')
        res.redirect(`/admin/user/detail/subscriber/${UserID}`);
        else if(UserName=='Writer')
        res.redirect(`/admin/user/detail/writer/${UserID}`);
        else res.redirect('/admin/user');
    }).catch(next);
})

module.exports = router;