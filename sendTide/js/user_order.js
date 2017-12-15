/*
 *用户订单实现
 * */

var userInfo = JSON.parse(localStorage.getItem("userInfo"));

var userOrder = {
	/*
	 * getSendOrder 获取免费送订单数据
	 */
	getSendOrderData:function(){
		userOrder.addSendOrderDom("","sendCont"); //默认马上领
		return;
		$.ajax({
			type: "POST",
			url: _address.getAddressList,
			dataType: 'json',
			data: {
				"loginName": loginName
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					
				} else {
					mui.toast(data.msg);
				}

			}
		});
	},
	/*
	 *addSendOrderDom 添加到免费送 DOM
	 * data：数据  Eid 元素ID
	 * */
	addSendOrderDom:function(data,Eid){
		var orderId = '0',
			orderImg = '../images/icon.png',
			orderName = '曼斯布莱顿西服套装男修身羊',
			orderPrice = '1500',
			orderTime = '2017-12-13 15:12:12',
			orderHtml = "",
			orderDom = "";
			
			for(var i = 0 ; i<10 ; i++){
				
				//马上领
				if(Eid == "sendCont"){
					orderTime = orderTime.replace(/ /g,",");
					
					orderDom = "<span class=\"free-from\">倒计时</span><i class=\"free-from2 count_time\" orderTime="+orderTime+">00:00:00</i><span class=\"send-btn\">马上领</span>";
				}else if(Eid == "sendCont1"){
					orderDom = "<span class=\"free-from\">礼品过时失效</span><span class=\"send-btn\">去领其他的</span>";
				}
				
				orderHtml += "<li class=\"free-down\"><a><div class=\"free-left\"><img src="+orderImg+" /></div><div class=\"free-right\"><h1 class=\"free-right-top\">"+orderName+"</h1><p class=\"free-right-p\"><span class=\"free-span1\">市场价</span><i class=\"free-span2\">￥</i><span class=\"free-span3\" style=\"text-decoration:line-through;\">"+orderPrice+"</span><span class=\"free-span4\">免费领</span></p>";
				orderHtml += "<p class=\"free-right-p3\" style=\"margin-top:40px;\" orderId = "+orderId+">"+orderDom+"</p></div></a></li>";
			}
			$("#"+Eid).html(orderHtml);
			
			countTime();
	},
	/*
	 *getGrabOderData 获取免费抢订单数据
	 * */
	getGrabOderData:function(){
		userOrder.addGrabOrderDom("","grabCont"); //默认马上领
		return;
		$.ajax({
			type: "POST",
			url: _address.getAddressList,
			dataType: 'json',
			data: {
				"loginName": loginName
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					
				} else {
					mui.toast(data.msg);
				}

			}
		});
	},
		/*
	 *addSendOrderDom 添加到免费送 DOM
	 * data：数据  Eid 元素ID
	 * */
	addGrabOrderDom:function(data,Eid){
		var orderId = '0',
			orderImg = '../images/icon.png',
			orderName = '曼斯布莱顿西服套装男修身羊',
			orderPrice = '1500',
			orderTime = '2017-12-13 15:12:12',
			orderHtml = "",
			orderDiscount = '5',//折扣
			orderDiscountPrice = orderPrice * orderDiscount / 10,//折扣价
			orderDom = "";
			
			for(var i = 0 ; i<10 ; i++){
				
				//马上领
				if(Eid == "grabCont"){
					orderTime = orderTime.replace(/ /g,",");
					
					orderDom = "<span class=\"free-from\">倒计时</span><i class=\"free-from2 count_time\" orderTime="+orderTime+">00:00:00</i><span class=\"send-btn\">马上抢</span>";
				}else if(Eid == "grabCont1"){
					orderDom = "<span class=\"free-from\">优惠过时失效</span><span class=\"send-btn\">去抢其他的</span>";
				}
				
				orderHtml += "<li class=\"free-down\"><a><div class=\"free-left\"><img src="+orderImg+" /></div><div class=\"free-right\"><h1 class=\"free-right-top\">"+orderName+"</h1><p class=\"free-right-p\"><span class=\"free-span1\">折扣价</span><i class=\"free-span2\">￥</i><span class=\"free-span3\" >"+orderDiscountPrice+"</span><span class=\"free-span4\">"+orderDiscount+"折优惠</span></p>";
				
				orderHtml +="<p class=\"free-right-p\"><span class=\"free-span5\">市场价</span><del>￥"+orderPrice+"</del></p>"
				
				orderHtml += "<p class=\"free-right-p3\" orderId = "+orderId+">"+orderDom+"</p></div></a></li>";
			}
			$("#"+Eid).html(orderHtml);
			
			countTime();
	}
}
