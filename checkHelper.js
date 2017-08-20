/**
 * Created by Class on 2017/7/21.
 */

var mjHelper = require("./mjHelper");
var Key_values = require("./values");
var helper = {
    toType:function(ay)
    {
        var buffer  = [];

        if(ay.length>0)
        {

            var count = 1;
            var lastInfo = mjHelper.GetInfo(ay[0]);
            var lastNum = lastInfo[1];
            var lastColor = lastInfo[0];
            ///  not support HUA


            for(var i=1;i<ay.length;i++)
            {
                var tempInfo = mjHelper.GetInfo(ay[i]);
                var tempColor = tempInfo[0];
                var tempNum = tempInfo[1];
                var sameColor = lastColor == tempColor;
                if(sameColor && tempNum === lastNum)
                {
                    count++;
                }
                else if(sameColor && tempNum === lastNum+1)
                {
                    buffer.push(count);
                    count = 1;
                }
                else
                {
                    buffer.push(count);
                    buffer.push(0);
                    count = 1;
                }
                lastNum = tempNum;
                lastColor = tempColor;
            }
            if(count >0 )
            {
                buffer.push(count);
                buffer.push(0);
            }
        }
        buffer.pop();
        return buffer;
    },
    B2ValueWithOut_0_Ay:[0,[0,1],[parseInt('110',2),3],[parseInt('11110',2),5],[parseInt('1111110',2),7]],
    B2ValueWith_0_Ay:[0,[parseInt('10',2),2],[parseInt('1110',2),4],[parseInt('111110',2),6],[parseInt('11111110',2),8]],
    TypesAyToByte:function(ay)
    {
        var fVaule1 = this.B2ValueWithOut_0_Ay;
        var fVaule2 = this.B2ValueWith_0_Ay;

        var resault = ay.length<<27;
        var tempValue = null;
        var offset = 27;
        for(var i= 0;i<ay.length;i++)
        {
            var num = ay[i];
            if(i<ay.length-1 && ay[i+1] == 0)
            {
                tempValue = fVaule2[num];
                i++;
            }
            else
            {
                tempValue = fVaule1[num];
            }
            offset -= tempValue[1];
            resault |= tempValue[0]<<offset;

        }

        this.TypesByteToAy(resault);
        return resault;

    },
    TypesByteToAy:function(resault)
    {
        var count = resault>>27;
        count = count<0 ?count+32:count;

        var ay = [];
        var max = 26;
        var begin=0;
        var fVaule1 = this.B2ValueWithOut_0_Ay;
        var fVaule2 = this.B2ValueWith_0_Ay;
        for(var key = max;key>-1;key--)
        {
            var value = resault>>key&0x1;

            if(value == 1)
            {
                begin++;
            }
            else
            {
                begin++;
                var tempCount = parseInt((begin+1)/2);
                ay.push(tempCount)
                begin%2 === 0?ay.push(0):0;
                begin = 0;

            }
            if(ay.length == count)
            {
                break;
            }
        }


        return ay;
    },
    testKey:function(ay)
    {

        if(!ay)
        {
            ay = [];
            for(var i=0;i<14;i++)
            {
                var cards =  mjHelper.CFG.ALL_CARDS;
                ay.push(cards[parseInt(Math.random()*cards.length)] );

            }
        }


        ay = helper.toType(ay);
        console.log(ay);
        var intKey = this.TypesAyToByte(ay);
        console.log(intKey);
        ay = this.TypesByteToAy(intKey);
        console.log(ay);
    },
    testOneHu:function(ay)
    {
        var bkey = this.toType(ay);
        var huInfo = {};
        var canHu = this.CHECK_HU.CHECK_CARD_HU(bkey,0,huInfo);
        if(canHu)
        {
            console.log(bkey + "  can hu")
        }
        else
        {
            console.log("nohu")
        }
    },
    CHECK_HU:{
        //  to create map check one
        checkOneHu:function(cards,checkDeep,huInfos)
        {
            if(cards.length == 0)
            {
                return true;
            }
            else if(cards.length ==1)
            {
                if(cards[0] == 1 && checkDeep == 0)
                    return false;
                if(cards[0] != 0)
                {
                    huInfos[cards[0]+checkDeep]++;
                }
                return true;
            }
            else if(cards.length == 2)
            {
                return this.checkOneHu([cards[0]],checkDeep,huInfos) && this.checkOneHu([cards[1]],checkDeep,huInfos) ;
            }
            else if(cards.length == 3 && (cards[0] ==cards[1] && cards[1]== cards[2]) )
            {
                if(cards[0] == 2)
                {
                    if(checkDeep == 0)
                        huInfos["222"]++;
                    else if(checkDeep == 1)
                    {
                        huInfos["333"]++;
                    }
                    else if(checkDeep == 2)
                    {
                        huInfos[4] += 3;
                    }
                }
                else if(cards[0]==3)
                {
                    if(checkDeep == 0)
                    {
                        huInfos["333"]++;
                    }
                    else if(checkDeep == 1)
                    {
                        huInfos[4] += 3;
                    }
                }
                else if(cards[0] == 4)
                {
                    huInfos["4"] += 3;
                }
                else
                {
                    huInfos.abc+=cards[0];
                }
                return true;
            }
            else
            {

                var minIdx = cards.length,minValue = 10;
                //for(var i=0;i<cards.length;i++)
                //{
                //    if(cards[i] <minValue)
                //    {
                //        minValue = cards[i];
                //        minIdx = i;
                //    }
                //}

                //if(minValue == 3)
                //{
                //    var same = true;
                //    for(var i=1;i<cards.length;i++)
                //    {
                //        if(cards[i-1] != minValue)
                //        {
                //            same = false;
                //        }
                //    }
                //    if(same  )
                //    {
                //        huInfos[3] += cards.length;
                //        return true;
                //    }
                //}

                for(var i=2;i<cards.length;i++)
                {

                    minIdx = i-2,minValue = cards[i-2];
                    for(var j=i- 2,k=0;k<3;k++,j++)
                    {
                        if(cards[j] <minValue)
                        {
                            minValue = cards[i];
                            minIdx = i;
                        }
                    }

                    var canhu = this.checkLeft(cards,i,minValue,checkDeep,huInfos)
                    //if(i > 1)
                    //{
                    //    canhu |= this.checkLeft(cards,i,minValue,checkDeep,huInfos)
                    //}
                    //if(!canhu && i> 0 && i < cards.length-1)
                    //{
                    //    canhu |= this.checkCenter(cards,i,minValue,checkDeep,huInfos)
                    //}
                    //
                    //if(!canhu &&  i < cards.length-2)
                    //{
                    //    canhu |= this.checkRight(cards,i,minValue,checkDeep,huInfos)
                    //}
                    //if(!canhu  )
                    //{
                    //    var tempv = cards[i]+checkDeep;
                    //    if(tempv != 1)
                    //    {
                    //        huInfos[tempv]++;
                    //    }
                    //    var left = [],right=[];
                    //    for(var j=0;j<i;j++)
                    //    {
                    //        left.push(cards[j])
                    //    }
                    //    for(var j=i+1;j<cards.length;j++)
                    //    {
                    //        right.push(cards[j])
                    //    }
                    //
                    //    canhu = this.checkOneHu(left,checkDeep,huInfos) && this.checkOneHu(right,checkDeep,huInfos);
                    //}
                    if(canhu)
                        return  canhu;
                }
                return false;
            }
        },
        checkLeft:function(cards,idx,min,checkDeep,huInfos)
        {
            cards = [].concat(cards);
            cards[idx-2] -= min;
            cards[idx-1] -= min;
            cards[idx] -= min;


            var newHuInfos = {};
            for(var key in huInfos)
            {
                newHuInfos[key] = 0;
            }
            if(min>1)
            {
                var keys = min+""+min+""+min;
                newHuInfos[keys] = 1;
            }
            var canHu = this.CHECK_CARD_HU(cards,checkDeep,newHuInfos);
            if(canHu)
            {
                for(var key in huInfos)
                {
                    huInfos[key] += newHuInfos[key];
                }
                return true;
            }
            return false;

        },
        checkCenter:function(cards,idx,min,checkDeep,huInfos)
        {
            cards = [].concat(cards);
            cards[idx+1] -= min;
            cards[idx-1] -= min;
            cards[idx] -= min;
            var newHuInfos = {};
            for(var key in huInfos)
            {
                newHuInfos[key] = 0;
            }
            if(min>1)
            {
                var keys = min+""+min+""+min;
                newHuInfos[keys] = 1;
            }
            if(this.CHECK_CARD_HU(cards,checkDeep,newHuInfos));
            {
                for(var key in huInfos)
                {
                    huInfos[key] += newHuInfos[key];
                }
                return true;
            }
            return false;
        },
        checkRight:function(cards,idx,min,checkDeep,huInfos)
        {
            cards = [].concat(cards);
            cards[idx+1] -= min;
            cards[idx+2] -= min;
            cards[idx] -= min;

            var newHuInfos = {};
            for(var key in huInfos)
            {
                newHuInfos[key] = 0;
            }
            if(min>1)
            {
                var keys = min+""+min+""+min;
                newHuInfos[keys] = 1;
            }
            if(this.CHECK_CARD_HU(cards,checkDeep,newHuInfos));
            {
                for(var key in huInfos)
                {
                    huInfos[key] += newHuInfos[key];
                }
                return true;
            }
            return false;
        },

        ///  to create map check all cards
        CHECK_CARD_HU:function(cards,checkDeep,huInfos)
        {
            var checkAy = [];
            for(var i=0;i<cards.length;i++)
            {
                if(cards[i] == 0 )
                {
                    if(checkAy.length>0)
                    {
                        if(!this.checkOneHu(checkAy,checkDeep,huInfos))
                        {
                            return false;
                        }
                        checkAy = [];
                    }
                }
                else
                {
                    checkAy.push(cards[i]);
                }
            }
            if(checkAy.length>0)
            {
                if(!this.checkOneHu(checkAy,checkDeep,huInfos))
                {
                    return false;
                }
            }
            return true;
        }
    },


    huInfo2Value:function(huInfo)
    {
        var k2 = huInfo[2];
        var k3 = huInfo[3];
        var k4 = huInfo[4];

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
    checkAllCardHu_One:function(ay,ret)
    {
        var value = Key_values[this.TypesAyToByte(ay)];
        if(value != void 0)
        {
            var temp = this.Value2HuInfo(value);
            ret[2] += temp[2];
            ret[3] += temp[3];
            ret[4] += temp[4];
            return true;
        }
        return false;

    },
    justCheckHu:function(ay)
    {
        var checkTest = [];
        var ret  =  {
            2:0,
            3:0,
            4:0
        };
        var isHu = true;
        for(var i=0;i<=ay.length;i++)
        {
            if(i == ay.length)
            {
                if(checkTest.length>0)
                {
                    if(!this.checkAllCardHu_One(checkTest,ret))
                    {
                        isHu = false;
                        break;
                    }
                    checkTest = [];
                }
            }
            if(ay[i] == 0 )
            {
                if(checkTest.length>0)
                {
                    if(!this.checkAllCardHu_One(checkTest,ret))
                    {
                        isHu = false;
                        break;
                    }
                    checkTest = [];
                }

            }
            else
            {
                checkTest.push(ay[i])
            }
        }

        return isHu? this.huInfo2Value(ret):-1;
    },
    checkAllCardHu:function(key)
    {
        key = parseInt(key);
        var ay = this.TypesByteToAy(key);
       return this.justCheckHu(ay);
    }
}

module.exports =helper;

//console.log(Object.keys(Key_values).length)
//helper.testHu([1,2,3,4])