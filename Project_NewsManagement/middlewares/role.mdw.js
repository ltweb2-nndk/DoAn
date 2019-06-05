var roleModel = require('../models/role.model');

 module.exports = (req, res,next) => {
     roleModel.all().then(rows => {
         res.locals.lcRole = rows;
         next();
      })
 }