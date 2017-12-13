/*
 *添加用户地址
 */
var userInfo = JSON.parse(localStorage.getItem("userInfo"));

//地址功能
var address = {
	/*
	 *getAddressList 获取地址列表
	 */
	getAddressList: function() {
		var loginName = userInfo.id; //localStorage.getItem("loginName") ;
		$.ajax({
			type: "POST",
			url: _address.getAddressList,
			dataType: 'json',
			data: {
				"loginName": loginName
			},
			success: function(data) {
				console.log(data);
				$("#addAddressList").html("");
				if(data.code == "000008") {
					if(data.addressInfo.length > 0) {
						address.addressListDom(data.addressInfo);
					} else {
						var btnArray = ['否', '是'];
						mui.confirm('您没有收货地址，是否前往添加', '', btnArray, function(e) {
							if(e.index == 1) {
								setLocation.openWindow("qzzedit.html");
							} else {
								console.log("添加收货地址");
							}
						})
					}
				} else {
					mui.toast(data.msg);
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
			html += "<div class=\"up\"><div class=\"person iconfont icon-yonghuming\"></div>";
			html += "<p class=\"name\">" + dataList[i].username + "</p> " + test;
			html += "<div class=\"phone\">" + dataList[i].userphone + "</div></div>";
			html += "<div class=\"down\">" + address + "</div></div>";
			html += "<div class=\"bottom\" addressid = " + dataList[i].addressid + "><p class=\"delete deleteAddress\">删除</p><a class=\"edit upAddress\">编辑</a></div></div>";
		}

		$("#addAddressList").html(html);
	},
	/*
	 * getProvinceData 获取省级数据
	 * id 默认 1 全国省份 d:修改地址ID ["2", "52", "500"]
	 */
	getProvinceData: function(id, d) {
		var d = d || new Array();
		$.ajax({
			type: "POST",
			url: _address.getProvince,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				console.log(data);
				if(data.provinceInfo.length > 0) {

					if(d.length > 0) {
						//修改地址默认值
						address.addAddressDom(data.provinceInfo, "province", d[0]);
						//获取市级默认值
						address.getCityData(d[0], d);
					} else {
						address.addAddressDom(data.provinceInfo, "province");
					}

				} else {
					mui.toast(data.msg);
				}
			}
		});

	},
	/*
	 * getCityData 获取市级数据
	 * id 默认 1 全国省份 d:修改地址ID ["2", "52", "500"]
	 */
	getCityData: function(id, d) {
		var d = d || new Array();

		$.ajax({
			type: "POST",
			url: _address.getCity,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				console.log(data);
				if(data.cityInfo.length > 0) {
					if(d.length > 1) {
						//修改地址默认值
						address.addAddressDom(data.cityInfo, "city", d[1]);
						//获取县级默认值
						address.getCountyData(d[1], d);
					} else {

						address.addAddressDom(data.cityInfo, "city");
					}

				} else {
					mui.toast(data.msg);
				}
			}
		});
	},
	/*
	 * getCountyData获取县级数据
	 * id 默认 1 全国省份 d:修改地址ID ["2", "52", "500"]
	 */
	getCountyData: function(id, d) {
		var d = d || new Array();
		$.ajax({
			type: "POST",
			url: _address.getCounty,
			dataType: 'json',
			data: {
				"parent_id": id
			},
			success: function(data) {
				console.log(data);
				if(data.countyInfo.length > 0) {
					if(d.length > 2) {
						//修改地址默认值
						address.addAddressDom(data.countyInfo, "area", d[2]);

					} else {
						address.addAddressDom(data.countyInfo, "area");
					}

				} else {
					mui.toast(data.msg);
				}
			}
		});
	},
	/*
	 *addAddressDom 添加到dom
	 */
	addAddressDom: function(data, id, adId) {
		var html = "<option region_id='0'>请选择</option>";
		var address = adId || "";

		for(var i in data) {
			if(address == data[i].region_id) {
				html += "<option region_id=" + data[i].region_id + " selected>" + data[i].region_name + "</option>";
			} else {
				html += "<option region_id=" + data[i].region_id + ">" + data[i].region_name + "</option>"
			}

		}
		$("#" + id).html(html);
	},
	/*
	 *addAddress 添加收货地址
	 * type : true :保存并使用  false:保存 
	 */
	addAddress: function(type) {
		var loginName = userInfo.id,
			userName = $("#userName").val(),
			userPhone = $("#userPhone").val(),
			provinceid = $("#province").find("option:selected").attr("region_id"),
			cityid = $("#city").find("option:selected").attr("region_id"),
			countyid = $("#area").find("option:selected").attr("region_id"),
			userAdress = $("#userAdress").val(),
			isDefault = $("#isDefault").is(':checked') ? 1 : 0,
			isType = type, //判断是保存 还是 使用  true :保存并使用  false:保存 
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
				url: _address.addAddressInfo,
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
					console.log(data);
					if(data.code == "000008") {

						mui.toast(data.msg);
						if(isType) {
							//localStorage.setItem("addressid", data.addressid);
							//setLocation.openWindow("notarize_order.html");
							setTimeout(function() {
								setLocation.openWindow("qzzaddress.html");
							}, 2000)

						} else {
							setTimeout(function() {
								setLocation.openWindow("qzzaddress.html");
							}, 2000)
						}

					} else {
						mui.toast(data.msg);
					}
				}
			});
		} else {
			mui.toast(text);
		}

	},
	/*
	 *deleteAddress删除地址
	 * id : 地址ID
	 * */
	deleteAddress: function(id) {
		var loginName = userInfo.id;
		$.ajax({
			type: "POST",
			url: _address.deleteAddress,
			dataType: 'json',
			data: {
				"addressid": id
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					address.getAddressList();
				} else {
					mui.toast(data.msg);
				}

			}
		});
	},
	/*
	 *getUpdataAddress 获取修改地址
	 * id : 地址ID
	 * */
	getUpdataAddress: function(id) {
		var loginName = userInfo.id;
		var addressid = id;
		$.ajax({
			type: "POST",
			url: _address.getUndataAddress,
			dataType: 'json',
			data: {
				"addressid": addressid,
				"loginName": loginName
			},
			success: function(data) {
				console.log(data);
				if(data.code == "000008") {
					//setLocation.openWindow("qzzaddress.html");
					var upAddress = data.addressInfo;
					upAddress.areaidpath = data.addressInfo.areaidpath.split("-");
					$("#userName").val(upAddress.username);
					$("#userPhone").val(upAddress.userphone);
					$("#userAdress").val(upAddress.useradress);
					if(upAddress.isdefault == 1) {
						$("#isDefault").attr('checked', true);
					}

					//获取省份
					address.getProvinceData(1, upAddress.areaidpath);

				} else {
					mui.toast(data.msg);
				}
			}
		});

	},
	/*
	 *updataAddress 保存修改地址
	 * id : 地址ID type : true :保存并使用  false:保存 
	 */
	updataAddress: function(id, type) {
		var loginName = userInfo.id,
			addressid = id,
			userName = $("#userName").val(),
			userPhone = $("#userPhone").val(),
			provinceid = $("#province").find("option:selected").attr("region_id"),
			cityid = $("#city").find("option:selected").attr("region_id"),
			countyid = $("#area").find("option:selected").attr("region_id"),
			userAdress = $("#userAdress").val(),
			isDefault = $("#isDefault").is(':checked') ? 1 : 0,
			isType = type, //判断是保存 还是 使用  true :保存并使用  false:保存 
			text = "";
		console.log(isDefault + " : " + userName + " : " + userPhone + " : " + provinceid + " : " + cityid + " : " + countyid + " : " + userAdress + " : " + addressid);
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
				url: _address.updataAddressInfo,
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
					console.log(data);
					if(data.code == "000008") {
						mui.toast(data.msg);
						if(isType) {
							//localStorage.setItem("addressid", data.addressid);
							//setLocation.openWindow("notarize_order.html");
							setTimeout(function() {
								setLocation.openWindow("qzzaddress.html");
							}, 2000)

						} else {
							setTimeout(function() {
								setLocation.openWindow("qzzaddress.html");
							}, 2000)
						}

					} else {
						mui.toast(data.msg);
					}
				}
			});
		} else {
			mui.toast(text);
		}
	},
}