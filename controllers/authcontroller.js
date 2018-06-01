var exports = module.exports = {}
 
 
exports.signup = function(req, res) {
 
    res.render('../views/auth/register.hbs');
 
}
 
exports.signin = function(req, res) {
 
    res.render('../views/auth/signin.hbs');
 
}
 
 