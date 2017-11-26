   //秒杀
    function leftTimer(year, month, day, hour, minute, second) {
        var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
        //var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
        var h1, h2, s1, s2;
        //days = checkTime(days);
        //hour = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if (seconds >= 0) {
            setTimeout("leftTimer(" + year + "," + month + "," + day + "," + hour + "," + minute + "," + second + ")", 1000);
        } else {
            alert("请求超时");
        }
       // hours = hour.toString();
        minutes = minutes.toString();
        h1 = minutes.substring(0, 1);
        h2 = minutes > 0 ? minutes.substring(1, 2) : 0;
        seconds = seconds.toString();
        s1 = seconds.substring(0, 1);
        s2 = seconds > 0 ? seconds.substring(1, 2) : 0;

        $(".setTimeId").html("<span>" + h1 + "</span>&nbsp;<span>" + h2 + "</span>&nbsp;:&nbsp;<span>" + s1 + "</span>&nbsp;<span>" + s2 + "</span>");
    }

    function checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }