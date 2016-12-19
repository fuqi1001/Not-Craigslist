const addItemsRoutes = require("../apis/addItems")
const getItemsRoutes = require("../apis/getItem")
const getMyItemRoutes = require("../apis/getMyItem")
const constructorMethod = (app) => {
    app.use("/addPic", addItemsRoutes);
    app.use("/getItem", getItemsRoutes);
    app.use("/getMyItem", getMyItemRoutes);
};

module.exports = constructorMethod;