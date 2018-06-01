var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport, user) {
 
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
     
        },
        function(req, email, password, done) {
            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
             
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
             
                if (user)
             
                {
             
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
             
                } else
             
                {
             
                    var userPassword = generateHash(password);
             
                    var data =
             
                        {
                            full_name: req.body.first_name+req.body.last_name ,
                            email: email,
             
                            password: userPassword,

                            remember_token: null,
                            role: 1,
                            gender: 1,
                            phone_number: 123456789,
                            country: "vietnam",
                            city: "hcm",
                            address: "3/2 hcm"
             
                        };
                        console.log("da den");
             
                    User.create(data).then(function(newUser, created) {
             
                        if (!newUser) {
             
                            return done(null, false);
             
                        }
             
                        if (newUser) {
             
                            return done(null, newUser);
             
                        }
             
                    });
             
                }
             
            });
        }
     
    ));
    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });
    passport.deserializeUser(function(id, done) {
 
        User.findById(id).then(function(user) {
     
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
    
    

}