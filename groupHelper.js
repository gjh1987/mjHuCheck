/**
 * Created by Class on 2017/7/20.
 */


var path = require("path");
var fs = require("fs");

var helper = {
    count:0,
    swap:function(ay,i,j)
    {
        var t = ay[i];
        ay[i]=ay[j];
        ay[j]=t;
    },
    fullArray:function(array,array_size,index,cb)
    {
        if(index >= array_size)
        {
            var r = [];
            for(var i= 0; i < array_size; ++i)
            {
                r.push(array[i]);
            }
            cb(r);




            return;
        }

        for(var i = index; i < array.length; ++i)
        {
            this.swap(array, i, index);

            this.fullArray(array, array_size, index + 1,cb);

            this.swap(array, i, index);
        }
    },

    initAll:function()
    {
        var maps = {
            14:[[9,5],[8,6],[7,7],[6,8],[5,9]],
            12:[[9,3],[8,4],[7,5],[6,6],[5,7]],
            11:[[9,2],[8,3],[7,4],[6,5],[5,6],[4,7]],
            10:[[9,1],[8,2],[7,3],[6,4],[5,5],[4,6]],
            9:[[8,1],[7,2],[6,3],[5,4],[4,5]],
            8:[[7,1],[6,2],[5,3],[4,4],[3,2]],
            6:[[5,1],[4,2],[3,3]],
            5:[[4,1],[3,2],[2,3]],
            4:[[3,1],[2,2]]
        }




        for(var key in maps)
        {
            var ay = maps[key];
            for(var i=0;i<ay.length;i++)
            {
                var iay = ay[i];
                this.combineCards(iay[0],iay[1]);
            }
        }


    },

    combine:function(a,n,m,b,M,result)
    {
        var hasValues={};
        for(var i=n; i>=m; i--)
        {
            b[m-1] = i - 1;
            if (m > 1)
                this.combine(a,i-1,m-1,b,M,result);
            else
            {
                var res = [];
                for(var j=M-1; j>=0; j--)
                {
                    res.push(a[b[j]]);
                }
                res.sort(function(l,r)
                {
                    return l-r;
                })

                var hasValuesKey = JSON.stringify(res);
                if(hasValues.hasOwnProperty(hasValuesKey))
                {
                    continue;
                }
                hasValues[hasValuesKey] = 1;
                result.push(res);

            }
        }


    },
    combineCards:function(n,c)
    {
        var ay = [];
        var base = [];
        for(var i=1;i<n+1;i++)
        {
            ay.push(i);
            ay.push(i);
            ay.push(i);
            base.push(i);
        }


        var temp = {};
        var res = [];
        var count = c;
        helper.combine(ay,ay.length,count,temp,count,res);
        for(var i=0;i<res.length;i++ )
        {
            temp = res[i].concat(base);
            temp.sort(function(l,r)
            {
                return l-r;
            })
            res[i] = temp;
        }

        fs.writeFileSync("cards/" + (n+c) + "_" + n + "_" + c +".txt" , JSON.stringify(res),{encoding:"utf8"});
    },
    cardsToOne:function()
    {
        var self = this;
        var filePath = "./cards";
        var files = fs.readdirSync(filePath);
        var count = files.length;
        var results = [];
        var hasValues={};
        files.forEach(function(filename) {


            var newPath = path.join(filePath, filename);
            var stat = fs.statSync(newPath);
            if(stat.isFile())
            {
                var data = fs.readFileSync( newPath,'utf8');
                data = JSON.parse(data);

                for(var i=0;i<data.length;i++)
                {
                    var oneData  = data[i];
                    var hasValuesKey = JSON.stringify(oneData);
                    if(hasValues.hasOwnProperty(hasValuesKey))
                    {
                        continue;
                    }
                    hasValues[hasValuesKey] = 1;
                    results.push(oneData);
                }
            }
        });

        console.log(results.length);
        fs.writeFileSync("result.txt" , JSON.stringify(results),{encoding:"utf8"});
    }
}




console.log("begin");

helper.initAll();
helper.cardsToOne();
console.log("over");