var _isSendBtn = true; //判断是否点击免费送
var _getSendTime = new Array(), //免费送档期
	_getGrabTime = new Array(); //免费抢档期
	
var userInfo = JSON.parse(localStorage.getItem("userInfo"));

$(function() {
	g.init();
})

var g = {
	init: function() {
		var _t = this;
		//调用tab
		_t.tab();

		//获取档期
		_t.getCommodityTime();

	},
	//调用tab
	tab: function() {
		var _t = this;

	},
	/*
	 * getCommodityTime 获取时间档期 ，type ：1 免费抢   type : 2 免费送
	 */
	getCommodityTime: function() {
		$.ajax({
			type: 'POST',
			url: _commodity.getCommodityTime,
			dataType: 'json',
			success: function(data) {
				if(data.code == '000008') {
					console.log(data);
					if(data.timegrabinfo.length > 0) {
						_getGrabTime = data.timegrabinfo;
					}

					if(data.timegiveinfo.length > 0) {
						_getSendTime = data.timegiveinfo;
					}

					/*免费送*/
					g.getSendData();

				} else {
					mui.toast(data.msg);
				}
			}
		})
	},
	/*
	 *getSendData 获取免费送档期
	 * 
	 * */
	getSendData: function() {
		if(_getSendTime.length <= 0) {
			mui.toast("还没设置时间档期");
			return;
		}
		var now = new Date(),
			hour = now.getHours(),
			time_id = 0,
			type = 2,
			newHour = 0,
			len = _getSendTime.length,
			Eid = "";
			
			for(var i = 0; i< len; i++){
				
				if(hour < +(_getSendTime[i].timegrade) - 1){
					if(i>0){
						time_id = _getSendTime[i-1].id;
						newHour = _getSendTime[i-1].timegrade;
						Eid = "sendCont"+(i+1);
					}else{
						time_id = _getSendTime[0].id;
						newHour = _getSendTime[0].timegrade;
						Eid = "sendCont1";
					}
					
					break;
				}else{
					time_id = _getSendTime[len-1].id;
					newHour = _getSendTime[len-1].timegrade;
					Eid = "sendCont"+len;
				}
			}
			
			console.log("hour:"+hour+" newHour:"+newHour);

		g.addSendTimesDom(_getSendTime, newHour);

		//免费送内容
		g.getSendContenData(time_id, Eid , newHour);

	},
	/*
	 *getSendContenData ：获取免费送内容数据 timeId ：档期ID  Eid元素ID  time 档期
	 * */
	getSendContenData: function(timeId, Eid ,time) {
		//console.log("getSendContenData:"+Eid+ " - "+timeId);
		var time_id = timeId,
			type = 2;
		$.ajax({
			type:'POST',
			url:_commodity.getCommodityData,
			data:{
				"time_id":time_id,
				"type":type
			},
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.code == '000008'){
					if(data.grabproductinfo.length > 0){
						g.addSendContentDom(data.grabproductinfo, Eid ,time);
					}else{
						mui.toast("没有档期商品");
					}					
				}else{
					mui.toast(data.msg);
				}
			}
		})
		
	},
	/*
	 *getGrabData 获取免费抢档期
	 * 
	 * */
	getGrabData: function() {
		if(_getGrabTime.length <= 0) {
			mui.toast("还没设置时间档期");
			return;
		}
		var now = new Date(),
			hour = now.getHours(),
			time_id = 0,
			type = 1,
			newHour = 0,
			len = _getGrabTime.length,
			Eid = "";
			
			for(var i = 0; i< len; i++){
				
				if(hour < +(_getGrabTime[i].timegrade) - 1){
					if(i>0){
						time_id = _getGrabTime[i-1].id;
						newHour = _getGrabTime[i-1].timegrade;
						Eid = "gradCont"+(i+1);
					}else{
						time_id = _getGrabTime[0].id;
						newHour = _getGrabTime[0].timegrade;
						Eid = "gradCont";
					}
					
					break;
				}else{
					time_id = _getGrabTime[len-1].id;
					newHour = _getGrabTime[len-1].timegrade;
					Eid = "gradCont"+len;
					
				}
			}
			
			console.log("hour:"+hour+" newHour:"+newHour);
		
		//档期
		g.addGrabTimesDom(_getGrabTime, newHour);

		//免费抢内容
		g.getGrabContenData(time_id, Eid , newHour);
	},
	/*
	 *getGrabContenData ：获取免费抢内容数据 timeId ：档期ID  Eid元素ID  time 档期
	 * */
	getGrabContenData: function(timeId, Eid ,time) {
		var time_id = timeId,
			type = 1;
		$.ajax({
			type:'POST',
			url:_commodity.getCommodityData,
			data:{
				"time_id":time_id,
				"type":type
			},
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.code == '000008'){
					if(data.grabproductinfo.length > 0){
						g.addGrabContentDom(data.grabproductinfo, Eid ,time);
					}else{
						mui.toast("没有档期商品");
					}					
				}else{
					mui.toast(data.msg);
				}
			}
		})

	},
	/*
	 *addSendTimesDom 免费送时间档期
	 * */
	addSendTimesDom: function(data, type) {

		var html = "",
			len = data.length,
			time = "";
		for(var i = 0; i < len; i++) {
			
			time = data[i].timegrade > 10 ? data[i].timegrade : '0'+data[i].timegrade;
			
			if(data[i].timegrade == type) {
				html += " <li class=\"t active\" timeId = " + data[i].timegrade + " id = "+data[i].id+"> <span>" + data[i].timegrade + " 点档</span><span>" + time+ " : 00 : 00</span></li>";
				g.getPresentStartTime(type); //默认当前档期时间
			} else {
				html += " <li class=\"t\" timeId = " + data[i].timegrade + " id = "+data[i].id+"> <span>" + data[i].timegrade + " 点档</span><span>" + time+ " : 00 : 00</span></li>";
			}
		}
		$(".times").html(html);
	},
	/*
	 *addGrabTimesDom 免费抢时间档期
	 * */
	addGrabTimesDom: function(data, type) {
		var html = "",
			len = data.length,
			time = "";
			
		for(var i = 0; i < len; i++) {
			
			time = data[i].timegrade > 10 ? data[i].timegrade : '0'+data[i].timegrade;
			
			if(data[i].timegrade == type) {
				html += " <span class=\"active\" timeId = " + data[i].timegrade + " id = "+data[i].id+">" + time+ " : 00 : 00</span> ";
				g.getPresentStartTime(type); //默认当前档期时间
			} else {
				html += " <span timeId = " + data[i].timegrade + " id = "+data[i].id+">" + time+ " : 00 : 00</span> ";
			}
		}
		$("#grab").html(html);
	},
	/*
	 *addSendContentDom 免费送内容块 data 数据 Eid 模块ID
	 * */
	addSendContentDom: function(data, Eid,time) {
		//内容块
		var orderId = 0,
			discounts_id = 0,
			orderName = "潮流运动鞋潮流运动鞋潮流运动鞋",
			orderAllAmount = 1000, //总份数
			orderAmount = 50, //已抢份数
			orderPrice = 580, //市场价格
			orderHtml = "",
			orderImg = "../images/banner@2x.png",
			orderisTime = '1', //活动状态 0 未开始 1 正在进行  2 活动已结束
			orderBtnText = "",
			percentage = 50,
			orderCss = "width:" + percentage + "%";
			//判断当前档期 活动状态
			var now = new Date(),
			hour = now.getHours();
			if(hour < time){
				//未开始
				orderisTime = '0';
			}else if(hour == time){
				//正在进行
				orderisTime = '1';
			}else if(hour > time){
				//活动已结束
				orderisTime = '2';
			}
			
		for(var i = 0; i < data.length; i++) {
			orderisTime = '1'; //测试
			orderId = data[i].id;
			discounts_id = data[i].discounts_id;
			orderName = data[i].goodname;
			orderAllAmount = data[i].number; //总份数
			orderAmount = orderisTime == 2 ? orderAllAmount : data[i].grabnum;//已抢份数
			orderPrice = data[i].goods_price; //市场价格
			orderImg = _imgUrl + data[i].goods_display_img;
			percentage = orderAmount > 0 ? (+orderAmount)/(+orderAllAmount)*100 : 0;
			console.log(percentage);
			orderCss = "width:" + percentage + "%";
			
			
			if(orderisTime == '0') {

				orderBtnText = "<li class=\"purchase\" orderisTime=" + orderisTime + ">未开始</li>";

			} else if(orderisTime == '1') {

				orderBtnText = "<li class=\"purchase\" style='background:red;color:#fff;' orderisTime=" + orderisTime + ">免费领</li>";

			} else if(orderisTime == '2') {

				orderBtnText = "<li class=\"purchase\" orderisTime=" + orderisTime + ">活动已结束</li>";

			}


			orderHtml += "<li class=\"pur purId sendId\"><div class=\"left\"><img src=" + orderImg + " alt=''></div><div class=\"right\"><p class=\"productName\">" + orderName + "</p><div class=\"buyingMes\"><div class='buyProgress'><div class='buyContent' style=" + orderCss + "></div>";
			orderHtml += " </div><div class=\"num\"><div class=\"all\"><p><span class=\"iconfont icon-song\" style=\"color: #c444ff;font-size: 0.32rem\"></span><span style='font-size: 0.18rem;color: #c444ff;'>" + orderAllAmount + "</span>份</p></div><div class=\"done\"><p style='margin-left: 0.1rem'>已抢<span style='font-size: 0.18rem;color: #c444ff;'>" + orderAmount + "</span>份</p></div></div></div>";
			orderHtml += " <ul class=\"price\" orderId = " + orderId + " discounts_id = "+discounts_id+"><li class=\"sale\">市场价 <span class=\"iconfont icon-qian\"></span><span style=\"color:#c444ff;font-size: 0.26rem\">" + orderPrice + "</span></li> " + orderBtnText + "</ul></div></li>";

		}

		document.getElementById(Eid).innerHTML = orderHtml;
		document.getElementById(Eid).className += ' active';
	},
	/*
	 *addGrabContentDom 免费抢内容块 data 数据 Eid 模块ID
	 * */
	addGrabContentDom: function(data, Eid ,time) {
		//内容块
		var orderId = 0,
			discounts_id = 0,
			orderName = "潮流运动鞋潮流运动鞋潮流运动鞋",
			orderAllAmount = 1000, //总份数
			orderAmount = 50, //已抢份数
			orderPrice = 580, //市场价格
			orderHtml = "",
			orderImg = "../images/banner@2x.png",
			orderisTime = '1', //活动状态 0 未开始 1 正在进行
			orderBtnText = "",
			percentage = 50, //计算百分比
			orderCss = "width:" + percentage + "%";
			//判断当前档期 活动状态
			var now = new Date(),
			hour = now.getHours();
			if(hour < time){
				//未开始
				orderisTime = '0';
			}else{
				//正在进行
				orderisTime = '1';
			}
			
		for(var i = 0; i < data.length; i++) {
			
			orderId = data[i].id;
			discounts_id = data[i].discounts_id;
			orderName = data[i].goodname;
			orderAllAmount = data[i].number; //总份数
			orderAmount = data[i].grabnum;//已抢份数
			orderPrice = data[i].goods_price; //市场价格
			orderImg = _imgUrl + data[i].goods_display_img;
			percentage = orderAmount > 0 ? (+orderAmount)/(+orderAllAmount)*100 : 0;
			console.log(percentage);
			orderCss = "width:" + percentage + "%";
			

			if(orderisTime == '0') {

				orderBtnText = "<li class=\"purchase\" orderisTime=" + orderisTime + ">未开始</li>";

			} else if(orderisTime == '1') {

				orderBtnText = "<li class=\"purchase\" style='background:red;color:#fff;' orderisTime=" + orderisTime + ">免费抢</li>";

			}


			orderHtml += "<li class=\"pur purId grabId\"><div class=\"left\"><img src=" + orderImg + " alt=''></div><div class=\"right\"><p class=\"productName\">" + orderName + "</p><div class=\"buyingMes\"><div class='buyProgress'><div class='buyContent' style=" + orderCss + "></div>";
			orderHtml += " </div><div class=\"num\"><div class=\"all\"><p><span class=\"iconfont icon-song\" style=\"color: #c444ff;font-size: 0.32rem\"></span><span style='font-size: 0.18rem;color: #c444ff;'>" + orderAllAmount + "</span>份</p></div><div class=\"done\"><p style='margin-left: 0.1rem'>已抢<span style='font-size: 0.18rem;color: #c444ff;'>" + orderAmount + "</span>份</p></div></div></div>";
			orderHtml += " <ul class=\"price\" orderId = " + orderId + " discounts_id = "+discounts_id+"><li class=\"sale\">市场价 <span class=\"iconfont icon-qian\"></span><span style=\"color:#c444ff;font-size: 0.26rem\">" + orderPrice + "</span></li> " + orderBtnText + "</ul></div></li>";

		}

		document.getElementById(Eid).innerHTML = orderHtml;
		document.getElementById(Eid).className += ' active';
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
		} else {
			var html = "<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span> &nbsp;:&nbsp;<span class=\"hour\" style='background:#666;'>00</span>"
			$(".down").html(html);

			console.log("_isSendBtn=" + _isSendBtn);

			if(_isSendBtn) {
				//免费送提示语
				$(".countdown > p").html("本档活动已经结束");
			} else {
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
	},
	/*
	 * addGrabRealize 免费抢  goodsid：商品ID  discounts_id：概率设置折扣id
	 */
	addGrabRealize:function(gsId,disId){
		if(!userInfo || !userInfo.id){
			var btnArray = ['取消', '前往'];
			mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
				if(e.index == 1) {
					window.location.href = "qzzlogin.html";
				} else {
					console.log("取消前往登录页面");
				}
			})
			return;
		}
		var loginName = userInfo.id; //localStorage.getItem("loginName") ;
		
		$.ajax({
			type: "POST",
			url: _commodity.addGrabRealize,
			dataType: 'json',
			data: {
				"loginName": loginName,
				"goodsid":gsId,
				"discounts_id":disId
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					$(".title-open .user").html(data.discountname);
					$(".content .gift").html(data.discountname);
					$("#openBody").removeClass("on-open-body");
				} else {
					mui.toast(data.msg);
				}

			}
		});
	},
	/*
	 * addSendRealize 免费领  goodsid：商品ID  discounts_id：概率设置折扣id
	 */
	addSendRealize:function(gsId,disId){
		if(!userInfo || !userInfo.id){
			var btnArray = ['取消', '前往'];
			mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
				if(e.index == 1) {
					window.location.href = "qzzlogin.html";
				} else {
					console.log("取消前往登录页面");
				}
			})
			return;
		}
		var loginName = userInfo.id; //localStorage.getItem("loginName") ;
		
		$.ajax({
			type: "POST",
			url: _commodity.addSendRealize,
			dataType: 'json',
			data: {
				"loginName": loginName,
				"goodsid":gsId,
				"discounts_id":disId
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					$(".title-open .user").html(data.discountname);
					$(".content .gift").html(data.discountname);
					$("#openBody").removeClass("on-open-body");
				} else {
					mui.toast(data.msg);
				}

			}
		});
	}
}