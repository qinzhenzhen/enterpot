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
                url: collectionUrl,
                data: {
                    "loginName": mobile
                }
            })
                .done(function(data) {
                    var data = JSON.parse(data);
                    console.log(data)
                    var favoriteQuality = data.favoritesinfo;
                    for(var i = 0; i < favoriteQuality.length; i++) {
                        //logo
                        var logoImg = "<div class='logo'><img src='" + imgUrl + favoriteQuality[i].brandlogo + "' alt='' style=' width: 100%;height: 100%;'></div>";
                        //品牌名称
                        var brandName = "<ul class='coll'><li class='brand'>" + favoriteQuality[i].brandname + "</li><li class='col col_img' type='" + favoriteQuality[i].is_favorite + " ' productid='" + favoriteQuality[i].id + "'></li></ul>";
                        //描述
                        var description = "<div class='con'><span><a href='#'>" + favoriteQuality[i].description + "</a></span></div>";
                        //图片详情
                        var brandDetail = "<ul class='display'><li><img src='" + imgUrl + favoriteQuality[i].goods_other_img1 + "' alt='' id='img'></li><li><img src='" + imgUrl + favoriteQuality[i].goods_other_img2 + "' alt='' id='img'></li><li><img src='" + imgUrl + favoriteQuality[i].goods_other_img3 + "' alt='' id='img'></li><li><img src='" + imgUrl + favoriteQuality[i].goods_other_img4 + "' alt='' id='img'></li></ul>";
                        //市场价  会员价
                        var marketPrice = "<div class='act'><div id='prices'><div class='original'><div class='img iconfont icon-qian' style='font-size: 0.45rem;font-weight: 700'></div><span>" + favoriteQuality[i].marketprice + "</span></div>" + "<div class='count'><span>会员价：" + favoriteQuality[i].marketprice + "</span></div></div>" + "<div class='img iconfont icon-fenxiang'style='margin-left: 0.58rem'></div><span id='share'>分享</span></div></div>";
                        var pushTime = "<div id='times'>上午&nbsp;&nbsp;11.00</div>";
                        var remarks = "<div class='remarks'><span>该商品已售完下架</span></div>";
                        var endtime = favoriteQuality[i].enddate;
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
                        //判断时间大小
                        if(
                            (new Date(endtime.replace(/-/g, "\/"))) < (new Date(currentTime.replace(/-/g, "\/")))
                        ) {
                            var detail = logoImg + brandName + description + brandDetail + marketPrice + pushTime + remarks;
                            var li = "<li class='one'id='one'>" + detail + "</li>";
                            $(".doing").append(li);
                        }
                        var detail = logoImg + brandName + description + brandDetail + marketPrice + pushTime;
                        var li = "<li class='one'id='one'>" + detail + "</li>";
                        $(".all").append(li);
                    }
                    $(".coll .col").css({
                        "background": "url('../images/tab_button_follow_selected.png')center center no-repeat",
                        "background-size": "100%"
                    })
                    //品牌详情
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
                    if($(".being:has(li)").length == 0) {
                        $(".being").html("还没有关注商品哦").css({"text-align": "center","font-size":"0.24rem"});
                    }
                    if($(".doing:has(li)").length == 0) {
                        $(".doing").html("还没有关注商品哦").css({"text-align": "center","font-size":"0.24rem"});
                    }
                    if($(".all:has(li)").length == 0) {
                        $(".all").html("还没有关注商品哦").css({"text-align": "center","font-size":"0.24rem"});
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
                            var a="<a href='javascript:;' style='color:#6b78a2;font-size: 0.24rem;float:left'> 展开全文</a>"; //如果字数超过最大字数，超出部分用...代替，并且在后面加上点击展开的链接；
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