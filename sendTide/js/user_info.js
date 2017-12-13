//获取通道信息
var auths = {};

$(function() {
	//发送验证码
	mui(document).on('tap', '#cord', function() {
		var btn = $(this);
		var userPhone = $("#txtUser").val();
		if(!userPhone || !tools.verifyPhone(userPhone)) {
			mui.toast("手机号不正确");
			return;
		} else {
			if(!btn.hasClass('login-a')) {
				var count = 60;
				btn.text(count + ' 验证码');

				var resend = setInterval(function() {
					count--;
					if(count > 0) {
						btn.text(count + ' 验证码').addClass('login-a');;
						return false;

					} else {
						clearInterval(resend);
						btn.text('获取验证码').removeClass('login-a');;
					}
				}, 1000);

				//获取验证码
				user.getUserCode(userPhone);
			}

		}
	});

	//登录
	mui(document).on('tap', '#userInfo', function() {
		var userPhone = $("#txtUser").val(),
			userCode = $("#txtCode").val();
		if(!userPhone || !tools.verifyPhone(userPhone)) {
			mui.toast("手机号不正确");
			return;
		} else if(!userCode) {
			mui.toast("请输入验证码");
			return;
		}

		var userInfo = {};
		userInfo.id = userPhone;
		userInfo.nickname = userPhone;
		userInfo.userForm = '0'; //手机登录
		userInfo.userCode = userCode;
		userInfo.userphoto = ""; //头像

		user.setUserInfo(userInfo);

	})

	//隐藏第三方登录
	$(".other").hide();
	
	//获取通道
	document.addEventListener('plusready', function(){
		user.getPlusReady();
	}, false);
	
	//选择受权登录
	mui(document).on('tap','#oauthId .o',function(){
		var id = this.getAttribute('typeid');
		if(auths){
			user.logoutAll();
			user.getUserlogIn(id);
		}
	})
})


var user = {
	/*
	 *getUserCode 获取验码  
	 * phone: 15316311635 
	 * */
	getUserCode: function(phone) {
		$.ajax({
				url: _user.getUserCode,
				type: "post",
				data: {
					"mobile": phone
				},
				dataType: "json",
			})
			.done(function(d) {
				if(d.code !== "000008") {
					mui.toast(d.msg);
				}
			})
	},
	/*
	 *setUserInfo 用户登录
	 * user: id 唯一标识  nickname 昵称  userForm 标识 	(0：手机短信登录;1：微信;2：QQ;3：微博） userCode 验证码  userphoto 头像
	 * */
	setUserInfo: function(userInfo) {
		if(!userInfo.id) {
			mui.toast("请选择其它登录方式");
			return;
		}
	
		$.ajax({
				url: _user.setUserInfo,
				type: "post",
				data: {
					"loginName": userInfo.id,
					"nickname": userInfo.nickname,
					"userForm": userInfo.userForm,
					"loginMsgCode": userInfo.userCode,
					"userphoto": userInfo.userphoto

				},
				dataType: "json",
			})
			.done(function(d) {
				if(d.code == "000008") {
					mui.toast("欢迎“" + userInfo.nickname + "”登录！");
					
					localStorage.setItem('userInfo', JSON.stringify(userInfo));
					setTimeout(function(){
						setLocation.openWindow("index.html");
					},2000);

				} else {
					mui.toast(d.msg);
				}
			})

	},
	/*
	 *getPlusReady 受权登录 -获取受权通道
	 * */
	getPlusReady: function() {
		$(".other").show();
		// 获取登录认证通道
		plus.oauth.getServices(function(services) {
			for(var i in services) {
				var service = services[i];
				console.log(service.id + ": " + service.authResult + ", " + service.userInfo);
				auths[service.id] = service;
			}
			//alert(plus.os.name);

			var html = "";
			if(plus.os.name == 'iOS') {
				html = "<li class=\"o\" typeid=\"weixin\"><img src=\"../images/button_wechat.png\" ></li><li class=\"o\" typeid=\"qq\"><img src=\"../images/button_qq.png\" ></li><li class=\"o\" typeid=\"sinaweibo\"><img src=\"../images/button_weibo.png\"></li>";
			} else if(plus.os.name == 'Android') {
				html = "<li class=\"o\" typeid=\"weixin\"><img src=\"../images/button_wechat.png\" ></li><li class=\"o\" typeid=\"qq\"><img src=\"../images/button_qq.png\" ></li>";
			}

			$("#oauthId").html(html);

		}, function(e) {
			console.log("获取登录认证失败：" + e.message);
			plus.nativeUI.alert("获取登录认证失败", null);
		});
	},
	/*
	 *logoutAll 注销登录
	 * */
	logoutAll: function() {
		for(var i in auths) {
			user.logout(auths[i]);
		}
	},
	logout: function(auth) {
		auth.logout(function() {
			console.log("注销\"" + auth.description + "\"成功");
		}, function(e) {
			console.log("注销\"" + auth.description + "\"失败：" + e.message);
		});
	},
	/*
	 * getUserlogIn 受权登录 
	 * id : weixin 、qq 、
	 * */
	getUserlogIn: function(id) {
		var eId = id;
		var auth = auths[id];
		if(auth) {
			var w = null;
			if(plus.os.name == "Android") {
				w = plus.nativeUI.showWaiting();
			}
			document.addEventListener("pause", function() {
				setTimeout(function() {
					w && w.close();
					w = null;
				}, 2000);
			}, false);

			auth.login(function() {
				w && w.close();
				w = null;
				console.log(JSON.stringify(auth.authResult));
				//alert(JSON.stringify(auth.authResult));

				user.getUserInfo(auth,eId);
			}, function(e) {
				w && w.close();
				w = null;
				console.log("[" + e.code + "]：" + e.message);
				//alert("[" + e.code + "]：" + e.message);
				plus.nativeUI.alert("登录认证失败,", null, "登录失败");

			});
		} else {
			plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
		}
	},
	/*
	 *getUserInfo 获取受权信息
	 * */
	getUserInfo:function(a,eId){
		a.getUserInfo(function() {
		//alert("获取用户信息成功：");
		//alert(JSON.stringify(a.userInfo));
		var nickname = a.userInfo.nickname || a.userInfo.name || a.userInfo.miliaoNick;
		//plus.nativeUI.alert("欢迎“" + nickname + "”登录！");

		var userImg = a.userInfo.headimgurl || a.userInfo.figureurl || a.userInfo.profile_image_url || "0";
		var loginName = a.userInfo.openid || a.userInfo.id;
		var userForm = '0';
		//console.log(eId);
		if(eId == "weixin"){
			userForm = '1';
		}else if(eId == "qq"){
			userForm = '2';
		}else if(eId == "sinaweibo"){
			userForm = '3';
		}
		
		var userInfo = {};
		userInfo.id = loginName;
		userInfo.nickname = nickname;
		userInfo.userForm = userForm; //手机登录
		userInfo.userCode = "";
		userInfo.userphoto = userImg; //头像
		console.log(JSON.stringify(userInfo));
		
		user.setUserInfo(userInfo);
		
		
	}, function(e) {
		
		plus.nativeUI.alert("获取用户信息失败！", null, "登录");
		
		user.logoutAll();
	});
	}
}



