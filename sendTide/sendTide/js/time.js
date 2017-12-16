var _setInterval;

function leftTimer(year, month, day, hour, minute, second) {
	_setInterval = setInterval(function() {
		var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
		var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
		var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
		var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
		var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
		days = checkTime(days);
		hours = checkTime(hours);
		minutes = checkTime(minutes);
		seconds = checkTime(seconds);
		if(seconds >= 0) {
			//console.log("1 "+year + "," + month + "," + day + "," + hour + "," + minute + "," + second);

			var html = "<span class=\"hour\">" + hours + "</span> &nbsp;:&nbsp;<span class=\"hour\">" + minutes + "</span> &nbsp;:&nbsp;<span class=\"hour\">" + seconds + "</span>"
			$(".down").html(html);
			
			if(_isSendBtn){
				//免费送提示语
				$(".countdown > p").html("距离活动开始时间还有");
			}else{
				//免费抢提示语
				$(".countdown > p").html("距离活动开始时间还有");
			}

		} else {
			clearInterval(_setInterval);
			//alert("请求超时");

			var html = "<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span>"
			$(".down").html(html);
			
			if(_isSendBtn){
				//免费送提示语
				
			}else{
				//免费抢提示语
				$(".countdown > p").html("本档活动已开始");
			}
			
			return;
		}

	}, 1000);

}

function set24hTime(year, month, day, hour, minute, second) {
	var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
	var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
	var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
	var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
	days = checkTime(days);
	hours = checkTime(hours);
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	if(seconds >= 0) {
		setTimeout("set24hTime(" + year + "," + month + "," + day + "," + hour + "," + minute + "," + second + ")", 1000);
	} else {
		mui.toast("本期活动结束");
		$("#24h").html("00 : 00 ：00");
		return;
	}
	$("#24h").html(hours + ":" + minutes + ":" + seconds);
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01
	if(i < 10) {
		i = "0" + i;
	}
	return i;
}

function addStartSendTime (year, month, day, hour, minute, second){
	console.log("开启免费送倒计时")
	var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
	var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
	var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
	var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
	days = checkTime(days);
	hours = checkTime(hours);
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	if(seconds >= 0) {
		setTimeout("addStartSendTime(" + year + "," + month + "," + day + "," + hour + "," + minute + "," + second + ")", 1000);
	} else {
		mui.toast("本期活动结束");
		$("#24h").html("00 : 00 ：00");
		return;
	}
	var html = "<span class=\"hour\">" + hours + "</span> &nbsp;:&nbsp;<span class=\"hour\">" + minutes + "</span> &nbsp;:&nbsp;<span 		class=\"hour\">" + seconds + "</span>"
			$(".down").html(html);
}
