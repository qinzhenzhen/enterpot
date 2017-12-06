$(function () {
    $(".navs li").click(function() {
        var index = $(this).index();
        $(".navs li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".navs li ").find(".img").removeClass('active');
        $(this).find(".img").addClass("active");
        $(".main .list .every .style").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".rob .times li").click(function() {
        var index = $(this).index();
        $(".rob .times li").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".rob .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".mui-table-view-cell span").click(function() {
        var index = $(this).index();
        $(".mui-navigate-right span").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".present .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".right .mui-icon#add").click(function () {
        $(".mui-collapse-content").slideToggle();
    })

})
