/*
 *URL 管理
 * */

//地址接口
var _address = {
	//省份
	"getProvince": "http://118.31.45.231:8084/api.php/Home/Address/getProvince",//"http://118.31.45.231/api.php/Home/Address/getProvince",
	//市
	"getCity": "http://118.31.45.231:8084/api.php/Home/Address/getCity",//"http://118.31.45.231/api.php/Home/Address/getCity",
	//区
	"getCounty": "http://118.31.45.231:8084/api.php/Home/Address/getCounty",//"http://118.31.45.231/api.php/Home/Address/getCounty",
	//添加地址
	"addAddressInfo": "http://118.31.45.231:8084/api.php/Home/Address/addAddressInfo",//"http://118.31.45.231/api.php/Home/Address/addAddressInfo",
	//修改地址
	"updataAddressInfo": "http://118.31.45.231:8084/api.php/Home/Address/editAddressInfo",//"http://118.31.45.231/api.php/Home/Address/editAddressInfo",
	//获取地址列表
	"getAddressList": "http://118.31.45.231:8084/api.php/Home/Address/index",//"http://118.31.45.231/api.php/Home/Address/index",
	//删除
	"deleteAddress": "http://118.31.45.231:8084/api.php/Home/Address/deleteaddress",//"http://118.31.45.231/api.php/Home/Address/deleteaddress",
	//获取修改地址
	"getUndataAddress": "http://118.31.45.231:8084/api.php/Home/Address/geteditaddressInfo"//"http://118.31.45.231/api.php/Home/Address/geteditaddressInfo"

}

//用户接口
var _user = {
	//获取用户验证码
	"getUserCode": "http://118.31.45.231:8084/api.php/Home/Getmsgcode/index",
	//用户登录
	"setUserInfo:": "http://118.31.45.231:8084/api.php/Home/Login/index"
}

//订单接口
var order = {

}

//商品接口
var commodity = {

}