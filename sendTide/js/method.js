$(function(){
    var ctop = $("#banner").offset().top+245;
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //     console.log(scrollTop);
    // }
    // $(window).scroll(function(){
        var this_scrollTop = $(this).scrollTop();
        console.log(this_scrollTop)
        if(this_scrollTop>ctop ){
            $("header").css("background","rgba(255,255,255,0.95)").fadeIn(1000);
            $("header .back").css({"background":"#fff","color":"#000","fontWeight":"900"});
            $("header .service").css({"background":"#fff","color":"#000","fontWeight":"900"});
            $("header .shares").css({"background":"#fff","color":"#000","fontWeight":"900"});

        }else if(this_scrollTop<ctop){
            $("header").css("background","none");
            $("header .back").css({"background":"#000","color":"#fff"});
            $("header .service").css({"background":"#000","color":"#fff"});
            $("header .shares").css({"background":"#000","color":"#fff"});
        }
    }
});