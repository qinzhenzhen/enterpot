$(function () {
    $(".main .navs li").click(function() {
        var index = $(this).index();
        $(".main .navs li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".main .list .every .style").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".rob .times li").click(function() {
        var index = $(this).index();
        $(".rob .times li").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".rob .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".mui-table-view-cell span").click(function() {
        var index = $(this).index();
        console.log(index)
        $(".mui-navigate-right span").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".present .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
    })
    $(".right .mui-icon#add").click(function () {
        $(".mui-collapse-content").slideToggle();
    })

})
