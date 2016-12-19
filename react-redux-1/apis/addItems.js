const express = require('express');
const router = express.Router();
const redis = require("redis");
const uuid = require("node-uuid");
const fs = require("fs");
var formidable = require('formidable');
var path = require('path');
const NRP = require('node-redis-pubsub');
var cache = require('express-redis-cache')({prefix:false});
const userMethod = require("../data/user");
var ObjectId = require('mongodb').ObjectID;

//var util = require('util');

router.get("/", (req, res) => {
    res.send('success');
});

router.post("/", (req, res) => {
    console.log("get request");
    //console.log(req.cookies['Auth-Token']);
    
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/../uploads');
    files = [],
        fields = [];
    form.on('file', function(field, file) {
        files.push([field, file]);
        //fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('field', function(field, value) {
        fields.push([field, value]);
        //console.log(fields[0]);
    })

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        let key = req.cookies['Auth-Token']
        console.log('*****');
        console.log(key);
        cache.get(key, (error, entries)=> {
            console.log("------------")
            var obj = JSON.parse(entries[0].body);
            console.log(obj.userId);
            
            var messageId = uuid.v4();

            var item = {};
            item.images = [];
            files.map((file, i) => {
                //console.log(file);
                //var newPath = path.join(form.uploadDir, messageId + '.jpg');
                //console.log("----------")
                //console.log(newPath);
                //console.log(form.uploadDir);
                //console.log("----------")
                console.log(__dirname);
                let newPath = "../uploads/" + messageId + i + '.jpg';
                item.images.push(newPath);
                fs.rename(file[1].path, path.join(form.uploadDir, messageId + i + '.jpg'));
            })
            fields.map(field => {
                console.log(field);
                item[field[0]] = field[1];
            })
            
            userMethod.getUser(ObjectId(obj.userId)).then((user) => {
                item.userId = obj.userId;
                item.creator = user.email;
                console.log(item);
            const config = {
                port: 6379, // Port of your locally running Redis server
                scope: 'createItem' // Use a scope to prevent two NRPs from sharing messages
            };

            const redisConnection = new NRP(config);

            let killswitchTimeoutId = undefined;

            redisConnection.on(`item-created:${messageId}`, (data, channel) => {
                res.send('success');
                //console.log(res.json(insertedRecipe.recipe));
                redisConnection.off(`item-created:${messageId}`);
                redisConnection.off(`item-created-failed:${messageId}`);

                clearTimeout(killswitchTimeoutId);
            });

            redisConnection.on(`item-created-failed:${messageId}`, (error, channel) => {
                res
                    .status(500)
                    .json(error);

                redisConnection.off(`item-created:${messageId}`);
                redisConnection.off(`item-created-failed:${messageId}`);

                clearTimeout(killswitchTimeoutId);
            });

            killswitchTimeoutId = setTimeout(() => {
                redisConnection.off(`item-created:${messageId}`);
                redisConnection.off(`item-creation-failed:${messageId}`);
                res
                    .status(500)
                    .json({error: "Timeout error"})
            }, 5000);

            redisConnection.emit(`create-item:${messageId}`, {
                requestId: messageId,
                data: item
            });
            })
            
            //res.end('success');
        });
        })
        

    form.parse(req);
});

module.exports = router