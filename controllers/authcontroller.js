var exports = module.exports = {}
 
 
exports.signup = function(req, res) {
 
    res.render('../views/auth/register.hbs');
 
}
 
exports.signin = function(req, res) {
 
    res.render('../views/auth/signin.hbs');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}
 
 