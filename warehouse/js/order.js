var item1 = [] ,
    item2 = [],
    item3 = [],
    item4 = [],
    item5 = [];

!(function ($) {
    var imgUrl="http://118.31.45.231:8081/";
    var g= {
        init: function () {
            var _t = this;
            //调用tab
            _t.tab();
        },
        tab:function () {
            var _t=this;
            var mobile= JSON.parse(localStorage.getItem("user")).id;//window.localStorage ? localStorage.getItem('loginName'):null;
            var typeName = ""; //
            $.ajax({
                type: 'post',
                url: "http://118.31.45.231/api.php/Home/Orderinfo/getorderinfo",
                data:{loginName:mobile,orderstatus:""}
            })
                .done(function (data) {
                    var data=JSON.parse(data);
                    console.log(data);
                   var d=data.orderinfo;
                   _t.dom(d , "item1");
                     for(var i=0;i<d.length;i++){
                       switch (parseInt(d[i].orderstatus)){
                           case 0:
                               item1.push(d[i]);
                               break;
                           case 1:
                               item2.push(d[i]);
                               break;
                           case 2:
                               item3.push(d[i]);
                               break;
                           case 3:
                               item4.push(d[i]);
                               break;
                           default:
                               item5.push(d[i]);
                       }
                    }
                })
        },
        dom : function (data ,id){
            if(data.length == 0) return ;
            var d = data;
            var len = d.length;
            var list = "";
            var everyPrice= 0;
            var num= 0;
            var typeName = "";
            for(var i=0 ; i< len ; i++){
                everyPrice=d[i].goods_price;
                num=d[i].num;
                switch (parseInt(d[i].orderstatus)){
                    case 0:
                        typeName = "待支付";
                        break;
                    case 1:
                        typeName = "待发货";
                        break;
                    case 2:
                        typeName = "拣货中";
                        break;
                    case 3:
                        typeName = "已发货";
                        break;
                    default:
                        typeName = "已取消";
                }

                list +="<div class='list' type='"+d[i].orderstatus+" '><div class='list-head display_flex'><div class='flex_1'><h1 class='title'>"+d[i].brandname+"</h1></div><div class='flex_1'><h1 class='text nav-name'>"+typeName+"</h1></div></div><ul class='mui-table-view up-table-wiew'><li class='my-table-view-cell mui-media'><a href='javascript:;'><div class='row display_flex'><div class='content flex_4'><img class='mui-media-object mui-pull-left' src='"+imgUrl+d[i].goods_display_img
                    +"'><div class='mui-media-body'><h1 class='title mui-ellipsis-2'>"+d[i].name+"</h1><p class='mui-ellipsis style'><span>"+d[i].spec2+"</span><span>"+d[i].spec2+"</span></p></div></div><div class='flex_1 price-group order-price-group'><h1 class='price'><i class='price-icon'>￥</i>"+d[i].goods_price+"</h1><h1 class='price order-price'><i class=\"price-icon\">￥</i>"+d[i].marketprice+"</h1><p class=\"sum order-sum\">x<span>"+d[i].num+"</span></p></div></div></a></li><li class=\"order-table-view-cell\"><h2 class=\"order-title\"><em>(含运费<span>20</span>元 共<span>"+d[i].num+"</span>件商品)</em> 合计：<i class=\"price-icon\">￥</i><span class=\"price\">"+everyPrice * num+"</span></h2></li><li class=\"order-table-view-cell clearfix\"><a class=\"service-btn\">在线客服</a></li></ul></div>";
            }
            $("#"+id).html(list);
        }
    }
    $(function () {
        g.init();

        //
        var isItem2 = false,
            isItem3 = false,
            isItem4 = false,
            isItem5 = false,
            isItem6 = false;
        mui("#segmentedControl").on("tap",".mui-control-item",function(event){
           // console.log(event.target.hash);
           if(event.target.hash == "#item2" && !isItem2){
               g.dom(item1,"item2");
               isItem2 = true;
           }else if(event.target.hash == "#item3" && !isItem3){
               g.dom(item2,"item3");
               isItem3 = true;
           }else if(event.target.hash == "#item4" && !isItem4){
               g.dom(item3,"item4");
               isItem4 = true;
           }else if(event.target.hash == "#item5" && !isItem5){
               g.dom(item4,"item5");
               isItem5 = true;
           }else if(event.target.hash == "#item6" && !isItem6){
               g.dom(item5,"item6");
               isItem6 = true;
           }
        });
    })

})($)