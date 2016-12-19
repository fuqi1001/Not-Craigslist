const mongoCollections = require("./collection")
const userCollection = mongoCollections.users;
const sessionCollection = mongoCollections.sessions;


let exportedMethods = {
    getUser(id) {
        return userCollection().then((col) => {
            return col.findOne({_id: id})
        })
    },
    getAll() {
        return userCollection().then((col) => {
            return col
                .find()
                .toArray();
        });
    }
    // getSessionIdByUserId (id) {
    //     return sessionCollection().then((col) => {
    //         return col.findOne({passport : {user: id})
            
    //     })
    // }

}

module.exports = exportedMethods;