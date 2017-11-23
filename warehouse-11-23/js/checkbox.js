$(function(){
	
	//全选、反选
	$(document).on('click','#allCheckbox',function(){
		if($(this).get(0).checked){
			console.log("全选");
			//全选
			$(".checkbox").each(function(){
				$(this).prop("checked",true);
			})
		}else{
			console.log("反选");
			//反选
			$(".checkbox").each(function(){
				$(this).removeAttr("checked");
			})
		}
	});
	
/*	//单位全选、反选
	$(document).on('click','.checkbox2',function(){
		var parent = $(this).parent().parent().parent();
		if($(this).get(0).checked){
			$(parent).find("input[type='checkbox']").prop("checked",true);
		}else{
			$(parent).find("input[type='checkbox']").removeAttr("checked");
		}

	});*/
	
	//单个选
	$(document).on('click','.checkbox',function(){
		allChk();		
		/*//单选
		if($(this).parent().parent().attr("class") == 'row'){			
			var parent = $(this).parent().parent().parent().parent().parent();
			var chknum = $(parent).children();
			console.log($(parent).children());
			var chk = 0;
			for(var i = 0 ;i<chknum.length;i++){
				if($(chknum[i]).find("input[type='checkbox']").prop("checked") == true){
					chk++;
				}
			}
			if(chknum.length == chk){
				$(parent.parent()).find("input.checkbox2").prop("checked",true);
				allChk();
			}else{
				$(parent.parent()).find("input.checkbox2").prop("checked",false);
				allChk();
			}

		}*/
	});
	
})

function allChk(){
	var chknum = $("#cartList :checkbox").size();
	var chk = 0 ;
	$("#cartList :checkbox").each(function(){
		if($(this).prop("checked") == true){
			chk++;
		}
	});
	if(chknum == chk){
		$("#allCheckbox").prop("checked",true);
	}else{
		$("#allCheckbox").prop("checked",false);
	}
}


