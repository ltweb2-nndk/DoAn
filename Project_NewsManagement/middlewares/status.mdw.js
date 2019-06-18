var statusModel = require('../models/status.model');

module.exports = (req, res, next) => {
    statusModel.allWithNum().then(rows => {
        res.locals.lcStatus = rows;
        next();
    });
};
