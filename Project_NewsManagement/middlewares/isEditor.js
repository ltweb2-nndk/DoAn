module.exports = (req, res, next) => {
    if (req.user.RoleID != 3) {
        return res.redirect('/');
    }

    next();
}