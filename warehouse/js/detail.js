!(function ($) {
    var g={
        init: function() {
            var _t = this;
            //调用tab
            _t.tab();
            /*产品详情*/
            _t.attention();
        },
        //调用tab
        tab: function() {
            var _t = this;
            $(".main .navs li").click(function () {
                var index=$(this).index();
                $(".main .navs li") .filter(".active").removeClass('active').end().eq(index).addClass('active');
                $(".main .list .every .style") .filter(".active").removeClass('active').end().eq(index).addClass('active');
            })
        },
        attention:function () {
            var _t = this;
            //var mobile=window.localStorage ? localStorage.getItem('loginName'):"{}";
            var user = JSON.parse(localStorage.getItem("user"));
            //定义日期格式
            Date.prototype.Format = function(format) {

                var o = {

                    "M+": this.getMonth() + 1, //month

                    "d+": this.getDate(), //day

                    "h+": this.getHours(), //hour

                    "m+": this.getMinutes(), //minute

                    "s+": this.getSeconds(), //second

                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

                    "S": this.getMilliseconds() //millisecond

                }

                if(/(y+)/.test(format)) {

                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

                }

                for(var k in o) {

                    if(new RegExp("(" + k + ")").test(format)) {

                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

                    }

                }

                return format;

            }
            var date = new Date();
            var currentTime = date.Format("yyyy-MM-dd hh:mm:ss");
            var brandid = localStorage.getItem("brandid");
            $.ajax({
                type: 'post',
                url: "http://118.31.45.231/api.php/Home/Brandsgoods/index",
                data:{
                    brandid:brandid ,
                    loginName:user.id
                }
            })
                .done(function(data) {
                    var data = JSON.parse(data);
                    console.log(data);
                    //品牌详情
                    var brandQuality=data.productinfo;

                    for(var i=0;i<brandQuality.length;i++){
                        if(brandQuality[i].is_favorite == undefined){
                            brandQuality[i].is_favorite == 0;
                        }
                        //logo
                        var logoImg="<div class='logo'><img src='"+imgUrl+brandQuality[i].brandlogo+"' alt='' style=' width: 100%;height: 100%;'></div>";
                        //品牌名称
                        var className = "";
                        if(brandQuality[i].is_favorite > 0) {
                            className = "col_img2";
                        } else {
                            className = "col_img";
                        }
                        var brandName="<ul class='coll'><li class='brand'>"+brandQuality[i].brandname+"</li><li class='col " + className + "' type='"+brandQuality[i].is_favorite+" ' productid='"+brandQuality[i].id+"'></li></ul>";
                        //描述
                        var description="<div class='con'><span>"+brandQuality[i].description+"</span></div>";
                        //图片详情
                        var brandDetail="<ul class='display'><li><img src='"+imgUrl+brandQuality[i].goods_other_img1+"' alt='' id='img'></li><li><img src='"+imgUrl+brandQuality[i].goods_other_img2+"' alt='' id='img'></li><li><img src='"+imgUrl+brandQuality[i].goods_other_img3+"' alt='' id='img'></li><li><img src='"+imgUrl+brandQuality[i].goods_other_img4+"' alt='' id='img'></li></ul>";
                         //市场价  会员价
                        var marketPrice="<div class='act'><div id='prices'><div class='original'><img src='../images/icon_01.png' alt=''><span>"+brandQuality[i].marketprice+"</span></div>"+"<div class='count'><span>会员价："+brandQuality[i].marketprice+"</span></div></div>"+"<div class=\"shareId\"><img src='../images/button_share.png' alt=''><span  sid='+brandQuality[i].id+'>分享</span></div></div>";
                        var pushTime="<div id='times'>上午&nbsp;&nbsp;11.00</div>";
                        var remarks="<div class='remarks'><span>心外膜额个我旁边看热不寂寞</span><span>发布和人力，】【 管理【人，太难【他</span></div>";
                        var detail=logoImg+brandName+description+brandDetail+marketPrice+pushTime;
                        var li="<li class='one'id='one'>"+detail+"</li>";
                        $(".doing").append(li)
                        $(".all").append(li);
                    }
                    if($(".being:has(li)").length == 0) {
                        $(".being").html("还没有即将开抢的商品哦").css({"text-align": "center","font-size":"0.24rem"});
                    }
                    if($(".all:has(li)").length == 0) {
                        $(".doing").html("还没有商品哦").css({"text-align": "center","font-size":"0.24rem"});
                    }
                   //展开全文
                    $(".con span").each(function() {
                        var cur_status = "less";
                        var charNumbers=$(this).html().length;//总字数
                        var limit=80;//显示字数
                        if(charNumbers>limit) {
                            var orgText = $(this).html();//原始文本
                            var orgHeight = $(this).height();//原始高度
                            var showText = orgText.substring(0, limit);//最终显示的文本
                            $(this).html(showText);
                            var contentHeight = $(this).height();//截取内容后的高度
                            var a="<a href=javascript:;' style='color:#6b78a2;font-size: 0.24rem;float:left'>展开全文</a>"; //如果字数超过最大字数，超出部分用...代替，并且在后面加上点击展开的链接；
                            $(this).parent().append(a)
                            $(this).parent().find("a").click(function () {
                                if (cur_status == "less") {
                                    $(this).siblings().height(contentHeight).html(orgText).animate({height: orgHeight}, {duration: "fast"});
                                    $(this).html("收起");
                                    cur_status = "more";
                                } else {
                                    $(this).siblings().height(orgHeight).html(showText).animate({height: contentHeight}, {duration: "fast"});
                                    $(this).html("展开全文");
                                    cur_status = "less";
                                }
                            })
                        }else{
                            $(this).find("a").hide();
                        }
                    })
                })
        }
    };
    $(function () {
        g.init();
    })
})($);