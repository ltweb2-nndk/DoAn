var statusModel = require('../models/status.model');

module.exports = (req, res, next) => {
    statusModel.all().then(rows => {
        res.locals.lcStatus = rows;
        next();
    });
};
