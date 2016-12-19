const redis = require("redis");
const NRP = require('node-redis-pubsub');
var uuid = require("node-uuid")
const collection = require('../react-redux-1/data/collection').apple;
const dataMethod = require("../react-redux-1/data/method");
const userMethod = require("../react-redux-1/data/user");
const User = require('../react-redux-1/data/user/model');
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var cache = require('express-redis-cache')({prefix:false});
var ObjectId = require('mongodb').ObjectID;
const xss = require('xss');

const config = {
    port: 6379, // Port of your locally running Redis server
    scope: 'createItem' // Use a scope to prevent two NRPs from sharing messages
};

const client = redis.createClient();

const redisConnection = new NRP(config); // This is the NRP client



redisConnection.on('create-item:*', (data, channel) => {

    let messageId = data.requestId;
    let item = data.data;

    let tmp = []
    tmp.push(item);
    //apple-created-failed

    collection().then((col) => {
        return () => {
            return col;
        }
    }).then((col) => {
        let datas = tmp.map(data => {
            return dataMethod.addApple(data);
        });
        return Promise.all(datas);
    }).then((data) => {
        return dataMethod.getAllApple();
    }).then((res) => {
        console.log(res);
        redisConnection.emit(`item-created:${messageId}`, {
            requestId: messageId,
            data: res,
        });
    }).catch(error => {
        redisConnection.emit(`item-created-failed:${messageId}`, {
            requestId: messageId
        });
    });
});

redisConnection.on('get-myItem:*', (data, channel) => {
    console.log("run");
    let messageId = data.requestId;
    console.log("worker ----   get-myItem:userid: " + data.userId)
    //apple-created-failed
    
    dataMethod.getMyApple(data.userId).then((res) => {
        console.log(res);
        redisConnection.emit(`myItem-got:${messageId}`, {
            requestId: messageId,
            data: res,
        });
    }).catch(error => {
        redisConnection.emit(`myItem-got-failed:${messageId}`, {
            requestId: messageId
        });
    });
});


redisConnection.on('get-item:*', (data, channel) => {
    console.log("run");
    let messageId = data.requestId;

    //apple-created-failed

    collection().then((col) => {
        return () => {
            return col;
        }
    }).then((data) => {
        return dataMethod.getAllApple();
    }).then((res) => {
        console.log(res);
        redisConnection.emit(`item-got:${messageId}`, {
            requestId: messageId,
            data: res,
        });
    }).catch(error => {
        redisConnection.emit(`item-got-failed:${messageId}`, {
            requestId: messageId
        });
    });
});

redisConnection.on('session-creat:*', (data, channel) => {
    let messageId = data.requestId;
    console.log("login");
    console.log(data.user._id);
    userMethod.getUser(ObjectId(data.user._id)).then((rs) => {
        console.log(rs);
        if (rs != null && rs != undefined){
            let session_id = uuid.v4();
            let now = new Date();
            let sessionObj = {
                userId: (rs._id).toString()
            };
            var sessionKey =  session_id;
            cache.add(sessionKey, JSON.stringify(sessionObj), { type: 'json' },
                function (error, added) {
                    redisConnection.emit(`session-created:${messageId}`, session_id);
                });
        } else {
            
            redisConnection.emit(`session-created-failed:${messageId}`, "Invalid user");
        }
    }).catch(error => {
        redisConnection.emit(`session-created-failed:${messageId}`, error);
    });
    
});

