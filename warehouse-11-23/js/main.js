$(function() {
	//商品信息地址
	var imgUrl = "http://118.31.45.231:8081/";
	var shopUrl = "http://118.31.45.231/api.php/Home/Shopdetail/index";
	var joinUrl = "http://118.31.45.231/api.php/Home/Shopcart/doshopcart"; //加入购物车成功
	var doOrder = "http://118.31.45.231/api.php/Home/Order/do_order"; //添加到确认订单
	$(document).on('click', '.perfom .change', function() {
		var loginName = window.localStorage ? localStorage.getItem('loginName') : null;
		if(loginName == null) {
			if(!mui) {
				console.log("请引用mui.js文件");
				return;
			}
			mui.init();
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
			var goodsid = $(this).attr("gid");
			var index = $(this).index;
			$(".perfom .change").filter(".active").removeClass('active').end().eq(index).addClass('active');
			$(".mask").css("display", "block");
			$(".join").css("display", "block");
			//加入购物车/结算商品信息
			$.ajax({
					type: "post",
					url: shopUrl,
					data: {
						"goodsid": goodsid,
						"loginName": loginName
					}
				})
				.done(function(data) {
					var data = JSON.parse(data)
					console.log(data)
					var goodsinfo = data.goodsinfo;
					var specinfo = data.goodsspecinfo;
					var brandid = goodsinfo.brandid;
					var id = goodsinfo.id;
					//商品图片
					var img = "<img src='" + imgUrl + goodsinfo.goods_display_img + "' class='img' brandid='" + brandid + "' pid='" + id + " '>";
					$(".join .intro").append(img);
					//商品会员价格
					var price = goodsinfo.goods_price;
					$("#prices .count span").html("会员价&nbsp;:&nbsp;" + price);
					//商品市场价
					var marketprice = goodsinfo.marketprice;
					$("#prices .original .ori").html(marketprice);
					//库存
					var repertory = goodsinfo.once_shop_maxnum;
					$(".repertory").html("库存&nbsp;&nbsp;：&nbsp;&nbsp;" + repertory);
					//尺码  颜色
					var size = data.speca;
					var color = data.specb;
					for(var i = 0; i < size.length; i++) {
						var li = "<li>" + size[0] + "</li>";
						$(".size .kind").html(li);
					}
					$(".size .kind li").first().addClass("active");
					for(var i = 0; i < color.length; i++) {
						var li = "<li>" + color[0] + "</li>";
						$(".color .kind").html(li);
					}
					$(".color .kind li").first().addClass("active");

				})
		}
	})
	$(".error").click(function() {
		$(".mask").css("display", "none");
		$(".join").css("display", "none");
	})
	$(".size .kind li").each(function(index, element) {
		var i = index;
		$(this).on('click',
			function() {
				$(".size .kind li").removeClass("active");
				$(this).addClass("active");
			});
	})
	$(".color .kind li").each(function(index, element) {
		var i = index;
		$(this).on('click',
			function() {
				$(".color .kind li").removeClass("active");
				$(this).addClass("active");
			});
	})
	//结算
	$(document).on('click', '#purchase', function() {
		var quality = $(".quality .mui-input-numbox").val();
		var cstyle = $(".color .kind .active").html();
		var sstyle = $(".size .kind .active").html();
		var brandid = $(".intro .img").attr("brandid");
		var id = $(".intro .img").attr("pid");
		var goodsprice = $("#goodsprice").html();
		//setCookie("sstyle", sstyle);
		//setCookie("cstyle", cstyle);
		//window.location.href = "notarize_order.html?goodsid=" + goodsid + "quality=" + quality + "cstyle=" + cstyle + "sstyle=" + sstyle + "brandid=" + brandid + "id=" + id;
		$.ajax({
			type: "POST",
			url: doOrder,
			data: {
				loginName: loginName,
				goodsid: id,
				brandid: brandid,
				spec1: cstyle,
				spec2: sstyle,
				goodsprice: goodsprice,
				goodsnum: quality
			}
		}).done(function(data) {
			var data = JSON.parse(data)
			if(data.code == 000008 && !!data.orderno) {
				//alert("您的商品已成功加入购物车哦！");
				localStorage.setItem("orderno", data.orderno);
				mui.openWindow({
					url: "notarize_order.html",
					id: "notarize_order.html"
				})
			} else if(data.code == 000007) {
				alert("不好意思，加入购物车失败！");
			}
		});

	});
	//购物车
	$(document).on('click', '#shop', function() {
		var quality = $(".quality .mui-input-numbox").val();
		var cstyle = $(".color .kind .active").html();
		var sstyle = $(".size .kind .active").html();
		var brandid = $(".intro .img").attr("brandid");
		var id = $(".intro .img").attr("pid");
		var goodsprice = $("#goodsprice").html();
		$.ajax({
			type: "POST",
			url: joinUrl,
			data: {
				loginName: loginName,
				goodsid: id,
				brandid: brandid,
				spec1: cstyle,
				spec2: sstyle,
				goodsprice: goodsprice,
				goodsnum: quality
			}
		}).done(function(data) {
			var data = JSON.parse(data)
			if(data.code == 000008) {
				alert("您的商品已成功加入购物车哦！");
			} else if(data.code == 000007) {
				alert("不好意思，加入购物车失败！");
			}
		});
	});
})