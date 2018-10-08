const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username,password,done){
        let query = {username: username};
        User.findOne(query,function(err,user) {
            if(err){
                console.log(err);
                return;
            }

            if(!user){
                return done(null,false,{message: "user does not exist"})
            }

            if(bcrypt.compare(password,user.password),function(err,isMatch){
                if(err){
                    console.log(err);
                    return;
                }
                if(!isMatch){
                    return done(null,false,{message: "Incorrect password"})
                }
                return done(null,user)
            });
        })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}
