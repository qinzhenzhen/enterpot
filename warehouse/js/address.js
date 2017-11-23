$(function() {

	var urlList = {
		"getProvince": "http://118.31.45.231/api.php/Home/Address/getProvince", //省份
		"getCity": "http://118.31.45.231/api.php/Home/Address/getCity", //市
		"getCounty": "http://118.31.45.231/api.php/Home/Address/getCounty", //区
		"addAddressInfo": "http://118.31.45.231/api.php/Home/Address/addAddressInfo", //添加地址
		"updataAddressInfo": "http://118.31.45.231/api.php/Home/Address/editAddressInfo", //修改地址
		"getAddressList": "http://118.31.45.231/api.php/Home/Address/index", //获取地址列表
		"deleteAddress": "" //删除
	};

	/*
	 *书签 ：bookmark ：0 我的 - > 地址;  1 购物车-> 地址 ;  
	 **/
	var bookmark = localStorage.getItem("bookmark");
	

	if($("#province")[0]) {
		//获取省级数据
		addressData.getProvinceData(urlList.getProvince, 1); //获取省份

		$("#province").change(function() {
			var cityId = $(this).find("option:selected").attr("region_id");
			addressData.getCityData(urlList.getCity, cityId); //获取市级
		});

		$("#city").change(function() {
			var countyId = $(this).find("option:selected").attr("region_id");
			addressData.getCountyData(urlList.getCounty, countyId); //获取市级
		});

	}

	//添加地址
	if($("#addAddress")[0]) {
		$("#addAddress").on("click", function() {
			addressData.addAddress(urlList.addAddressInfo);
		});
	};

	if($(".addAddress")[0]) {
		$(".addAddress").on("click", function() {
			addressData.addAddress(urlList.addAddressInfo);
		});
	};
	//获取地址列表
	if($("#addAddressList")[0] || $("#address")[0])
	addressData.getAddressList(urlList.getAddressList);

	//打开修改地址

	$(document).on("click", ".upAddress", function(event) {
		console.log($(this).parent().attr("addressid"));
		event.stopPropagation(); 
		alert("正在建设中。。。");
		return;
		var addressid = $(this).parent().attr("addressid");
		localStorage.setItem("addressid", addressid);
		mui.openWindow({
			url: "qzzedit.html",
			id: "qzzedit.html"
		})
		
	})

	if(!!localStorage.getItem("addressid")) {
		var addressid = localStorage.getItem("addressid");
		console.log(addressid);
	};

	//删除地址

	$(document).on("click", ".deleteAddress", function(event) {
			event.stopPropagation(); 
			var addressid = $(this).parent().attr("addressid");
			var btnArray = ['否', '是'];
			mui.confirm('是否删除收货地址', '', btnArray, function(e) {
				if(e.index == 1) {
					console.log($(this));
					addressData.deleteAddress(urlList.deleteAddress, $(this), addressid);
				} else {
					console.log("不删除收货地址");
				}
			})
			//console.log($(this).parent().attr("addressid")); 
		})
	

	//选择发货地址
	$(document).on("click",".parentId",function(){
		if(bookmark == "1"){
			var addressid = $(this).parent().find(".bottom").attr("addressid");
			localStorage.setItem("addressid",addressid);
			setLocation.openWindow("notarize_order.html");
		}
	})

	
})

