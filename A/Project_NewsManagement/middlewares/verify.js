module.exports = (req, res, next) => {
    if (req.user.AccIsActive == 0) {
        return res.redirect('/account/verify');
    }
    
    next();
};