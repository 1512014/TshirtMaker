var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
module.exports = function(passport, user) {

    var User = models.User;
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
            models.User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (user)

                {

                    return done(null, false, req.flash('registerMessage','That email is already taken'
                    ));

                } else

                {

                    var userPassword = generateHash(password);
                    var data =

                        {
                            firstName: req.body.first_name,
                            lastName:req.body.last_name ,
                            email: email,
                            password: userPassword,
                            rememberToken: null,
                            role: 'user',
                            gender: req.body.gender

                        };

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
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, email, password, done) {

            var isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            models.User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, req.flash('loginMessage', 'Email does not exist.'));

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, req.flash('loginMessage','Incorrect password.'
                    ));

                }

                return done(null, user);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, req.flash('loginMessage','Something went wrong with your Signin'
                ));

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
