/*
 *分享
 * */

var shares=null;
// H5 plus事件处理
function plusReady(){
	updateSerivces();
}

if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready', plusReady, false);
}

/**
 * 更新分享服务
 */
function updateSerivces(){
	plus.share.getServices(function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		outSet('获取分享服务列表失败：'+e.message);
	});
}

// 打开分享
function shareShow(){
	var shareBts=[];
	// 更新分享列表
	var ss=shares['weixin'];
	if(navigator.userAgent.indexOf('qihoo')<0){  //在360流应用中微信不支持分享图片
		ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
		shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
	}
	ss=shares['sinaweibo'];
	ss&&shareBts.push({title:'新浪微博',s:ss});
	ss=shares['qq'];
	ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
	// 弹出分享列表
	shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts}, function(e){
		(e.index>0)&&shareAction(shareBts[e.index-1],false);
	}):plus.nativeUI.alert('当前环境无法支持分享操作!');
}

/**
   * 分享操作
   * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
   * @param {Boolean} bh 是否分享链接
   */
function shareAction(sb,bh) {
	//outSet('分享操作：');
	if(!sb||!sb.s){
		outLine('无效的分享服务！');
		return;
	}
	var msg={ content:"xxx",extra:{scene:sb.x}};
	var pic = {};
	pic.realUrl = '_www/logo.png';
	if(bh){
		msg.href=sharehref.value;
		if(sharehrefTitle&&sharehrefTitle.value!=''){
			msg.title=sharehrefTitle.value;
		}
		if(sharehrefDes&&sharehrefDes.value!=''){
			msg.content=sharehrefDes.value;
		}
		msg.thumbs=['_www/logo.png'];
		msg.pictures=['_www/logo.png'];
	}else{
		if(pic&&pic.realUrl){
			msg.pictures=[pic.realUrl];
		}
	}
	// 发送分享
	if(sb.s.authenticated){
		//outLine('---已授权---');
		shareMessage(msg, sb.s);
	}else{
		//outLine('---未授权---');
		sb.s.authorize(function(){
			shareMessage(msg,sb.s);
		}, function(e){
			console.log('认证授权失败：'+e.code+' - '+e.message);
		});
	}
}

/**
   * 发送分享消息
   * @param {JSON} msg
   * @param {plus.share.ShareService} s
   */
function shareMessage(msg, s){
	console.log(JSON.stringify(msg));
	s.send(msg, function(){
		console.log('分享到"'+s.description+'"成功！');
	}, function(e){
		console.log('分享到"'+s.description+'"失败: '+JSON.stringify(e));
	});
}

/**
 * 解除所有分享服务的授权
 */
function cancelAuth(){try{
	console.log('解除授权：');
	for(var i in shares){
		var s=shares[i];
		if(s.authenticated){
			console.log('取消"'+s.description+'"');
		}
		s.forbid();
	}
	// 取消授权后需要更新服务列表
	updateSerivces();
	console.log('操作成功！');}catch(e){alert(e);}
}