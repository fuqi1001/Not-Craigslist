var bodyParser = require("body-parser");
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var configRoutes = require("./routes");
var multer = require("multer");
var multiparty = require('multiparty');
var mongoose = require( "mongoose")
var session = require("express-session")
var cookieParser = require('cookie-parser')
var connectMongo = require("connect-mongo")
var passport = require("passport")
var configurePassport = require("./data/passport")
var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.disable("x-powered-by")

app.set('redis', require("./redis-connection"));

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser())

const db = "mongodb://localhost/recipeDatabase";
const connect = () => {
	mongoose.connect(db, (err, res) => {
		if (err) {
			console.log(`Error connecting to ${db}. ${err}`)
		} else {
			console.log(`Successfully connected to ${db}.`)
		}
	})
}
connect()

mongoose.connection.on("error", console.error)
mongoose.connection.on("disconnected", connect)

configurePassport.configurePassport(app, passport)



const MongoStore = connectMongo(session)
const sess = {
		resave: true,
		saveUninitialized: true,
		secret: "secrets",
		proxy: false,
		name: "sessionId",
		cookie: {
			httpOnly: true,
			secure: false
		},
		store: new MongoStore({
			url: "mongodb://localhost/recipeDatabase",
			autoReconnect: true
		})
	}

var node_env = process.env.NODE_ENV;
console.log('--------------------------');
console.log('===> 😊  Starting Server . . .');
console.log('===>  Environment: ' + node_env);
if(node_env === 'production') {
  console.log('===> 🚦  Note: In order for authentication to work in production');
  console.log('===>           you will need a secure HTTPS connection');
  sess.cookie.secure = true; // Serve secure cookies
}

app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

configRoutes(app);
var users = require("./apis/user")
app.post("/login", users.login)
app.get("/logout", users.logout)
app.post("/register", users.register)
app.get("/checkLogin", users.checkLogin)

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎👿  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})