$(function(){

	var obj = document.getElementsByClassName('onClick')[0];
	//点击事件
	mui('.submit-group').on('tap','.service-btn',function(){
		var typeId = this.getAttribute('typeId');
		if(obj){
			obj.classList.remove('onClick');			
		}
		obj = this;
		obj.classList.add('onClick');
		
		if(typeId < 1){
			//付款
			var btnArray = ['我再想想', '去意已决'];
			mui.confirm('您确定要取消此订单吗？', '取消订单提醒', btnArray, function(e) {
				if(e.index == 1) {
					console.log("去意已决");
				} else {
					console.log("我再想想");
				}
			})
		}else{
			//取消订单
			console.log("取消订单");
		}
	})
})


