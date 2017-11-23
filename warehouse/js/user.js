$(function() {	
	var loginName = localStorage.getItem("loginName");
	if(!loginName) {
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
				loginName: loginName
			}
		})
		.done(function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			if(data.code == 000008) {
				localStorage.setItem("vip",data.userinfo.vip);
				localStorage.setItem("usermoney",data.userinfo.usermoney);
				localStorage.setItem("userid",data.userinfo.userid);
			}
		})
})