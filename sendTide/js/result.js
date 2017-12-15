$(function () {
    mui(document).on('tap',".navs li",function() {
        var index = $(this).index();
        $(".navs li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".isScroll li a").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".navs li ").find(".img").removeClass('active').end().eq(index).find(".img").addClass('active');
        $(".isScroll li").find('.img').removeClass('active').end().eq(index).find(".img").addClass('active');
        $(".main .list .every .style").filter(".active").removeClass('active').end().eq(index).addClass('active');
        console.log(index);
        if(index == 0){
        	_isSendBtn = true;
        	//免费送
        	g.getSendData();
        	
        }else{
        	_isSendBtn = false;
        	//免费抢
        	g.getGrabData();
        	//24小时倒计时
        	g.add24hTime();
        	
        }
        
    });
    //免费送档期
    mui(document).on('tap','.rob .times li',function(){
        var index = $(this).index();
        var timeId = this.getAttribute("timeid");
        $(".rob .times li").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".rob .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
    	
    	g.getPresentStartTime(timeId);//默认当前档期时间
    	
    	if(index == '0'){
    		//获取10点档数据
			g.getSendContenData("10" ,"sendCont1");
    	}else if(index == '1'){
    		//获取16点档数据
			g.getSendContenData("16" ,"sendCont2");
    	}else if(index == '2'){
    		//获取21点档数据
			g.getSendContenData("21" ,"sendCont3");
    	}
    });
    
    //免费送btn
    mui(document).on('tap','.purId .purchase',function(){
    	//orderistime 活动状态 0 未开始 1 正在进行  2 活动已结束
    	var orderistime = this.getAttribute('orderistime'); 
    	if(orderistime == '0'){
    		mui.toast("本档活动还未开始，敬请期待");
    		return;
    	}else if(orderistime == '2'){
    		mui.toast("本档活动已结束");
    		return;
    	}else if(orderistime == '1'){
    		 $(".mask").show();
       		 $(".join").show();
    	}
    	
    	return false;
    })
    
    
     //免费抢档期
    mui(document).on('tap','.mui-table-view-cell span',function() {
        var index = $(this).index();
        $(".mui-navigate-right span").filter(".active").removeClass('active').end().eq(index).addClass('active');
        $(".present .commidity .every .timecommidity").filter(".active").removeClass('active').end().eq(index).addClass('active');
        var timeId = this.getAttribute("timeid");
        g.getPresentStartTime(timeId);//默认当前档期时间  
        
        if(index == '0'){
    		//获取10点档数据
			g.getGrabContenData("10" ,"gradCont1");
    	}else if(index == '1'){
    		//获取16点档数据
			g.getGrabContenData("16" ,"gradCont2");
    	}else if(index == '2'){
    		//获取21点档数据
			g.getGrabContenData("21" ,"gradCont3");
    	}
    	
    });
    
    mui(document).on('tap','#add',function(){
    	//$(".mui-collapse-content").slideToggle();
    	mui.toast("目前只开放三个档期");
    });

	
	//关闭.join窗
	mui(document).on('tap',".join .error span",function() {
        $(".mask").hide();
        $(".join").hide();
    })
	
	mui(document).on('tap',".mask",function() {
        $(".mask").hide();
        $(".join").hide();
    })
	
	  //免费送
   mui(document).on('tap','.purId',function(){
   		setLocation.openWindow("detail.html");
   });

})
