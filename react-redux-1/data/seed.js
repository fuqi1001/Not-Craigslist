const collection = require('./collection');
const testData = require("./method");

const test = [
    {
        title: "1 Coffee"
    },
    {
        title: "2 Coffee"
    },
    {
        title: "3 Coffee"
    }
];

collection().then((col) => {
    return () => {
        return col;
    }
}).then((col) => {
    let datas = test.map(data => {
        return testData.addRecipe(data);
    });
     return Promise.all(datas);

}).then((data) => {
    console.log(data[0]);
    return testData.getAllRecipes();
}).then(console.log);