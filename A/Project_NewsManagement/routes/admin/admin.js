var express = require('express');
var router = express.Router();
var restricted = require('../../middlewares/restricted');
var isAdmin = require('../../middlewares/isAdmin');

router.get('/', restricted, isAdmin, (req, res) => {
    res.render('admin/admin', {
        layout: false
    });
});
module.exports = router;
