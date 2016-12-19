const express = require('express');
const router = express.Router();
const redis = require("redis");
const uuid = require("node-uuid");
const fs = require("fs");
var formidable = require('formidable');
var path = require('path');
const NRP = require('node-redis-pubsub');


router.get("/", (req, res) => {
    console.log("run in api")
    
    const config = {
        port: 6379, // Port of your locally running Redis server
        scope: 'createItem' // Use a scope to prevent two NRPs from sharing messages
    };

    const redisConnection = new NRP(config);

    var messageId = uuid.v4();

    let killswitchTimeoutId = undefined;

    redisConnection.on(`item-got:${messageId}`, (data, channel) => {
        res.send(data.data);
        //console.log(res.json(insertedRecipe.recipe));
        redisConnection.off(`item-got:${messageId}`);
        redisConnection.off(`item-got-failed:${messageId}`);

        clearTimeout(killswitchTimeoutId);
    });

    redisConnection.on(`item-got-failed:${messageId}`, (error, channel) => {
        res
            .status(500)
            .json(error);

        redisConnection.off(`item-got:${messageId}`);
        redisConnection.off(`item-got-failed:${messageId}`);

        clearTimeout(killswitchTimeoutId);
    });

    killswitchTimeoutId = setTimeout(() => {
        redisConnection.off(`item-got:${messageId}`);
        redisConnection.off(`item-got-failed:${messageId}`);
        res
            .status(500)
            .json({error: "Timeout error"})
    }, 5000);

    redisConnection.emit(`get-item:${messageId}`, {
        requestId: messageId,

    });
    //res.send('success');
});


module.exports = router