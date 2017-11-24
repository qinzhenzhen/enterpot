$(function() {	
	var loginName = localStorage.getItem("loginName");
	var user = JSON.parse(localStorage.getItem("user"));
	if(!user.id) {
		var btnArray = ['取消', '前往'];
		mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
			if(e.index == 1) {
				window.location.href = "qzzlogin.html";
			} else {
				console.log("取消前往登录页面");
				return;
			}
		})
	}
	var ownUrl = "http://118.31.45.231/api.php/Home/Userinfo/index";
	$.ajax({
			type: 'post',
			url: ownUrl,
			data: {
				loginName: user.id
			}
		})
		.done(function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			if(data.code == 000008) {
				user.vip = data.userinfo.vip;
				user.usermoney = data.userinfo.usermoney;
				localStorage.setItem("user", JSON.stringify(user));
				
			}
		})
})