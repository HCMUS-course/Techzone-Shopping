exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('auth/views/login', {wrongPassword});
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};