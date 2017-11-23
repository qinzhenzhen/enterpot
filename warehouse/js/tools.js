//工具类

var tools = {
	setPhone : function(str){
		var text = "";
		if(str == "" || str == undefined ){
			text = "输入的手机号不正确";
			return text;
		}		
		var phone = str.substr(3,4);
		var lphone = str.replace(phone,"***");
		return lphone;
	},
	verifyPhone : function(str){
		//验证手机号
		var re = /^1[3|4|5|8][0-9]\d{4,8}$/; 
		if(re.test(str)){
			return true;
		}else{
			return false;
		}
	},
	getUrlParam :function(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!= null) {
        return unescape(r[2]);
     }else{
        return null;
     }
	} 
}
