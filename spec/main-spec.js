const main = require('../main/main.js');
const database = require('../main/datbase.js');

var loadAllItems = database.loadAllItems;
var loadPromotions = database.loadPromotions;
var printInventory = main.printInventory;
var loadItemFromDatabse = main.loadItemFromDatabase;
var loadPromotFromDatabase = main.loadPromotFromDatabase;

describe('pos', function () {
    var allItems;
    var inputs;
    var allPromots;
    beforeEach(function () {
        allItems = loadAllItems();
        allPromots = loadPromotions();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });



    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    //主函数获取货物测试
    it('should print all item infomation', function () {
        spyOn(console, 'log');
        main.main();
        expect(console.log).toHaveBeenCalledWith(allItems);
    });
    //主函数获取促销信息测试
    it('should pring all promotion infomation',function(){
        spyOn(console,'log');
        main.main();
        expect(console.log).toHaveBeenCalledWith(allPromots);

    })
});
