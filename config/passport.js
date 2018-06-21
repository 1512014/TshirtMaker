var bCrypt = require('bcrypt-nodejs');
var models = require('../models');

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

                    return done(null, false, req.flash('registerMessage','That email is already taken'
                    ));

                } else

                {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            first_name: req.body.first_name,
                            last_name:req.body.last_name ,
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

                    models.User.create(data).then(function(newUser, created) {

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

            User.findOne({
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
