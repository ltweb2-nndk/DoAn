var rankModel = require('../models/rank.model');

module.exports = (req, res, next) => {
    rankModel.all().then(rows => {
        res.locals.lcRank = rows;
        next();
    });
};