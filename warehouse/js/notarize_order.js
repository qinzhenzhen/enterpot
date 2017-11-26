
var singleOrder = {};


$(function(){
	var urlList = {
		"notarizeOrderData" : "http://118.31.45.231/api.php/Home/Order/getorderinfo"
	}
		
	notarizeOrder.getNotarizeOrderData(urlList.notarizeOrderData);
	
		//支付订单 ".qzzOrderId"
	$('.qzzOrderId').on('click', function() {
	
		var loginName = JSON.parse(localStorage.getItem("user")).id, //localStorage.getItem("loginName") ,
			orderno = localStorage.getItem("orderno") ;
			$("#cartList .list").each(function(index){
				console.log(index+" --- "+ $(this).find("input.mui-input-clear").val());
				singleOrder.order[index].remarks =  $(this).find("input.mui-input-clear").val() || "";
			})
			
			singleOrder.loginName = loginName;
			singleOrder.orderno = orderno;
			singleOrder.addressid = $('#addressName').attr("addressid");
			localStorage.setItem("singleOrder",JSON.stringify(singleOrder));
			
			setLocation.openWindow("qzzOrder.html");
	});
})

var notarizeOrder = {

	getNotarizeOrderData : function(url){
		var orderno = localStorage.getItem("orderno") ;
		var loginName = JSON.parse(localStorage.getItem("user")).id;//localStorage.getItem("loginName") ;
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"loginName": loginName,
				"orderno":orderno
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					notarizeOrder.addNotarizeOrderDom(data.OrdersInfo); 
					notarizeOrder.getFreight(data.shippingInfo);//计算运费
				} else {
					console.log("getNotarizeOrderData");
				}

			}
		});
	},
	addNotarizeOrderDom : function(data){
		var html = "",
			id = "1", //产品id编号
			brandName = "ZARA", //品牌名称
			goodname = "ZARA 2017秋冬新品全场免运费 浏览时下流行趋势，购购买1000件", //产品名称
			goods_price = 180, //价格
			description = "<span>XXL</span><span>绿色（3个仓库发货）</span>", //商品描述
			marketPrice = 500, //市场价
			quantity = 10, //数量
			goods_other_img1 = "../images/cart/image1.png", //附图一
			getSum = 0,//合计
			freight = 20 ,//运费
			orderSum = 0;//实付
			
			singleOrder.order = [];
			var shopDeal = {};
		for(var i = 0; i<data.length; i++){
			
			id = data[i].id;
			brandName = data[i].brandname;
			goodname = data[i].goodname;
			goods_price = data[i].goods_price;
			description = "<span>"+data[i].spec1+"</span>/&nbsp;&nbsp;<span>"+data[i].spec1+"</span>";
			marketPrice = data[i].marketprice;
			quantity = data[i].num;
			goods_other_img1 = imgUrl+data[i].goods_other_img1; 
			getSum += quantity * goods_price;
			
			shopDeal.id = id;
			shopDeal.goods_price = goods_price;
			shopDeal.quantity = quantity;
			shopDeal.remarks = "";
			singleOrder.order.push(shopDeal);
			
			html+="<div class=\"list\"><div class=\"list-head display_flex\"><div class=\"flex_1\"><h1 class=\"title\">"+brandName+"</h1></div></div>";
			html+="<ul class=\"mui-table-view up-table-wiew\"><li class=\"my-table-view-cell mui-media notarize_table-view-cell\"><a href=\"javascript:;\"><div class=\"row display_flex\">";
			html+="<div class=\"content flex_4\"><img class=\"mui-media-object mui-pull-left\" src="+goods_other_img1+"><div class=\"mui-media-body\"><h1 class=\"title mui-ellipsis-2\">"+goodname+"</h1>";
			html+="<p class=\"mui-ellipsis style\">"+description+"</p></div></div><div class=\"flex_1 price-group\"><h1 class=\"price\"><i class=\"price-icon\">￥</i>"+goods_price+"</h1><p class=\"sum\">x<span>"+quantity+"</span></p></div></div></a></li>";						
			html+="<li class=\"mui-table-view-cell\"><a><form class=\"mui-input-group up-input-group\"><div class=\"mui-input-row\"><label>备注</label><input type=\"text\" class=\"mui-input-clear\" placeholder=\"这里可填写订单要求哦O(n_n)O\"></div></form></a></li></ul></div>";
			
		}
		orderSum = getSum + freight;
		$("#cartList").html(html);
		$("#sum").html(getSum);//合计
		$("#freight").html(freight);//运费
		$("#orderSum").html(orderSum);//实付款
		
		singleOrder.freight = freight;
		singleOrder.orderSum = orderSum;
	},
	/*
	 *计算运费
	 * */
	getFreight : function(data){
		console.log(data);
		var freight = 0;
		var areaid =1;// $("#address").attr("areaid");
		var order = "";
		for(var i=0;i<data.length;i++){
			order = toString([i].area_id); 
			console.log(order.indexOf("1"));
		}
	}
}
