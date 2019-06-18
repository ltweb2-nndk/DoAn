module.exports = (req, res, next) => {
    if (req.user.RoleID != 4) {
        return res.redirect('/');
    }

    next();
}