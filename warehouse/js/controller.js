var _index = 0; //记录上一次点击下标

$(function() {

	if(!mui) {
		console.log("请引用mui.js文件");
		return;
	}

	mui.init();

	$("footer .footer-main .setting").click(function() {
		var index = $(this).index();
		$("footer .footer-main .setting .pics").filter(".active").removeClass('active').end().eq(index).addClass('active');
		setLocation.setHref(index);
	});

	//消息 “ .hintId ”
	$('.hintId').on('click', function() {
		setLocation.openWindow("qzznews.html");
	});
	//查询 ".selectId"
	$('.selectId').on('click', function() {
		alert("正在建议中。。。");
	});

	//设置 " .setId"
	$('.setId').on('click', function() {
		//window.location.href = "qzzSetting.html";
		setLocation.openWindow("qzzSetting.html");
	});

	//个人资料 " .my-introId"
	$('.my-introId').on('click', function() {
		//window.location.href = "qzzMyintro.html";
		setLocation.openWindow("qzzMyintro.html");
	});

	//优惠券 ".discount-couponId"
	$('.discount-couponId').on('click', function() {
		alert("正在建议中。。。");
	});

	//钱包 " .my-walletId"
	$('.my-walletId').on('click', function() {
		//window.location.href = "qzzmyWallet.html";
		setLocation.openWindow("qzzmyWallet.html");
	});

	//收货地址 " .addressId"
	$('.addressId').on('click', function() {
		//window.location.href = "qzzaddress.html";

		//书签 ：bookmark ：0 我的 - > 地址;  1 购物车-> 地址 ; 
		localStorage.setItem("bookmark", 1);
		setLocation.openWindow("qzzaddress.html");
	});

	//个人中心-》收货地址 " .addressId0"
	$('.addressId0').on('click', function() {
		//window.location.href = "qzzaddress.html";

		//书签 ：bookmark ：0 我的 - > 地址;  1 购物车-> 地址 ; 
		localStorage.setItem("bookmark", 0);
		setLocation.openWindow("qzzaddress.html");
	});

	//客服 " .customer-serviceId "
	$('.customer-serviceId').on('click', function() {
		alert("正在建议中。。。");
	});

	//会员 " .memberId "
	$('.memberId').on('click', function() {
		//window.location.href = "qzzUstates.html";
		setLocation.openWindow("qzzUstates.html");
	});

	//我的订单 " .orderId" 
	$('.orderId').on('click', function() {
		//window.location.href = "order.html";
		setLocation.openWindow("order.html");
	});

	//售后" .qzzsaleId" 
	$('.qzzsaleId').on('click', function() {
		//window.location.href = "order.html";
        alert("正在建议中。。。");
		// setLocation.openWindow("qzzsale.html");
	});

	//待支付 ".await_commodityId"
	$('.await_commodityId').on('click', function() {
		//window.location.href = "await_commodity.html";
        setLocation.openWindow("order.html");
	});

	//待发货 ".committed_commodityId"
	$('.committed_commodityId').on('click', function() {
        setLocation.openWindow("order.html");
	});

	//捡货中 ".pick_up_commodityId"
	$('.pick_up_commodityId').on('click', function() {
        setLocation.openWindow("order.html");
	});

	//已发货 ".shipped_commodityId"
	$('.shipped_commodityId').on('click', function() {
        setLocation.openWindow("order.html");
	});

	//已取消 ".cancel_commodityId"
	$('.cancel_commodityId').on('click', function() {
        setLocation.openWindow("order.html");
	});

	//平台缺货 " .lack_commodityId"
	$('.lack_commodityId').on('click', function() {
		//window.location.href = "lack_commodity.html";
        alert("正在建议中。。。");
		// setLocation.openWindow("lack_commodity.html");
	});

	//漏发 " .seep_commodityId"
	$('.seep_commodityId').on('click', function() {
		//window.location.href = "seep_commodity.html";
        alert("正在建议中。。。");
		// setLocation.openWindow("seep_commodity.html");
	});

	//退货中 " .back_commodityId"
	$('.back_commodityId').on('click', function() {
        alert("正在建议中。。。");
		//window.location.href = "back_commodity.html";
		// setLocation.openWindow("back_commodity.html");
	});

	//已退货 ".back_on_commodityId"
	$('.back_on_commodityId').on('click', function() {
        alert("正在建议中。。。");
		//window.location.href = "back_on_commodity.html";
		//  setLocation.openWindow("back_on_commodity.html");
	});

	//回收清单 ".clear_orderId"
	$('.clear_orderId').on('click', function() {
		//window.location.href = "recycle_inventory.html";
		setLocation.openWindow("recycle_inventory.html");
	});

	//发票 ".notarize_order_invoiceId"
	$('.notarize_order_invoiceId').on('click', function() {
		//window.location.href = "notarize_order_invoice.html";
		setLocation.openWindow("notarize_order_invoice.html");
	});

	//修改昵称 " .upNameId"
	$('.upNameId').on('click', function() {
		//window.location.href = "qzznameset.html";
		setLocation.openWindow("qzznameset.html");
	});

	//修改绑定手机 " .upPhoneId"
	$('.upPhoneId').on('click', function() {
		//window.location.href = "qzzPhoneUser.html";
		setLocation.openWindow("qzzPhoneUser.html");
	});

	//修改密码 " .upPasswordId"
	$('.upPasswordId').on('click', function() {
		//window.location.href = "qzzmypass.html";
		setLocation.openWindow("qzzmypass.html");
	});

	//添加收货地址 ".qzzeditId"
	$('.qzzeditId').on('click', function() {
		setLocation.openWindow("qzzedit.html");
	});
})

var setLocation = {

	setHref: function(id) {
		var user = JSON.parse(localStorage.getItem("user")) ;//localStorage.getItem("loginName");
		var url = "",
			type = false;
		switch(parseInt(id)) {
			case 0:
				url = "index.html";
				break;
			case 1:
				type = true;
				url = "qzzAttention.html";
				break;
			case 2:
				type = true;
				url = "qzzshoppingCart.html"
				break;

			default:
				type = true;
				url = "qzzmy.html";

		}

		if(!user && type) {
			var btnArray = ['取消', '前往'];
			mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
				if(e.index == 1) {
					window.location.href = "qzzlogin.html";
				} else {
					console.log("取消前往登录页面");
					$("footer .footer-main .setting .pics").filter(".active").removeClass('active').end().eq(_index).addClass('active');
				}
			})
		} else {
			_index = id;
			window.location.href = url;
		}

	},
	openWindow: function(url) {
		mui.openWindow({
			url: url,
			id: url
		})
	}
}