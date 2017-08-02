/**
 * Created by Class on 2017/7/21.
 */
var checkHelper = require("./checkHelper");
var mjHelper = require("./mjHelper");
var Client = {
    testAy:function(ay)
    {
        if(!ay)
        {
            ay = [];
            for(var i=0;i<14;i++)
            {
                var cards =  mjHelper.CFG.MJ_ALL_CARDS;
                ay.push(cards[parseInt(Math.random()*cards.length)] );

            }
        }

        var type = checkHelper.toType(ay);
        //var ret = checkHelper.checkAllCardHu(checkHelper.TypesAyToByte(type));
        var ret = checkHelper.justCheckHu(type);
        if(ret == -1)
        {
            //console.log("no hu");
        }
        else
        {
            console.log(checkHelper.Value2HuInfo(ret));
        }
    },
    testTimeAy:function(time)
    {
        var ays = [];
        for(var i=0;i<time;i++)
        {
           var  ay = [];
            var cards = [].concat(mjHelper.MJ_ALL_CARDS) ;
            for(var j=0;j<14;j++)
            {

                var idx = parseInt(Math.random()*cards.length);
                ay.push(cards[idx] );
                cards.splice(idx,1);

            }
            ays.push(ay);
        }
        ays.push([1,2,3,4,4]);
        var tempAy = [1,1,1,7, 8,8,8,8,9,2<<4 | 2,2<<4 | 2, 2<<4 | 5,2<<4 | 5,2<<4 | 5  ];
        ays.push(tempAy);

        tempAy = [1,2,2,3,3,4, 5,6,6,6,7 ];
        ays.push(tempAy);
        var begin = Date.now();

        //this.testAy(tempAy)
        for(var i=0;i<ays.length;i++)
        {
            this.testAy(ays[i])
        }
        var end = Date.now();
        console.log("check times:"+time + "  cost time:"+(end-begin));
    }
}

//Client.testTimeAy(10000);
//  31313
Client.testAy([1,1,1,2,3,3,3,4,5,5,5])