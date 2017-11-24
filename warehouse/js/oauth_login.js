var auths = {};

function plusReady() {
	// 获取登录认证通道
	plus.oauth.getServices(function(services) {
		for(var i in services) {
			var service = services[i];
			console.log(service.id + ": " + service.authResult + ", " + service.userInfo);
			auths[service.id] = service;
		}

	}, function(e) {
		outLine("获取登录认证失败：" + e.message);
		plus.nativeUI.alert("获取登录认证失败", null);
	});
}
document.addEventListener('plusready', plusReady, false);

var loginId = "";
//登录验证
function login(id) {
	//alert("----- 登录认证 -----");
	loginId = id;
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
			//alert("登录认证成功：");
			console.log(JSON.stringify(auth.authResult));
			userinfo(auth);
		}, function(e) {
			w && w.close();
			w = null;
			//alert("登录认证失败：");
			console.log("[" + e.code + "]：" + e.message);
			plus.nativeUI.alert("登录认证失败,", null, "登录失败");
			//plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	} else {
		//alert("无效的登录认证通道！");
		plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
	}
}

// 获取用户信息
function userinfo(a) {
	//alert("----- 获取用户信息 -----");
	a.getUserInfo(function() {
		//alert("获取用户信息成功：");
		//alert(JSON.stringify(a.userInfo));
		var nickname = a.userInfo.nickname || a.userInfo.name || a.userInfo.miliaoNick;
		//plus.nativeUI.alert("欢迎“" + nickname + "”登录！");
		
		var userImg = a.userInfo.headimgurl || a.userInfo.figureurl || a.userInfo.profile_image_url || "0";
		var loginName =  a.userInfo.openid || a.userInfo.id;
		var userForm = 0;
			
		if(loginId == "weixin"){
			userForm = 1 ;
		}else if(loginId == "qq"){
			userForm = 2 ;
		}else if(loginId == "sinaweibo"){
			userForm = 3 ;
		}else if(loginId == "alipay"){
			userForm = 4 ;
		}
		var user = {};
		user.name = nickname;
		user.login_img = userImg;
		user.id = loginName;
		user.phone = "";
		localStorage.setItem("user", JSON.stringify(user));
		
		addLogin(userImg , loginName ,userForm ,nickname);
			
	}, function(e) {
		//alert("获取用户信息失败：");
		console.log("[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("获取用户信息失败！", null, "登录");
	});
}

// 注销登录
function logoutAll() {
	console.log("----- 注销登录认证 -----");
	//alert();
	for(var i in auths) {
		logout(auths[i]);
	}
}

function logout(auth) {
	auth.logout(function() {
		console.log("注销\"" + auth.description + "\"成功");
	}, function(e) {
		console.log("注销\"" + auth.description + "\"失败：" + e.message);
	});
}

function addLogin(userImg,loginName , userForm, nickname) {
	alert("userImg = "+userImg+ "  loginName="+loginName);
	//outLine("userImg = "+userImg+ "  loginName="+loginName);

	$.ajax({
			url: curpath,
			type: "post",
			data: {
				"userphoto":userImg,
				"loginName": loginName,
				"loginMsgCode": "",
				"userForm": userForm,
				"nickname":nickname
			},
			dataType: "json",
		})
		.done(function(d) {
			//console.log(d.code)
			//alert(d.code);
			if(d) {
				if(d.code == 000007) {
					//$(".erron_alert").show();
					//$('.error').text(d.msg);
				} else if(d.code == 000008) {
					//$(".erron_alert").show();
					//$('.error').text(error_4);
					//location.href = "index.html";
					mui.alert("欢迎“" + nickname + "”登录！", '', function() {
						console.log("请重新分享");
						location.href = "index.html";
					});
				}
			} else {
				//$(".erron_alert").show();
				//$('.error').text(error_2);
				return;
			}
		})
}