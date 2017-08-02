/**
 * Created by Class on 2017/7/21.
 */
var fs = require("fs");

var checkHelper = require("./checkHelper");
var helper = {
    build:function()
    {
        var resaults = {};
        var infos = fs.readFileSync("result.txt" ,{encoding:"utf8"});
        var ay = JSON.parse(infos);
        for(var i=0;i<ay.length;i++)
        {
            var bkey = checkHelper.toType(ay[i]);
            var huInfo = {
                2:0,
                3:0,
                4:0,
                abc:0,
                444:0,
                333:0,
                222:0,
                type:0
            };
            var canHu = checkHelper.CHECK_HU.CHECK_CARD_HU(bkey,0,huInfo);
            if(canHu)
            {
                huInfo[3] += huInfo["333"]*3;
                huInfo[4] += huInfo["444"]*3;
                resaults[checkHelper.TypesAyToByte(bkey)] = this.huInfo2Value(huInfo)
            }
        }

        ///
        var spicial = [
            [3,3,3,3],
            [3,3,3],
            [3,3],
            [3],
            [2],
            [1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [1,1,1]
        ];
        for(var i=0;i<spicial.length;i++)
        {
            var bkey = spicial[i];
            huInfo = {
                2:0,
                3:0,
                4:0,
                abc:0,
                444:0,
                333:0,
                222:0,
                type:0
            };
            var canHu = checkHelper.CHECK_HU.CHECK_CARD_HU(bkey,0,huInfo);
            if(canHu)
            {
                huInfo[3] += huInfo["333"]*3;
                huInfo[4] += huInfo["444"]*3;
                resaults[checkHelper.TypesAyToByte(bkey)] = this.huInfo2Value(huInfo);
            }
        }

        fs.writeFileSync("values.json" , JSON.stringify(resaults),{encoding:"utf8"});
    },
    huInfo2Value:function(huInfo)
    {
        var k2 = huInfo[2];
        var k3 = huInfo[3];
        var k4 = huInfo[4];

        console.log("4:"+k4 + "  3:"+k3 + "  2:"+k2);
        return k4<<8 | k3<<4 | k2;
    },
    Value2HuInfo:function(value)
    {
        var ret =  {
            2:value  & 0xf,
            3:value>>4 & 0xf,
            4:value>>8 & 0xf
        };
        return ret;
    },
    test:function()
    {

        var bkey = [3,3,1,1,3];
        //var bkey=[3,0,1,4,1,0,2,0,3]
        var huInfo = {
            2:0,
            3:0,
            4:0,
            abc:0,
            444:0,
            333:0,
            222:0,
            type:0
        };
        var canHu = checkHelper.CHECK_HU.CHECK_CARD_HU(bkey,0,huInfo);
        if(canHu)
        {
            console.log("ok build:"+JSON.stringify(huInfo));
        }
    }
}
console.log("begin build");
helper.build()
//helper.test()
console.log("end build");