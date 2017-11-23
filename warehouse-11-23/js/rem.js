/*
* @Author: asus
* @Date:   2017-03-16 10:29:54
* @Last Modified by:   asus
* @Last Modified time: 2017-03-16 11:39:20
*/
//当页面加载之后
window.onload=function () {
	//常量const
	const designWidth=750;
	const fontSize=100;
	function resizeFont(){
		//变量 
		var CW = document.documentElement.clientWidth;

		var radio = CW/designWidth;//比例

		var newFontSize= fontSize*radio;

		document.querySelector("html").style.fontSize= newFontSize+"px";
	}


//执行resizeFont
resizeFont();
//窗口大小改变时执行resizeFont
window.onresize =resizeFont;
}