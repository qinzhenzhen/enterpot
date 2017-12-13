/**
 *startime 应该是毫秒数
 *
 */

var Alarm = function(startime, endtime, countFunc, endFunc) {
	this.time = Math.floor(parseInt(endtime - startime) / 1000); //时间
	//alert(this.time);
	this.countFunc = countFunc; //计时函数
	this.endFunc = endFunc; //结束函数
	this.flag = 't' + Date.parse(new Date()); //
};
Alarm.prototype.start = function() {
	var self = this;

	self.flag = setInterval(function() {
		if(self.time < 0) {
			clearInterval(self.flag);
			self.endFunc();
			// console.log('计时结束');
		} else {
			var minute, hour, day, second;
			day = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
			hour = Math.floor(self.time / 60 / 60 % 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 % 24) : Math.floor(self.time / 60 / 60 % 24);
			minute = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
			second = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
			//倒计时执行函数
			// alert("day:"+day+' hour:'+hour+ " minute:"+minute);
			self.countFunc(second, minute, hour, day);
			self.time--;

		}
	}, 1000);
}

var countTime = function() {
	var eles = $('.down'),
		len = eles.length;
	//console.log(len);
	for(; len > 0; len--) {
		var ele = eles.eq(len - 1);
		//alert(ele.length);
		(function(ele) {
			var setDataTime = "2017-13-30 10:11:11",//ele.attr('data-start-time').replace(/,/g, " ");
			//在ios下只能解析时间格式：2017/05/02 10:11:11
			endTime = new Date(setDataTime.replace(/-/g, '/')).getTime(),
				startTime = new Date().getTime();
				console.log(endTime + - +startTime);
				alarm = new Alarm(startTime, endTime, function(second, minute, hour, day) { //计时钟
					//ele.text(day + "天" + hour + ':' + minute + ':' + second);
					console.log(day + "天" + hour + ':' + minute + ':' + second);
				}, function() { //倒计时结束
					//ele.text('00:00:00');
					// window.location.reload();
				});
			alarm.start();
		})(ele);
	}
};