/**
 * Created by Class on 2017/7/21.
 */
var helper = {

    CFG:{
        CARD_TYPE:{
            WAN		: 0,
            TIAO	: 1,
            TONG	: 2,
            FENG	: 3, // dong xi nan bei
            DRAGON	: 4, // bai fa zhong
            HUA     : 5, /// chun  xia qiu dong
            PAI_TYPE_INVALID : 255
        },
        CARD_TYPE_DES:{
            0	: "wan",
            1	: "tiao",
            2	: "tong",
            3	: "feng",
            4	: "long",
            5     : "hua", /// chun  xia qiu dong
            255 : "ERROR"
        },
        MJ_CARDS:null,
        MJ_ALL_CARDS:null
    },
    initCfg:function()
    {
        this.CFG.MJ_CARDS = [];

        var cardList = this.CFG.MJ_CARDS;
        var cardType = 0;
        for(;cardType<3;cardType++)
        {

            for(var j=1;j<10;j++)
            {
                var card =  cardType<<4 | j;
                cardList.push(card)
            }

        }


        for(var j=1;j<5;j++)
        {
            var card =  cardType<<4 | (j*2-1);
            cardList.push(card)
        }

        cardType++;

        for(var j=1;j<4;j++)
        {
            var card =  cardType<<4 | (j*2-1);
            cardList.push(card)
        }

        this.MJ_ALL_CARDS = [];
        for(var i=0;i<cardList.length;i++)
        {
            for(var j=0;j<4;j++)
            {
                this.MJ_ALL_CARDS.push(cardList[i]);
            }
        }
    },
    printAllCards:function()
    {
        var res = {};
        var cards = this.CFG.MJ_CARDS;
        var index = 0;
        for(var i=0;i<cards.length;i++)
        {
            var card = cards[i];
            var info = this.GetInfo(card);
            var color = info[0],num = info[1];
            var ay = res[color] || (res[color] = [])
            ay.push(num);
        }
        console.log(JSON.stringify(res));
    },
    GetColor:function(face)
    {
        return face>>4;
    },
    GetNum:function(face)
    {
        return face&0xF;
    },
    GetInfo:function(face)
    {
        return [face>>4,face&0xF]
    }
}

helper.initCfg();
//helper.printAllCards();

module.exports = helper;