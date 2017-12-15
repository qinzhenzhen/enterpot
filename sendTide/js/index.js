var _isSendBtn = true; //判断是否点击免费送

$(function() {
	g.init();
})

var g = {
	init: function() {
		var _t = this;
		//调用tab
		_t.tab();
		/*免费送*/
		_t.getSendData();
		_isSendBtn = true;

	},
	//调用tab
	tab: function() {
		var _t = this;

	},
	/*
	 *getSendData 获取免费送数据
	 * 
	 * */
	getSendData: function() {
		/*var startTime = "2017-12-11 14:24:00";
			//获取当前时间
			g.setStartTime(startTime);*/

		var data = [{
				"time": "10",
				"cont": "10:00:00"
			},
			{
				"time": "15",
				"cont": "15:00:00"
			},
			{
				"time": "18",
				"cont": "18:05:00"
			}
		];
		g.addSendTimesDom(data, "10");
		
		//免费送内容
		g.addSendContentDom(data ,"sendCont1");
		
	},
	/*
	 *getSendContenData ：获取免费送内容数据 time ：档期  Eid元素ID
	 * */
	getSendContenData: function(time,Eid){
		var data = new Array();
		g.addSendContentDom(data ,Eid);
		
	},
	/*
	 *getGrabData 获取免费抢数据
	 * 
	 * */
	getGrabData: function() {
		var data = [{
				"time": "10",
				"cont": "10:00:00"
			},
			{
				"time": "15",
				"cont": "15:00:00"
			},
			{
				"time": "21",
				"cont": "21:00:00"
			}
		];

		g.addGrabTimesDom(data, "10");
		
		//免费抢内容
		g.addGrabContentDom(data ,"gradCont1")
	},
	/*
	 *getGrabContenData ：获取免费抢内容数据 time ：档期  Eid元素ID
	 * */
	getGrabContenData: function(time,Eid){
		var data = new Array();
		g.addGrabContentDom(data ,Eid);
		
	},
	/*
	 *addSendTimesDom 免费送时间档期
	 * */
	addSendTimesDom: function(data, type) {
		var html = "",
			len = data.length;
		for(var i = 0; i < len; i++) {
			if(data[i].time == type) {
				html += " <li class=\"t active\" timeId = " + data[i].time + "> <span>" + data[i].time + "点档</span><span>" + data[i].cont + "</span></li>";
				g.getPresentStartTime(type); //默认当前档期时间
			} else {
				html += " <li class=\"t\" timeId = " + data[i].time + "> <span>" + data[i].time + "点档</span><span>" + data[i].cont + "</span></li>";
			}
		}
		$(".times").html(html);
	},
	/*
	 *addGrabTimesDom 免费抢时间档期
	 * */
	addGrabTimesDom: function(data, type) {
		var html = "",
			len = data.length;
		for(var i = 0; i < len; i++) {
			if(data[i].time == type) {
				html += " <span class=\"active\" timeId = " + data[i].time + ">" + data[i].cont + "</span> ";
				g.getPresentStartTime(type); //默认当前档期时间
			} else {
				html += " <span timeId = " + data[i].time + ">" + data[i].cont + "</span> ";
			}
		}
		$("#grab").html(html);
	},
	/*
	 *addSendContentDom 免费送内容块 data 数据 Eid 模块ID
	 * */
	addSendContentDom: function(data,Eid) {
		//内容块
		var orderId = 0,
		orderName = "潮流运动鞋潮流运动鞋潮流运动鞋",
		orderAllAmount = 1000, //总份数
		orderAmount = 50, //已抢份数
		orderPrice = 580, //市场价格
		orderHtml = "",
		orderImg = "../images/banner@2x.png",
		orderCss = "width:"+orderAmount+"%",
		orderisTime = '1', //活动状态 0 未开始 1 正在进行  2 活动已结束
		orderBtnText = "";
		for(var i = 0; i<10; i++){
			
			if(orderisTime == '0'){
				
				orderBtnText = "<li class=\"purchase\" orderisTime="+orderisTime+">未开始</li>";
				
			}else if(orderisTime == '1'){

				orderBtnText = "<li class=\"purchase\" style='background:red;color:#fff;' orderisTime="+orderisTime+">免费领</li>";
				
			}else if(orderisTime == '2'){
				
				orderBtnText = "<li class=\"purchase\" orderisTime="+orderisTime+">活动已结束</li>";
				
			}
			
			orderId = i; //商品id
			
			orderHtml +="<li class=\"pur purId\"><div class=\"left\"><img src="+orderImg+" alt=''></div><div class=\"right\"><p class=\"productName\">"+orderName+"</p><div class=\"buyingMes\"><div class='buyProgress'><div class='buyContent' style="+orderCss+"></div>";
            orderHtml +=" </div><div class=\"num\"><div class=\"all\"><p><span class=\"iconfont icon-song\" style=\"color: #c444ff;font-size: 0.32rem\"></span><span style='font-size: 0.18rem;color: #c444ff;'>"+orderAllAmount+"</span>份</p></div><div class=\"done\"><p style='margin-left: 0.1rem'>已抢<span style='font-size: 0.18rem;color: #c444ff;'>"+orderAmount+"</span>份</p></div></div></div>";
			orderHtml +=" <ul class=\"price\" orderId = "+orderId+"><li class=\"sale\">市场价 <span class=\"iconfont icon-qian\"></span><span style=\"color:#c444ff;font-size: 0.26rem\">"+orderPrice+"</span></li> "+orderBtnText+"</ul></div></li>";
			
		}
		
		document.getElementById(Eid).innerHTML = orderHtml;
	},
		/*
	 *addGrabContentDom 免费抢内容块 data 数据 Eid 模块ID
	 * */
	addGrabContentDom: function(data,Eid) {
		//内容块
		var orderId = 0,
		orderName = "潮流运动鞋潮流运动鞋潮流运动鞋",
		orderAllAmount = 1000, //总份数
		orderAmount = 50, //已抢份数
		orderPrice = 580, //市场价格
		orderHtml = "",
		orderImg = "../images/banner@2x.png",
		orderCss = "width:"+orderAmount+"%",
		orderisTime = '1', //活动状态 0 未开始 1 正在进行
		orderBtnText = "";
		for(var i = 0; i<10; i++){
			
			if(orderisTime == '0'){
				
				orderBtnText = "<li class=\"purchase\" orderisTime="+orderisTime+">未开始</li>";
				
			}else if(orderisTime == '1'){

				orderBtnText = "<li class=\"purchase\" style='background:red;color:#fff;' orderisTime="+orderisTime+">免费抢</li>";
				
			}
			
			orderId = i; //商品id
			
			orderHtml +="<li class=\"pur purId\"><div class=\"left\"><img src="+orderImg+" alt=''></div><div class=\"right\"><p class=\"productName\">"+orderName+"</p><div class=\"buyingMes\"><div class='buyProgress'><div class='buyContent' style="+orderCss+"></div>";
            orderHtml +=" </div><div class=\"num\"><div class=\"all\"><p><span class=\"iconfont icon-song\" style=\"color: #c444ff;font-size: 0.32rem\"></span><span style='font-size: 0.18rem;color: #c444ff;'>"+orderAllAmount+"</span>份</p></div><div class=\"done\"><p style='margin-left: 0.1rem'>已抢<span style='font-size: 0.18rem;color: #c444ff;'>"+orderAmount+"</span>份</p></div></div></div>";
			orderHtml +=" <ul class=\"price\" orderId = "+orderId+"><li class=\"sale\">市场价 <span class=\"iconfont icon-qian\"></span><span style=\"color:#c444ff;font-size: 0.26rem\">"+orderPrice+"</span></li> "+orderBtnText+"</ul></div></li>";
			
		}
		
		document.getElementById(Eid).innerHTML = orderHtml;
	},
	/*
	 *setStartTime 设置倒计时格式 2017-12-11 14:24:00
	 * */
	setStartTime: function(startTime) {
		var startTime = startTime.replace(/-/g, ',').replace(/:/g, ',').replace(/ /g, ',').split(",");
		console.log(startTime);
		leftTimer(startTime[0], startTime[1], startTime[2], startTime[3], startTime[4], startTime[5]);
	},
	/*
	 *getPresentStartTime 获取当前档期 倒计时
	 * */
	getPresentStartTime: function(h) {

		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = h; //now.getHours();
		var minute = "00"; //now.getMinutes();
		var second = "00"; //now.getSeconds();

		console.log(year + "," + month + "," + day + "," + hour + "," + minute + "," + second);
		if(!!_setInterval) {
			clearInterval(_setInterval);
		}

		if(h > parseInt(now.getHours())) {
			leftTimer(year, month, day, hour, minute, second);
		}else {
			var html = "<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span>"
			$(".down").html(html);
			
			console.log("_isSendBtn="+_isSendBtn);
			
			if(_isSendBtn){
				//免费送提示语
				$(".countdown > p").html("本档活动已经结束");
			}else{
				//免费抢提示语
				$(".countdown > p").html("本档活动已开始");
			}

		}
			
		//免费送开始时间
		/*  var now = new Date();
			var	year = now.getFullYear();
			var	month = now.getMonth()+1;		
			now.setMinutes(now.getMinutes()+5);
			var day = now.getDate();
			var	hour = now.getHours();
			var	minute = now.getMinutes();
			var	second = now.getSeconds();
			$(".countdown > p").html("距离本档活动结束还有");
			$(".countdown > p").css("color","red");
			addStartSendTime(year, month, day, hour, minute, second); //开始免费送
		*/

	},
	/*
	 *add24hTime 24小时倒计时
	 * */
	add24hTime: function() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = "24"; //now.getHours();
		var minute = "00"; //now.getMinutes();
		var second = "00"; //now.getSeconds();
		set24hTime(year, month, day, hour, minute, second);
	}

}