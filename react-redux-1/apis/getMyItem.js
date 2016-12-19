const express = require('express');
const router = express.Router();
const redis = require("redis");
const uuid = require("node-uuid");
const fs = require("fs");
var formidable = require('formidable');
var path = require('path');
const NRP = require('node-redis-pubsub');
var cache = require('express-redis-cache')({prefix:false});


router.get("/", (req, res) => {
    let key = req.cookies['Auth-Token']
    cache.get(key, (error, entries)=> {
        console.log("------------")
        var obj = JSON.parse(entries[0].body);
       
        const config = {
            port: 6379, // Port of your locally running Redis server
            scope: 'createItem' // Use a scope to prevent two NRPs from sharing messages
        };

        const redisConnection = new NRP(config);

        var messageId = uuid.v4();

        let killswitchTimeoutId = undefined;

        redisConnection.on(`myItem-got:${messageId}`, (data, channel) => {
            res.send(data.data);
            //console.log(res.json(insertedRecipe.recipe));
            redisConnection.off(`myItem-got:${messageId}`);
            redisConnection.off(`myItem-got-failed:${messageId}`);

            clearTimeout(killswitchTimeoutId);
        });

        redisConnection.on(`myItem-got-failed:${messageId}`, (error, channel) => {
            res
                .status(500)
                .json(error);

            redisConnection.off(`myItem-got:${messageId}`);
            redisConnection.off(`myItem-got-failed:${messageId}`);

            clearTimeout(killswitchTimeoutId);
        });

        killswitchTimeoutId = setTimeout(() => {
            redisConnection.off(`myItem-got:${messageId}`);
            redisConnection.off(`myItem-got-failed:${messageId}`);
            res
                .status(500)
                .json({error: "Timeout error"})
        }, 5000);
        
        redisConnection.emit(`get-myItem:${messageId}`, {
            requestId: messageId,
            userId: obj.userId
        });
        //res.send('success');
    })
});


module.exports = router