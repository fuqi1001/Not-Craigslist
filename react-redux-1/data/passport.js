/* Initializing PassportJS */
var User = require("./user/model")
var local = require("./passport/local")

exports.configurePassport = function(app, passport) {
        passport.serializeUser((user, done) => {  	
            done(null, user.id)
        })

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {      
                done(err, user)
            })
        })

        // use the following strategies
        passport.use(local)
}

