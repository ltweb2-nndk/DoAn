module.exports = (req, res, next) => {
    if (req.user.RoleID != 2) {
        return res.redirect('/');
    }

    next();
}