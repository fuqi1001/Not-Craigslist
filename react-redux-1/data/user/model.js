var bcrypt = require("bcrypt-nodejs")
var mongoose = require("mongoose")
var crypto = require("crypto")

const UserSchema = new mongoose.Schema({
        email: { 
            type: String,
            unique: true,
            lowercase: true
        },
        password: String	
})

/**
 * Password hash middleware.
 */
UserSchema.pre("save", function(next) {
    var user = this
    if (!user.isModified("password")) return next()
    bcrypt.genSalt(5, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
}),

/*
Defining our own custom document instance method
*/
UserSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
},

/**
* Statics
*/
UserSchema.statics = {}


module.exports = mongoose.model("User", UserSchema);
// const UserSchema = new mongoose.Schema({
// 	email: { 
// 		type: String,
// 		unique: true,
// 		lowercase: true
// 	},
// 	password: String	
// })

// /**
//  * Password hash middleware.
//  */
// UserSchema.pre("save", function(next) {
// 	var user = this
// 	if (!user.isModified("password")) return next()
// 	bcrypt.genSalt(5, (err, salt) => {
// 		if (err) return next(err)
// 		bcrypt.hash(user.password, salt, null, (err, hash) => {
// 			if (err) return next(err)
// 			user.password = hash
// 			next()
// 		})
// 	})
// })

// /*
//  Defining our own custom document instance method
//  */
//  UserSchema.methods = {
//  	comparePassword: function(candidatePassword, cb) {
//  		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//  			if (err) return cb(err)
//  			cb(null, isMatch)
//  		})
//  	}
//  }

// /**
// * Statics
// */
// UserSchema.statics = {}

// export default mongoose.model("User", UserSchema)

