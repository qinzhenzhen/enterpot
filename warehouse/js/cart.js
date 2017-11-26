var _cart_sum = 0; //总合计
var _cart_sum_present = 0; //当前合计
var _cart_quantity = 0; //总数量
var _cart_quantity_present = 0; //当前数量
var _cart_data; //当前数据
var _cart_data_present = new Array(); //保存选中单品ID;

$(function() {
	if(!jQuery) {
		console.log("请加载jquery.js文件");
		return;
	}

	var urlList = {
		"getCartData": "http://118.31.45.231/api.php/Home/Shopcart/index" //获取购物车列表
	}

	//cart.addCartList();
	cart.getCartData(urlList.getCartData);

	//全选、反选
	$(document).on('click', '#allCheckbox', function() {
		if($(this).get(0).checked) {
			console.log("全选");
			//全选
			$(".checkbox").each(function() {
				$(this).prop("checked", true);
				_cart_sum_present = _cart_sum;
				_cart_quantity_present = _cart_quantity;
			})
		} else {
			console.log("反选");
			//反选
			$(".checkbox").each(function() {
				$(this).removeAttr("checked");
				_cart_sum_present = 0;
				_cart_quantity_present = 0;
			})
		}

		//合计
		$("#cartSum").html(_cart_sum_present);
		//结算数量
		$("#submitSum").html(_cart_quantity_present);
	});

	//勾选
	$(document).on('click', '.checkbox', function() {
		allChk();
	});
	
	//结算 " .submit_accountId"
	$('.submit_accountId').on('click', function() {
		//window.location.href = "notarize_order.html";
		if(_cart_quantity_present > 0){
			setLocation.openWindow("notarize_order.html");
		}else{
			mui.alert('请勾选要购买的单品', '', function() {
					console.log("请勾选要购买的单品");
				});
		}
		
	});

})

var cart = {
	getCartData: function(url) {
		var user = JSON.parse(localStorage.getItem("user"));
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"loginName": user.id
			},
			success: function(data) {
				console.log(data);
				if(data.shopinfo.length > 0) {
					cart.addCartList(data.shopinfo);
				} else {
					console.log("收货地址列表");
				}

			}
		});
	},
	addCartList: function(data) {
		var html = "",
			id = "1", //产品id编号
			brandName = "ZARA", //品牌名称
			//brandLogo = "", //品牌LOGO
			goodname = "ZARA 2017秋冬新品全场免运费 浏览时下流行趋势，购购买1000件", //产品名称
			goods_price = 180, //价格
			description = "<span>XXL</span><span>绿色（3个仓库发货）</span>", //商品描述
			marketPrice = 500, //市场价
			quantity = 10, //数量
			goods_other_img1 = "../images/cart/image1.png"; //附图一
			_cart_quantity = data.length;
		for(var i = 0; i < _cart_quantity; i++) {
			_cart_sum += quantity * goods_price;
			id = data[i].id;
			brandName = data[i].brandname;
			goodname = data[i].goodname;
			goods_price = data[i].goods_price;
			description = "<span>"+data[i].spec1+"</span>/&nbsp;&nbsp;<span>"+data[i].spec2+"</span>";
			marketPrice = data[i].marketprice;
			quantity = data[i].num;
			goods_other_img1 = imgUrl+data[i].goods_other_img1;

			html += "<div class=\"list\"><div class=\"list-head\"><div class=\"mui-input-row mui-checkbox mui-left\"><label>" + brandName + "</label><i class=\"list-head-icon\"></i></div></div>";
			html += "<ul class=\"mui-table-view up-table-wiew\"><li class=\"my-table-view-cell mui-media\" ><a href=\"javascript:;\"><div class=\"row\"><div class=\"mui-input-row mui-checkbox mui-left up-checkbox\" goods_price = " + goods_price + " quantity = " + quantity + " orderId=" + id + "><input class=\"checkbox\" name=\"checkbox1\" type=\"checkbox\" checked ></div> ";
			html += "<div class=\"content\"><img class=\"mui-media-object mui-pull-left\" src=" + goods_other_img1 + "><div class=\"mui-media-body\"><h1 class=\"title mui-ellipsis-2\">" + goodname + "</h1><p class=\"mui-ellipsis style\">" + description + "</p><div class=\"price-group\"><h1 class=\"price\"><i class=\"price-icon\">￥</i>" + goods_price + "<span class=\"decoration\">原价：" + marketPrice + "</span><p class=\"amount\">x<span>" + quantity + "</span></p></h1></div></div></div></div></a></li></ul></div>";
		}
		$("#cartList").html(html);
		_cart_sum_present = _cart_sum;
		//合计
		$("#cartSum").html(_cart_sum_present);
		_cart_quantity_present = _cart_quantity;
		//结算数量
		$("#submitSum").html(_cart_quantity_present);
	}
}

function allChk() {
	var chknum = $("#cartList :checkbox").size();
	var goods_price = 0,
		quantity = 0,
		id = 0;
	_cart_quantity_present = 0;
	_cart_sum_present = 0;
	_cart_data_present = [];
	$("#cartList :checkbox").each(function() {
		if($(this).prop("checked") == true) {
			goods_price = $(this).parent().attr("goods_price");
			quantity = $(this).parent().attr("quantity");
			id = $(this).parent().attr("orderid");
			_cart_sum_present += (+goods_price) * (+quantity);
			console.log(_cart_sum_present);
			_cart_data_present.push(id);
			_cart_quantity_present++;
		}
	});
	if(chknum == _cart_quantity_present) {
		$("#allCheckbox").prop("checked", true);
	} else {
		$("#allCheckbox").prop("checked", false);
	}

	//合计
	$("#cartSum").html(_cart_sum_present);
	//结算数量
	$("#submitSum").html(_cart_quantity_present);
	console.log(_cart_data_present);
}