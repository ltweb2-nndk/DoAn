module.exports = (req, res, next) => {
    if (req.user.RoleID != 1) {
        return res.redirect('/');
    }

    next();
}