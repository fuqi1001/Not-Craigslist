var mongoose = require("mongoose")
var passport =require ("passport")
var User = require("../data/user/model")
var uuid = require("node-uuid")
const redis = require("redis");
const NRP = require('node-redis-pubsub');
const userMethod = require("../data/user");
var cache = require('express-redis-cache')({prefix:false});
var ObjectId = require('mongodb').ObjectID;
// -------------------------------------------

exports.login = function(req, res, next) {
	// Do email and password validation for the server
	passport.authenticate("local", function(err, user, info) {	
		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}
		// ***********************************************************************
		// "Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response."
		// Source: http://passportjs.org/docs
		// ***********************************************************************		
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session	
        
        const config = {
            port: 6379, // Port of your locally running Redis server
            scope: 'createItem' // Use a scope to prevent two NRPs from sharing messages
        };

        const redisConnection = new NRP(config);
        
        let messageId = uuid.v4();
        let killswitchTimeoutId = undefined;

        redisConnection.on(`session-created:${messageId}`, (sessionId, channel) => {
            
            console.log("success");
            req.logIn(user, loginErr => {
                if(loginErr) {
                    res.json({ success: false, message: loginErr })
                }
                //var cookie = sessionId;
                //res.set("Auth-Token", sessionId);
                res.cookie("Auth-Token",sessionId, { maxAge: 900000, httpOnly: true });
                res.json({ success: true, message: "authentication succeeded" })
            })
            redisConnection.off(`session-created:${messageId}`);
            redisConnection.off(`session-created-failed:${messageId}`);

            clearTimeout(killswitchTimeoutId);
        });

        redisConnection.on(`session-created-failed:${messageId}`, (error, channel) => {
            res
                .status(500)
                .json(error);

            redisConnection.off(`session-created:${messageId}`);
            redisConnection.off(`session-created-failed:${messageId}`);

            clearTimeout(killswitchTimeoutId);
        });

        killswitchTimeoutId = setTimeout(() => {
            redisConnection.off(`session-created:${messageId}`);
            redisConnection.off(`session-created-failed:${messageId}`);
            res
                .status(500)
                .json({error: "Timeout error"})
        }, 5000);

        console.log(user);
        redisConnection.emit(`session-creat:${messageId}`, {
            requestId: messageId,
            user: user
        });
	
		
	})(req, res, next)
}

// -------------------------------------------

exports.logout = function(req, res, next) {
	// the logout method is added to the request object automatically by Passport
    
	req.logout()
    let key = req.cookies['Auth-Token']
    cache.del(key, (error, entries)=> {
        return res.json({ success: true });
    })
	
}

// -------------------------------------------

exports.register = function(req, res, next) {
	User.findOne({ email: req.body.email }, (err, user) => {
		// is email address already in use?
		if (user) {			
			res.json({ success: false, message: "Email already in use" })
			return 
		}
		// go ahead and create the new user
		else {
            console.log(req.body);
			User.create(req.body, (err) => {
				if (err) {
					console.error(err)
					res.json({ success: false })
					return
				}
				res.json({ success: true })
				return 
			})
		}
	})
}

// -------------------------------------------

exports.checkLogin = function(req, res, next) {
    
    let key = req.cookies['Auth-Token']
    cache.get(key, (error, entries)=> {
        if (entries.length > 0) {
            let obj = JSON.parse(entries[0].body)
            let userId = obj.userId;
            userMethod.getUser(ObjectId(userId)).then((user) => {
                console.log("*****")
                console.log(user)
                console.log("*****")
                res.json({success: "true", email: user.email});
            })
        } else {
            res.json({success: "false"});
        }
        
    })
}