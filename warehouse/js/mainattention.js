//关注
var attentionUrl="http://118.31.45.231/api.php/Home/Favorites/doFavorite";
var cancelAttentionUrl="http://118.31.45.231/api.php/Home/Favorites/cancel";
$(document).on('click', "#one .coll .col", function() {
    var loginName = window.localStorage ? localStorage.getItem('loginName') : null;
    console.log("className = "+$(this).attr("class"));
    var thisObj = $(this);
    if(loginName==null){
        if(!mui){
            console.log("请引用mui.js文件");
            return;
        }
        mui.init();
        var btnArray = ['取消', '前往'];
        mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
            if (e.index == 1) {
                window.location.href = "qzzlogin.html";
            } else {
                console.log("取消前往登录页面");
                $("footer .footer-main .setting .pics").filter(".active").removeClass('active').end().eq(_index).addClass('active');
            }
        })
    }else{
        var flags = $(this).attr("type");
        var flag=Number(flags);
        var productid = $(this).attr("productid");

        if(flag == 0) {
            $.ajax({
                type: "post",
                url: attentionUrl,
                data: {
                    productid: productid,
                    loginName: loginName
                },
            })
                .done(function(data) {
                    var data = JSON.parse(data);
                    console.log(data);
                    if(data.code == 000008) {
                  /*     $("#one .coll .col").css({
                            "background": "url('../images/tab_button_follow_selected.png')center center no-repeat",
                            "background-size": "100%"
                        });*/
                        console.log("className = "+ thisObj.attr("class"));
                        thisObj.removeClass("col_img");
                        thisObj.addClass("col_img2");
                        thisObj.attr("type", "1")
                    }
                })
        } else if(flag == 1) {
            thisObj.removeClass("col_img");
            thisObj.addClass("col_img2");
            $.ajax({
                type: "post",
                url: cancelAttentionUrl,
                data: {
                    productid: productid,
                    loginName: loginName
                }
            })
                .done(function(data) {
                    var data = JSON.parse(data);
                    console.log(data)
                    if(data.code == 000008) {
                        thisObj.removeClass("col_img2");
                        thisObj.addClass("col_img");
                        thisObj.attr("type", "0");
                    }
                })
        }
    }
})
