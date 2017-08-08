const database = require('./datbase.js');
var loadAllItems = database.loadAllItems;
var loadPromotions = database.loadPromotions;

posItem = {
    itemInfo: [],
    promotInfo: [],
    itemList: [],//处理促销后的消息
    promotList: [],
    total: 0,
    save: 0
}
function main() {
    console.log("Debug Info");
    return 'Hello World!';

}


function printInventory(inputs) {

    //读取全部货物信息
    loadItemFromDatabase();
    //获取全部促销信息
    loadPromotFromDatabase();
    //处理输入信息
    processInputItemInfo(inputs);
    //处理促销信息
    processPromotInfo();
    //打印回单
    printView();

}

function printView() {
    var printText =
        '***<没钱赚商店>购物清单***\n';
    posItem.itemList.forEach(item => {
        if (posItem.itemInfo.some(x => x.barcode === item.key)) {
            var x = posItem.itemInfo.find(x => x.barcode === item.key);
            if (posItem.promotList.some(x => x.send === item.key)) {
                var itemTextTemp = '名称：' + x.name + '，数量：' + (item.count)  + x.unit + '，单价：' + x.price.toFixed(2) + '(元)，小计：' + ((item.count - 1) * x.price).toFixed(2) + '(元)\n';
                posItem.total += (item.count - 1 )* x.price;
            }
            if (!posItem.promotList.some(x => x.send === item.key)) {
                var itemTextTemp = '名称：' + x.name + '，数量：' + (item.count) +  x.unit + '，单价：' + x.price.toFixed(2) + '(元)，小计：' + ((item.count) * x.price).toFixed(2) + '(元)\n';
                posItem.total += item.count * x.price;
            }
            printText += itemTextTemp;

        }
    })
    printText += '----------------------\n';
    printText += '挥泪赠送商品：\n';
    posItem.promotList.forEach(item => {
        if (posItem.itemInfo.some(x => x.barcode === item.send)) {
            var x = posItem.itemInfo.find(x => x.barcode === item.send);

            var promotTextTemp = '名称：' + x.name + '，数量：' + item.count + x.unit + '\n';
            printText += promotTextTemp;
            posItem.save += item.count * x.price;
        }
    })
    printText += '----------------------\n';
    var totalText = '总计：' + posItem.total.toFixed(2) + '(元)\n';
    var saveText = '节省：' + posItem.save.toFixed(2) + '(元)\n';
    printText += totalText;
    printText += saveText;
    printText += '**********************';

    console.log(printText);

}
function processInputItemInfo(inputs) {
    //处理输入信息
    if (!inputs || !Array.isArray(inputs)) {
        return;
    }
    var itemInputProcessed = [];
    var multiPattern = /(\w+)-(\d)/;
    inputs.forEach(item => {
        if (multiPattern.test(item)) {

            var multiExec = multiPattern.exec(item);
            if (itemInputProcessed.some(x => x.key === multiExec[1])) {
                itemInputProcessed.find(x => x.key === multiExec[1]).count += parseInt(multiExec[2], 10);

            }
            else {
                itemInputProcessed.push({ key: multiExec[1], count: parseInt(multiExec[2], 10) });
            }
        }
        else if (!multiPattern.test(item)) {
            if (itemInputProcessed.some(x => x.key === item)) {
                itemInputProcessed.find(x => x.key === item).count += 1;
            }
            else {
                itemInputProcessed.push({ key: item, count: 1 });
            }
        }
    })

    posItem.itemList = itemInputProcessed;
}

function processPromotInfo() {

    var barcodes = posItem.promoteInfo[0].barcodes;
    //统计处理促销后的货物清单
    posItem.itemList.forEach(item => {
        if (barcodes.some(x => x === item.key) && item.count >= 2) {
            posItem.promotList.push({ send: item.key, count: 1 });
        }
    })

}
function loadItemFromDatabase() {
    posItem.itemInfo = loadAllItems();

}


function loadPromotFromDatabase() {
    posItem.promoteInfo = loadPromotions();

}

module.exports = {
    main: main,
    printInventory: printInventory,
    loadItemFromDatabase: loadItemFromDatabase,
    loadPromotFromDatabase: loadPromotFromDatabase,
}
