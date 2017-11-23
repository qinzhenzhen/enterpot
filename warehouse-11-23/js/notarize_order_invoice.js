$(function(){
	//点击事件
	var obj = document.getElementsByClassName('no-invoice')[0];
	var obj1 = document.getElementsByClassName('no-personage')[0];
	mui(".invoice-cont-group").on('tap','.mui-btn',function(event){
		var typeId = this.getAttribute('typeId');
		if(typeId<2){
			if(obj){
				obj.classList.remove('no-invoice');
			}
			obj = this;
			this.classList.add('no-invoice');
		}else{
			if(obj1){
				obj1.classList.remove('no-personage');
			}
			obj1 = this;
			this.classList.add('no-personage');
		}		
		clickF(typeId);
	})
	
})

function clickF(typeId){
	
	switch(parseInt(typeId)){
		case 0:
			document.getElementById('invoiceTitle').classList.add('onClick');
			//console.log("不开发票");
			break;
		case 1:
			document.getElementById('invoiceTitle').classList.remove('onClick');
			//console.log('明细');
			break;
		case 2:
			var classObj = document.getElementsByClassName('company-message-group')[0];
			if(classObj.className.indexOf('onClick') < 0){
				classObj.classList.add('onClick');
			}
			//console.log('个人');
			break;
		default:
			document.getElementsByClassName('company-message-group')[0].classList.remove('onClick');
			//console.log('公司');
	}
	
}
