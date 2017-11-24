
//到品牌专区 ".specialId"
$( document ).on('click',".specialId", function() {
    //console.log("111");
    var brandid = $(this).attr("brandid");
    localStorage.setItem("brandid",brandid);
    setLocation.openWindow("qzzdetail.html");
});

!(function($) {
    var g = {
        init: function() {
            var _t = this;
            //调用tab
            _t.tab();
            /*产品详情*/
            _t.proDetail();
        },
        //调用tab
        tab: function() {
            var _t = this;
            $(".main .navs li").click(function() {
                var index = $(this).index();
                $(".main .navs li").filter(".active").removeClass('active').end().eq(index).addClass('active');
                $(".main .list .every .style").filter(".active").removeClass('active').end().eq(index).addClass('active');
            })
        },
        proDetail: function() {
            var _t = this;
            var mobile = window.localStorage ? localStorage.getItem('loginName') : null;
            $.ajax({
                type: 'post',
                url: indexUrl,
                data: {
                    "loginName": mobile
                }
            })
                .done(function(data) {
                    var data = JSON.parse(data);
                    console.log(data)
                    //个人信息
                    var webnotifyinfo = data.webnotifyinfo;
                    if(webnotifyinfo == "") {
                        var info = "<img src='../images/nav_button_search.png' alt=''>";
                    } else {
                        var info = "<img src='../images/nav_button_news.png' alt=''>";
                    }
                    $("#search").html(info);
                    //banner
                    var banner = data.adsinfo;
                    for(var j = 0; j < banner.length; j++) {
                        var bns = "<div class='swiper-slide'><img src='" + imgUrl + banner[j].adfile + " ' alt=''/></div>";
                        var li = "<li></li>";
                        $(".swiper-wrapper").append(bns);
                        $(".swiper-pagination").append(li);
                    }
                    //公告
                    var announce = data.previewmessageinfos;
                    for(var k = 0; k < announce.length; k++) {
                        var announ = "<p>" + announce[k].messagecontent + "</p>";
                        $(".anRight").append(announ);
                    }
                    //品牌详情
                    var brandQuality = data.productinfos;
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
                    for(var i = 0; i < brandQuality.length; i++) {
                        //logo
                        var logoImg = "<div class='logo'><img src='" + imgUrl + brandQuality[i].brandlogo + "' alt='' style=' width: 100%;height: 100%;'></div>";
                        //品牌名称
                        var className = "";
                        if(brandQuality[i].is_favorite > 0) {
                            className = "col_img2";
                        } else {
                            className = "col_img";
                        }
                        var brandName = "<ul class='coll'><li class='brand'>" + brandQuality[i].brandname + "</li><li class='col " + className + "' type='" + brandQuality[i].is_favorite + "' productid='" + brandQuality[i].id + "'></li></ul>";
                        //描述
                        var description = "<div class='con'><span>" + brandQuality[i].description + "</span></div>";
                        //图片详情
                        var brandDetail = "<ul class='display display_1'><li><img src='" + imgUrl + brandQuality[i].goods_other_img1 + "' alt='' id='img'></li><li><img src='" + imgUrl + brandQuality[i].goods_other_img2 + "' alt='' id='img'></li><li><img src='" + imgUrl + brandQuality[i].goods_other_img3 + "' alt='' id='img'></li><li><img src='" + imgUrl + brandQuality[i].goods_other_img4 + "' alt='' id='img'></li></ul>";
                        //市场价  会员价
                        var marketPrice = "<div class='act'><div id='prices'><div class='original'><div class='img iconfont icon-qian' style='font-size: 0.45rem;font-weight: 700'></div><span>" + brandQuality[i].marketprice + "</span></div>" + "<div class='count'><span>会员价：" + brandQuality[i].marketprice + "</span></div></div>" + "<div class=\"shareId\"><div class='img iconfont icon-fenxiang'></div><span  sid='+brandQuality[i].id+'>分享</span></div></div>";
                        var pushTime = "<div id='times'>上午&nbsp;&nbsp;11.00</div>";
                        var remarks = "<div class='remarks'><span>心外膜额个我旁边看热不寂寞</span><span>发布和人力，】【 管理【人，太难【他</span></div>";
                        var perfom = "<div class='perfom'><div id='joinShop' class='change' gid='" + brandQuality[i].id + " '>加入购物车</div><div class='special change' gid='" + brandQuality[i].id + " '>购买</div></div>";

                        var starttime = brandQuality[i].startdate;
                        var endtime = brandQuality[i].enddate;
                        console.log(starttime);
                        //判断时间大小
                        if(
                            (new Date(starttime.replace(/-/g, "\/"))) < (new Date(currentTime.replace(/-/g, "\/"))) &&
                            (new Date(endtime.replace(/-/g, "\/"))) > (new Date(currentTime.replace(/-/g, "\/")))
                        ) {
                            var detail = logoImg + brandName + description + brandDetail + marketPrice + pushTime + remarks + perfom;
                            var li = "<li class='one'id='one'>" + detail + "</li>";
                            $(".doing").append(li);
                        } else if((new Date(starttime.replace(/-/g, "\/"))) >= (new Date(currentTime.replace(/-/g, "\/")))) {
                            perfom=" <div class='perfom'><div class='date'>开始倒计时&nbsp;<span id='hour'></span>:&nbsp;&nbsp;<span id='minute'></span>&nbsp;&nbsp;<span id='second'></span></div><a class='special specialId' brandid = "+brandQuality[i].brandid+">品牌专区</a></div>";
                            var detail=logoImg+brandName+description+brandDetail+marketPrice+pushTime+remarks+perfom;
                            var li="<li class='one'id='one'>"+detail+"</li>";
                        }

                        $(".all").append(li);
                    }
                    if($(".being:has(li)").length == 0) {
                        $(".being").html("还没有即将开抢的商品哦").css({"text-align": "center","font-size":"0.24rem"});
                    }
                    if($(".doing:has(li)").length == 0) {
                        $(".doing").html("还没有正在抢的商品哦").css({"text-align": "center","font-size":"0.24rem"});
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

                });
        },

    };
    $(function() {
        g.init();
    })
})($);