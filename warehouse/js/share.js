var shares = null;
var name = "";
var orderId = "";
var way = 0;
var user = JSON.parse(localStorage.getItem("user")); //localStorage.getItem("loginName");
$(function() {
	$(document).on("click", ".shareId", function() {
		if(!user.id) {
			var btnArray = ['取消', '前往'];
			mui.confirm('您还未登录，请前往登录', '登录', btnArray, function(e) {
				if(e.index == 1) {
					window.location.href = "qzzlogin.html";
				} else {
					console.log("取消前往登录页面");
				}
			})
		}
		var parents = $(this).parent().parent().children();
		for(var i = 0; i < parents.length; i++) {
			if($(parents[i]).attr("class").indexOf("display")>=0) {
				getShareImg(parents[i]);
				break;
			}
		}

		name = $(parents).find(".brand").text();
		orderId = $(parents).find(".col").attr("productid");
		console.log("name:"+name+" orderId:"+orderId);
	})
})

function getShareImg(data) {
	var dataList = $(data).children();
	var imgUrl, len = dataList.length;
	for(var i = 0; i < len; i++) {
		imgUrl = $(dataList[i]).find("img").attr("src");
		//console.log(imgUrl);
		setImg(imgUrl, len);
	}

}

function plusReady() {
	updateSerivces();
}

if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

/**
 * 更新分享服务
 */
function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		outSet('获取分享服务列表失败：' + e.message);
	});
}

// 打开分享
function shareShow() {
	var shareBts = [];
	// 更新分享列表
	var ss = shares['weixin'];
	if(navigator.userAgent.indexOf('qihoo') < 0) { //在360流应用中微信不支持分享图片
		ss && ss.nativeClient && (shareBts.push({
				title: '微信朋友圈',
				s: ss,
				x: 'WXSceneTimeline'
			}),
			shareBts.push({
				title: '微信好友',
				s: ss,
				x: 'WXSceneSession'
			}));
	}
	ss = shares['sinaweibo'];
	ss && shareBts.push({
		title: '新浪微博',
		s: ss
	});

	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});

	// 弹出分享列表
	shareBts.length > 0 ? plus.nativeUI.actionSheet({
		title: '分享',
		cancel: '取消',
		buttons: shareBts
	}, function(e) {
		(e.index > 0) && shareAction(shareBts[e.index - 1], false);
	}) : plus.nativeUI.alert('当前环境无法支持分享操作!');
}

/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */
function shareAction(sb, bh) {
	console.log("-----------------------");
	console.log(sb);
	console.log(bh);

	//alert('分享操作：');
	if(!sb || !sb.s) {
		alert('无效的分享服务！');
		return;
	}
	var msg = {
		content: "测试分享",
		extra: {
			scene: sb.x
		}
	};
	if(bh) {
		msg.href = sharehref.value;
		if(sharehrefTitle && sharehrefTitle.value != '') {
			msg.title = sharehrefTitle.value;
		}
		if(sharehrefDes && sharehrefDes.value != '') {
			msg.content = sharehrefDes.value;
		}
		msg.thumbs = ['_www/logo.png'];
		msg.pictures = ['_www/logo.png'];
	} else {
		msg.pictures = [];
		if(pic.length > 0) {
			for(var i in pic) {
				msg.pictures.push(pic[i]);
			}

		}
	}
	// 发送分享
	if(sb.s.authenticated) {
		//alert('---已授权---');
		shareMessage(msg, sb.s);
	} else {
		//alert('---未授权---');
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {
			//alert('认证授权失败：'+e.code+' - '+e.message);
		});
	}
}

/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {
	//alert(JSON.stringify(msg));
	s.send(msg, function() {
		//alert('分享到"'+s.description+'"成功！');
		shareOk();
	}, function(e) {
		//alert('分享到"'+s.description+'"失败: '+JSON.stringify(e));
		mui.alert('分享失败,请重新分享', '分享失败', function() {
			console.log("请重新分享");
		});
	});
}
/**
 * 调用系统分享
 */
function shareSystem(data) {
	
	//alert('调用系统分享');
	//alert(shares['weixin']);
	//alert(shares['qq']);
	var msg = {
		content: name
	};
	if(data.length > 0) {
		msg.pictures = data;
	}

	plus.share.sendWithSystem ? plus.share.sendWithSystem(msg, function() {
		//alert('Success');
		//分享成功
		shareOk();
	}, function(e) {
		//alert('Failed: '+JSON.stringify(e));
		//分享失败
		mui.alert('分享失败,请重新分享', '分享失败', function() {
			console.log("请重新分享");
		});

	}) : shareSystemNativeJS();
}

function shareSystemNativeJS() {
	//alert("--shareSystemNativeJS");
	if(plus.os.name !== 'Android') {
		plus.nativeUI.alert('此平台暂不支持系统分享功能!');
		return;
	}
	var intent = new Intent(Intent.ACTION_SEND);
	if(pic && pic.realUrl) {
		var p = '';
		p = pic.realUrl;
		if(p.substr(0, 7) === 'file://') {
			p = p.substr(7);
		} else if(p.sub(0) !== '/') {
			p = plus.io.convertLocalFileSystemURL(p);
		}
	}
	var f = new File(p);
	var uri = Uri.fromFile(f);
	if(f.exists() && f.isFile()) {
		console.log('image/*');
		intent.setType('image/*');
		intent.putExtra(Intent.EXTRA_STREAM, uri);
	} else {
		console.log('text/plain');
		intent.setType('text/plain');
	}
	intent.putExtra(Intent.EXTRA_SUBJECT, 'HelloH5');
	intent.putExtra(Intent.EXTRA_TEXT, sharecontent.value);
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent, '系统分享HelloH5'));
}

function shareOk() {
	var url = "http://118.31.45.231/api.php/Home/Share/index";
	if(!!orderId && !!user.id) {
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"productid": orderId,
				"loginName": user.id,
				"way": way
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					mui.alert(data.msg, '', function() {
						console.log("分享");
					});
				} else {
					mui.alert(data.msg, '', function() {
						console.log("请重新分享");
					});
				}
			}
		});
	}
}