var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
 
            failureRedirect: '/register'
        }
 
    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/',
 
        failureRedirect: '/login',
        failureFlash : true // allow flash messages
    }
    
    ));
    app.get('/logout', authController.logout);
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }
    
 
 
 
}