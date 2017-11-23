//修改昵称
$(".forget").click(function () {
    var uName=$("input").val();
    $.ajax({
        url:"",
        type:"post",
        data:{uName:uName},
        success:function (data) {
            if(data.code=000008){
                location.href="qzzmy.html";
            }else{
               console.log(data.msg) ;
            }
        }
    })
})

