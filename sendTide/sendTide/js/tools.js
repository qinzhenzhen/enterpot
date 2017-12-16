//工具类

var tools = {
	/*
	 * setPhone :给手机号加*
	 * str:15316311635  return 153***1635
	 * */
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
	/*
	 *replaceStr:去掉字符串中所有的 &nbsp;
	 * */
	replaceStr : function(str){

		if(str == "" || str == undefined ) return false;

		var text = str.replace(/&nbsp;/gi,"");
		return text;
	},
	/*
	 *verifyPhone：验证手机号
	 * */
	verifyPhone : function(str){
		if(isNaN(str)){
			return false;
		}
		var re = /^1[3|4|5|8][0-9]\d{4,8}$/; 
		if(re.test(str)){
			return true;
		}else{
			return false;
		}
	},
	/*
	 *getUrlParam:获取url中的参数值
	 * */
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
