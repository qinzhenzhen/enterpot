var cancelAttentionUrl="http://118.31.45.231/api.php/Home/Favorites/cancel";
$(document).on('click', "#one .coll .col", function() {
       var loginName = window.localStorage ? localStorage.getItem('loginName') : null;
        var flags = $(this).attr("type");
        var flag=Number(flags);
        var that = $(this);
        var productid = $(this).attr("productid");
         console.log($(this).parent(".one"))
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
                        that.attr("type", "0");
                        that.parent().parent().remove();
                        //console.log(one)

                         // $(".all").remove(one)
                    }
                })
})