const database = require('./datbase.js');
var loadAllItems = database.loadAllItems;
var loadPromotions = database.loadPromotions;

var itemInfo = [];
var promotInfo = [];
function main() {

    //读取全部货物信息
    loadItemFromDatabase();
    //获取全部促销信息
    loadPromotFromDatabase();
    //最终返回
    console.log("Debug Info");
    return 'Hello World!';
};

function printInventory(inputs) {
    console.log(inputs);
};

function loadItemFromDatabase() {
    itemInfo = loadAllItems();
    console.log(itemInfo);
}

function loadPromotFromDatabase() {
    promoteInfo = loadPromotions();
    console.log(promoteInfo);
}
module.exports = {
    main: main,
    printInventory: printInventory,
    loadItemFromDatabase: loadItemFromDatabase,
    loadPromotFromDatabase: loadPromotFromDatabase
};
