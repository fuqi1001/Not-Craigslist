const collections = require("./collection");
const collection = collections.apple;
let exportedMethods = {
    removeAll(){
        return collection().then((col) =>{
            return col.deleteMany({});
        })
    },
    getAllApple() {
        return collection().then((col) => {
            return col
                .find()
                .toArray();
        });
    },
    getMyApple(id) {
        return collection().then((col) => {
            return col.find({userId: id}).toArray();
        })
    },
    getApple(id) {
        return collection().then((col) => {
            return col.findOne({_id: id});
        })
    },
    addApple(inputData) {
        return collection().then((col) => {
            inputData = JSON.parse(JSON.stringify(inputData));       

            return col.insertOne(inputData);
            
        }).then((inputData) => {
            return this.getApple(inputData.insertedId);
        });
    }

}

module.exports = exportedMethods;