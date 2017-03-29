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

}

module.exports = exportedMethods;