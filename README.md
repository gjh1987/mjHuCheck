# mjHuCheck
add mjhuCheck


	麻将牌的值 参考 mjHelper.js 
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
		
		

Client.testAy  传入一个数组  数组必须是 有序的     用以检测是否胡牌

不能检测 十三幺 七对  七星不靠 这类的特殊胡法