var addressData = {
	/*
	 * 获取省级数据
	 */
	getProvinceData: function(url, id) {
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				//addAddress(data);
				if(data.provinceInfo.length > 0) {
					addressData.addAddressDom(data.provinceInfo, "province");
				} else {
					console.log(data.msg);
				}
			}
		});

	},
	/*
	 * 获取市级数据
	 */
	getCityData: function(url, id) {
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				console.log(data);
				if(data.cityInfo.length > 0) {
					addressData.addAddressDom(data.cityInfo, "city");
				} else {
					console.log(data.msg);
				}
			}
		});
	},
	/*
	 * 获取县级数据
	 */
	getCountyData: function(url, id) {
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				console.log(data);
				if(data.countyInfo.length > 0) {
					addressData.addAddressDom(data.countyInfo, "area");
				} else {
					console.log(data.msg);
				}
			}
		});
	},
	/*
	 *添加到dom
	 */
	addAddressDom: function(data, id) {
		var html = "<option region_id='0'>请选择</option>";
		for(var i in data) {
			html += "<option region_id=" + data[i].region_id + ">" + data[i].region_name + "</option>"
		}
		$("#" + id).html(html);
	},
	/*
	 *获取默认地址
	 */
	getDefaultAddressData: function(data) {

		var name = "";
		var address = "";
		var phoneText = "";
		var addressId = localStorage.getItem("addressid");

		for(var i = 0; i < data.length; i++) {
			
			if(data[i].addressid == addressId) {
				name = data[i].username;
				phoneText = tools.setPhone(data[i].userphone);
				address = data[i].prvoince + data[i].city + data[i].county + data[i].useradress;

				document.getElementById('addressName').innerHTML = name;
				document.getElementById('addressPhone').innerHTML = phoneText;
				document.getElementById('addressText').innerHTML = address;

				$('#address').attr("areaid", data[i].areaid);
				$('#addressName').attr("addressid", data[i].addressid);
				
				if(data[i].isdefault == 1){
					$(".address-icon").removeClass("tache");
				}else{
					$(".address-icon").addClass("tache");
				}
				return ;
			}else if(data[i].isdefault == 1){
				
				name = data[i].username;
				phoneText = tools.setPhone(data[i].userphone);
				address = data[i].prvoince + data[i].city + data[i].county + data[i].useradress;

				document.getElementById('addressName').innerHTML = name;
				document.getElementById('addressPhone').innerHTML = phoneText;
				document.getElementById('addressText').innerHTML = address;

				$('#address').attr("areaid", data[i].areaid);
				$('#addressName').attr("addressid", data[i].addressid);
				$(".address-icon").removeClass("tache");
				
			}else{
				name = data[0].username;
				phoneText = tools.setPhone(data[0].userphone);
				address = data[0].prvoince + data[0].city + data[0].county + data[0].useradress;

				document.getElementById('addressName').innerHTML = name;
				document.getElementById('addressPhone').innerHTML = phoneText;
				document.getElementById('addressText').innerHTML = address;

				$('#address').attr("areaid", data[0].areaid);
				$('#addressName').attr("addressid", data[0].addressid);
				$(".address-icon").addClass("tache");
	
			}
		}

	},
	/*
	 *添加地址
	 * 测试：名17317317668 
	 */
	addAddress: function(url) {
		var loginName = localStorage.getItem("loginName"),
			userName = $("#userName").val(),
			userPhone = $("#userPhone").val(),
			provinceid = $("#province").find("option:selected").attr("region_id"),
			cityid = $("#city").find("option:selected").attr("region_id"),
			countyid = $("#area").find("option:selected").attr("region_id"),
			userAdress = $("#userAdress").val(),
			isDefault = $("#isDefault").is(':checked') ? 1 : 0,
			text = "";
		console.log(isDefault + " : " + userName + " : " + userPhone + " : " + provinceid + " : " + cityid + " : " + countyid + " : " + userAdress);
		if(userName == null || userName == undefined || userName == "") {
			text = "收件人不能为空";
		} else if(userPhone == null || userPhone == undefined || userPhone == "" || !tools.verifyPhone(userPhone)) {
			if(!tools.verifyPhone(userPhone)) {
				text = "联系方式不正确";
			} else {
				text = "联系方式不能为空";
			}

		} else if(provinceid == null || provinceid == undefined || provinceid == "") {
			text = "请选择地址";
		} else if(cityid == null || cityid == undefined || cityid == "") {
			text = "请选择地址";
		} else if(countyid == null || countyid == undefined || countyid == "") {
			text = "请选择地址";
		} else if(userAdress == null || userAdress == undefined || userAdress == "") {
			text = "请填写详细地址";
		}

		if(text == "") {
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				data: {
					"loginName": loginName,
					"userName": userName,
					"userPhone": userPhone,
					"provinceid": provinceid,
					"cityid": cityid,
					"countyid": countyid,
					"userAdress": userAdress,
					"isDefault": isDefault
				},
				success: function(data) {
					//addAddress(data);
					if(data.code == "000008") {
						setLocation.openWindow("qzzaddress.html");
					} else {
						alert(data.msg);
					}
				}
			});
		} else {
			alert(text);
		}

	},
	/*
	 *修改地址
	 */
	updataAddress: function(url, id) {
		var loginName = localStorage.getItem("loginName"),
			addressid = id,
			userName = $("#userName").val(),
			userPhone = $("#userPhone").val(),
			provinceid = $("#province").find("option:selected").attr("region_id"),
			cityid = $("#city").find("option:selected").attr("region_id"),
			countyid = $("#area").find("option:selected").attr("region_id"),
			userAdress = $("#userAdress").val(),
			isDefault = $("#isDefault").is(':checked') ? 1 : 0,
			text = "";
		console.log(isDefault + " : " + userName + " : " + userPhone + " : " + provinceid + " : " + cityid + " : " + countyid + " : " + userAdress);
		if(userName == null || userName == undefined || userName == "") {
			text = "收件人不能为空";
		} else if(userPhone == null || userPhone == undefined || userPhone == "" || !tools.verifyPhone(userPhone)) {
			if(!tools.verifyPhone(userPhone)) {
				text = "联系方式不正确";
			} else {
				text = "联系方式不能为空";
			}

		} else if(provinceid == null || provinceid == undefined || provinceid == "") {
			text = "请选择地址";
		} else if(cityid == null || cityid == undefined || cityid == "") {
			text = "请选择地址";
		} else if(countyid == null || countyid == undefined || countyid == "") {
			text = "请选择地址";
		} else if(userAdress == null || userAdress == undefined || userAdress == "") {
			text = "请填写详细地址";
		}

		if(text == "") {
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				data: {
					"addressid": addressid,
					"loginName": loginName,
					"userName": userName,
					"userPhone": userPhone,
					"provinceid": provinceid,
					"cityid": cityid,
					"countyid": countyid,
					"userAdress": userAdress,
					"isDefault": isDefault
				},
				success: function(data) {
					//addAddress(data);
					if(data.code == "000008") {
						setLocation.openWindow("qzzaddress.html");
					} else {
						alert(data.msg);
					}
				}
			});
		} else {
			alert(text);
		}
	},
	/*
	 *获取地址列表
	 */
	getAddressList: function(url) {
		var loginName = localStorage.getItem("loginName") ;
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"loginName": loginName
			},
			success: function(data) {
				console.log(data);
				if(data.addressInfo.length > 0) {
					if($("#addAddressList")[0]) {
						addressData.addressListDom(data.addressInfo);
					};

					if($("#addressName")[0]) {
						//获取默认地址

						addressData.getDefaultAddressData(data.addressInfo);
					};

				} else {
					console.log("收货地址列表");
					setLocation.openWindow("qzzedit.html");
				}

			}
		});
	},
	/*
	 *地址列表Dom
	 */
	addressListDom: function(dataList) {
		var html = "",
			test = "",
			address = "";
		for(var i in dataList) {
			if(dataList[i].isdefault > 0) {
				test = "<div class=\"default\">默认</div>";
			} else {
				test = "";
			}
			address = dataList[i].prvoince + dataList[i].city + dataList[i].county + dataList[i].useradress;

			html += "<div class=\"address\"><div class=\"top parentId\"> ";
			html += "<div class=\"up\"><img src=\"../images/icon_address_personal.png\" class=\"person\">";
			html += "<p class=\"name\">" + dataList[i].username + "</p> " + test;
			html += "<div class=\"phone\">" + dataList[i].userphone + "</div></div>";
			html += "<div class=\"down\">" + address + "</div></div>";
			html += "<div class=\"bottom\" addressid = " + dataList[i].addressid + "><p class=\"delete deleteAddress\">删除</p><a class=\"edit upAddress\">编辑</a></div></div>";
		}

		$("#addAddressList").html(html);
	},
	/*
	 *删除地址
	 * */
	deleteAddress: function(url, id) {
		var loginName = localStorage.getItem("loginName") ;
		return;
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			data: {
				"loginName": loginName,
				"addressid": id
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					addressData.getAddressList(urlList.getAddressList);
				} else {
					alert(data.msg);
				}

			}
		});
	}
}