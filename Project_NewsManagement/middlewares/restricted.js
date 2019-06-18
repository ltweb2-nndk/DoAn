module.exports = (req, res, next) => {
    if (!req.user) {
        return res.redirect(`/account/login?originalURL=${req.originalUrl}`);
    }

    next();
}