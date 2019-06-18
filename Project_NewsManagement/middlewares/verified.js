module.exports = (req, res, next) => {
    if (req.user.AccIsActive == 1) {
        return res.redirect('/');
    }
    
    next();
};