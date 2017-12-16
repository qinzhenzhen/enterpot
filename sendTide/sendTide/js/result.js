$(function() {
	mui(document).on('tap', ".navs li", function() {
		var index = $(this).index();
		$(".navs li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
		$(".isScroll li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
		$(".navs li ").find(".img").removeClass('active').end().eq(index).find(".img").addClass('active');
		$(".isScroll li").find('.img').removeClass('active').end().eq(index).find(".img").addClass('active');
		$(".main .list .every .style").filter(".active").removeClass('active').end().eq(index).addClass('active');
		console.log(index);
		if(index == 0) {
			_isSendBtn = true;
			//免费送
			g.getSendData();

		} else {
			_isSendBtn = false;
			//免费抢
			g.getGrabData();
			//24小时倒计时
			g.add24hTime();

		}

	});
	//免费送档期
	mui(document).on('tap', '.rob .times li', function() {
		var index = $(this).index();
		var time = this.getAttribute("timeid"); //档期
		var timeId = this.getAttribute("id"); //档期ID
		$(".rob .times li").filter(".active").removeClass('active').end().eq(index).addClass('active');
		$(".rob .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');

		g.getPresentStartTime(timeId); //默认当前档期时间

		if(index == '0') {
			//获取10点档数据
			g.getSendContenData(timeId, "sendCont1", time);
		} else if(index == '1') {
			//获取16点档数据
			g.getSendContenData(timeId, "sendCont2", time);
		} else if(index == '2') {
			//获取21点档数据
			g.getSendContenData(timeId, "sendCont3", time);
		}
	});

	//免费送btn
	mui(document).on('tap', '.sendId .purchase', function() {
		//orderistime 活动状态 0 未开始 1 正在进行  2 活动已结束
		var orderistime = this.getAttribute('orderistime');
		var goodsid = $(this).parent().attr("orderid");
		var discounts_id = $(this).parent().attr("discounts_id");
		if(orderistime == '0') {
			mui.toast("本档活动还未开始，敬请期待");

		} else if(orderistime == '2') {
			mui.toast("本档活动已结束");

		} else if(orderistime == '1') {
			/* $(".mask").show();
       		 $(".join").show();*/
			//弹出中奖
			g.addSendRealize(goodsid,discounts_id);
			
		}

		return false;
	})

	//免费抢btn
	mui(document).on('tap', '.grabId .purchase', function() {
		//orderistime 活动状态 0 未开始 1 正在进行  2 活动已结束
		var orderistime = this.getAttribute('orderistime');
		var goodsid = $(this).parent().attr("orderid");
		var discounts_id = $(this).parent().attr("discounts_id");
		
		if(orderistime == '0') {
			mui.toast("本档活动还未开始，敬请期待");

		} else if(orderistime == '1') {
			/* $(".mask").show();
       		 $(".join").show();*/
			//弹出中奖
			g.addGrabRealize(goodsid,discounts_id);
		}

		return false;
	})

	//免费抢档期
	mui(document).on('tap', '.mui-table-view-cell span', function() {
		var index = $(this).index();
		$(".mui-navigate-right span").filter(".active").removeClass('active').end().eq(index).addClass('active');
		$(".present .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');

		var time = this.getAttribute("timeid"); //档期
		var timeId = this.getAttribute("id"); //档期ID

		g.getPresentStartTime(timeId); //默认当前档期时间  

		if(index == '0') {
			//获取10点档数据
			g.getGrabContenData(timeId, "gradCont1", time);
		} else if(index == '1') {
			//获取16点档数据
			g.getGrabContenData(timeId, "gradCont2", time);
		} else if(index == '2') {
			//获取21点档数据
			g.getGrabContenData(timeId, "gradCont3", time);
		}

	});

	mui(document).on('tap', '#add', function() {
		//$(".mui-collapse-content").slideToggle();
		mui.toast("目前只开放三个档期");
	});

	//关闭.join窗
	mui(document).on('tap', ".join .error span", function() {
		$(".mask").hide();
		$(".join").hide();
	})

	mui(document).on('tap', ".mask", function() {
		$(".mask").hide();
		$(".join").hide();
	})

	//免费送
	mui(document).on('tap', '.purId', function() {
		setLocation.openWindow("detail.html");
	});

	//中奖特效
	$(".chest-close").click(function() {
		$(this).addClass("shake");
		var that = this;
		this.addEventListener("webkitAnimationEnd", function() {
			$(that).closest(".open-has").addClass("opened");
			setTimeout(function() {
				$(that).removeClass("show");
				$(that).closest(".mod-chest").find(".chest-open").addClass("show");
				setTimeout(function() {
					$(".chest-open").addClass("blur");
				}, 500)
			}, 200)
		}, false);
	})

	mui(document).on('tap', '.chest-btn', function() {
		$("#openBody").addClass("on-open-body");
		$(".chest-close").removeClass("shake");
		$(".chest-close").closest(".open-has").removeClass("opened");
		$(".chest-close").removeClass("shake");
		$(".chest-close").addClass("show");
		$(".chest-close").closest(".mod-chest").find(".chest-open").removeClass("show");
		$(".chest-open").removeClass("blur");
	})

})