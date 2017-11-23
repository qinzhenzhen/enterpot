var singleOrder = {};
$(function() {

	//订单支付
	if($("#orderSum")[0]) {
		singleOrder = JSON.parse(localStorage.getItem("singleOrder"));
		console.log(singleOrder);
		$("#orderSum").html(singleOrder.orderSum);
		$("#orderno").html(singleOrder.orderno);
		$("#quantity").html(singleOrder.order.length > 1 ? singleOrder.order.length : singleOrder.order[0].quantity);

		var type = "appleiap"; //默认钱包支付
		$(".payMethod .method").click(function() {
			var index = $(this).index();

			if(index !== 0) {
				mui.alert('目前只支持钱包支付', '', function() {
					console.log("目前只支持钱包支付");
				});
				return;
			} 
			$(".choose").filter(".active").removeClass('active').end().eq(index).addClass('active');
			console.log(index);
		});
		
		//支付 ".qzzPayId"
		$('.qzzPayId').on('click', function() {
			//window.location.href = "qzzPay.html";
			//setLocation.openWindow("qzzPay.html");
			ok();
		});
	}

	//充值
	if($("#payBtn")[0]) {
		var type = "alipay"; //默认支付宝
		$(".payMethod .method").click(function() {
			var index = $(this).index();
			if(index == 0) {
				mui.alert('目前只能用支付宝支付', '请选支付宝', function() {
					console.log("目前只能用支付宝支付");
				});
				return;
				type = "wxpay";
			} else if(index == 1) {
				type = "alipay";
			}
			$(".choose").filter(".active").removeClass('active').end().eq(index).addClass('active');
		})
		//充值
		$("#payBtn").on("click", function() {
			var sum = $("#payId").val();
			console.log(sum + "----" + type);
			if(!sum) {
				alert("请填写金额");
				return;
			}
			//支付
			pay(sum, type);
		});
	}

})

function ok() {
	console.log(singleOrder);
	//method:（1：支付宝交易2：微信交易3：普通交易）
	var url = "http://118.31.45.231/api.php/Home/Deal/shop_deal";
	$.ajax({
		type: "POST",
		url: url,
		dataType: 'json',
		data: {
			loginName: singleOrder.loginName,
			orderno: singleOrder.orderno,
			num: singleOrder.order[0].quantity,
			price: singleOrder.order[0].goods_price,
			addressid: singleOrder.addressid,
			method: 3
		},
		success: function(data) {
			console.log(data);
			if(data.code == "000002"){
				var btnArray = ['否', '是'];
				mui.confirm('用户账户金额不足！是否前往充值', '', btnArray, function(e) {
					if (e.index == 1) {
						setLocation.openWindow("qzzmyWallet.html");
					} else {
						console.log("不删除收货地址");
					}
				})
			}else if(data.code == "000008"){
				mui.alert('商品已购物成功，请耐心等待发货', '', function() {
					setLocation.openWindow("order.html");
				});
			}else{
				mui.alert('支付失败，请重新支付', '', function() {
					
				});
			}
			
		}
	});
}

var pays = {};

function plusReady() {
	// 获取支付通道
	plus.payment.getChannels(function(channels) {
		var info = document.getElementById('info');
		var txt = '支付通道信息：';
		for(var i in channels) {
			var channel = channels[i];
			if(channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
				continue;
			}
			pays[channel.id] = channel;
			txt += 'id:' + channel.id + ', ';
			txt += 'description:' + channel.description + ', ';
			txt += 'serviceReady:' + channel.serviceReady + '； ';

			checkServices(channel);
		}
		info.innerText = txt;

	}, function(e) {
		outLine('获取支付通道失败：' + e.message);
	});
}

document.addEventListener('plusready', plusReady, false);

// 检测是否安装支付服务
function checkServices(pc) {
	if(!pc.serviceReady) {
		var txt = null;
		switch(pc.id) {
			case 'alipay':
				txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
				break;
			default:
				txt = '系统未安装“' + pc.description + '”服务，无法完成支付，是否立即安装？';
				break;
		}
		plus.nativeUI.confirm(txt, function(e) {
			if(e.index == 0) {
				pc.installService();
			}
		}, pc.description);
	}
}

var w = null;
var ALIPAYSERVER = 'http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total='; //支付宝
var WXPAYSERVER = 'http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total=';
// 支付
function pay(sum, id) {
	if(w) {
		return;
	} //检查是否请求订单中
	/*	if(id==='appleiap'){
			outSet('应用内支付');
			clicked('payment_iap.html');
			return;
		}*/
	//outSet('----- 请求支付 -----');
	var url = "";
	if(id == 'alipay') {
		//支付宝
		url = ALIPAYSERVER;
	} else if(id == 'wxpay') {
		//微信
		url = WXPAYSERVER;
	} else {
		plus.nativeUI.alert('当前环境不支持此支付通道！', null, '捐赠');
		return;
	}
	/*	var appid=plus.runtime.appid;
		if(navigator.userAgent.indexOf('StreamApp')>=0){
			appid='Stream';
		}
		url+='&appid='+appid+'&total=';*/

	w = plus.nativeUI.showWaiting();
	console.log(url);
	// 请求支付订单
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 4:
				w.close();
				w = null;
				if(xhr.status == 200) {
					console.log('----- 请求订单成功 -----');
					console.log(xhr.responseText);
					var order = xhr.responseText;
					plus.payment.request(pays[id], order, function(result) {
						console.log('----- 支付成功 -----');
						console.log(JSON.stringify(result));
						plus.nativeUI.alert('支付金额' + sum + "元", function() {
							back();
						}, '支付成为');
					}, function(e) {
						console.log('----- 支付失败 -----');
						console.log('[' + e.code + ']：' + e.message);
						plus.nativeUI.alert('请重新支付', null, '支付失败');
					});
				} else {
					console.log('----- 请求订单失败 -----');
					console.log(xhr.status);
					plus.nativeUI.alert('获取订单信息失败！', null, '支付失败');
				}
				break;
			default:
				break;
		}
	}
	xhr.open('GET', url + sum);
	console.log('请求支付订单：' + url + sum);
	xhr.send();
}