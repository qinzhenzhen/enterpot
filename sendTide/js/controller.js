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
	//商品详情   ".purId"
	$(document).on('click','.purId',function () {
		location.href="detail.html";
		// setLocation.openWindow("detail.html");
    })
	//搜索  searchId
	$(".searchId").click(function () {
        location.href="search.html";
    })
})

	

var setLocation = {

	setHref: function(id) {
		console.log(_index+"="+id);
		var user = JSON.parse(localStorage.getItem("user")) ;//localStorage.getItem("loginName");
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

		if(!user && type) {
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

