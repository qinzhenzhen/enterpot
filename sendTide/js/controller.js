var _index = 0; //记录上一次点击下标

$(function() {

	if(!mui) {
		console.log("请引用mui.js文件");
		return;
	}

	mui.init();

	$("footer .footer-main .setting").click(function() {
		var index = $(this).index();
		setLocation.setHref(index);
	});
	/*	//商品详情   ".purId"
		$(document).on('click','.purId',function () {
			location.href="detail.html";
			// setLocation.openWindow("detail.html");
	    })*/

	//搜索  ".searchId"
	$(".searchId").click(function() {
		location.href = "search.html";
	})

	//我的
	$(document).on('click', '.sign-content .conter-bottom .conter-list', function() {
		var type = this.getAttribute('type');
		console.log(type);
		if(type == "qzzaddress") {
			//地址
			setLocation.openWindow("qzzaddress.html");
		} else if(type == "purse") {
			//乾坤袋
			setLocation.openWindow("purse.html");
		} else if(type == "qzzmember") {
			//会员
			setLocation.openWindow("qzzmember.html");
		} else if(type == "sustom") {
			//客服
			//setLocation.openWindow("sustom.html");
			var btnArray = ['拨打', '取消'];
			var phone = "13693291433";
			mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
				if(e.index == 0) {
					plus.device.dial(phone, false);
				}
			});
		}
	})
	//
	$(document).on('click', '.sign-content .sign-free span', function() {
		var type = this.getAttribute('class');
		console.log(type);
		if(type == "free-left") {
			//我的免费送 
			setLocation.openWindow("send.html");
		} else if(type == "free-right") {
			//我的免费抢
			setLocation.openWindow("free.html");
		}
	})

	//添加新地址
	mui(document).on('tap', '.qzzeditId', function() {
		setLocation.openWindow("qzzedit.html");
	})

	//首页
	mui(document).on('tap', '.indexId', function() {
		setLocation.openWindow("index.html");
	})

	//客服
	mui(document).on('tap', '.kefuId', function() {
		var btnArray = ['拨打', '取消'];
		var phone = "13693291433";
		mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
			if(e.index == 0) {
				plus.device.dial(phone, false);
			}
		});
	})
})

var setLocation = {

	setHref: function(id) {
		console.log(_index + "=" + id);
		var userInfo = JSON.parse(localStorage.getItem("userInfo")); //localStorage.getItem("loginName");
		var url = "",
			type = false;
		switch(parseInt(id)) {
			case 0:
				type = true;
				url = "attention.html";
				break;
			case 1:
				url = "index.html";
				break;
			default:
				type = true;
				url = "sign_in.html";

		}

		if(!userInfo && type) {
			var btnArray = ['取消', '前往'];
			mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
				if(e.index == 1) {
					window.location.href = "qzzlogin.html";
				} else {
					console.log("取消前往登录页面");
				}
			})
		} else {
			_index = id;
			window.location.href = url;
		}

	},
	openWindow: function(url) {
		mui.openWindow({
			url: url
		})
	}
}