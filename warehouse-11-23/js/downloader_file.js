/*
 *调用
 */
//setImg("http://www.bbzuche.com/images/tan.jpg");


var imgeList = new Array();

/*<img>设置图片
 *1.从本地获取,如果本地存在,则直接设置图片
 *2.如果本地不存在则联网下载,缓存到本地,再设置图片
 * */
function setImg(loadUrl ,len) {
	//console.log(loadUrl+"----"+len);
	if(len > 0 && loadUrl == null) return;
	//图片下载成功 默认保存在本地相对路径的"_downloads"文件夹里面, 如"_downloads/logo.jpg"
	var filename = loadUrl.substring(loadUrl.lastIndexOf("/") + 1, loadUrl.length);
	var relativePath = "_downloads/" + filename;
	//检查图片是否已存在
	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
		//console.log("图片存在,直接设置=" + relativePath);
		console.log("----URL："+entry.toLocalURL());
		//alert("----URL："+entry.toLocalURL());		
		imgeList.push(entry.toLocalURL());
		if(imgeList.length == len){
			shareSystem(imgeList);
			imgeList=[];
		}
		
		//如果文件存在,则直接设置本地图片
		 //setImgFromLocal(relativePath);
	}, function(e) {
		console.log("图片不存在,联网下载=" + relativePath);
		//alert("----联网下载："+relativePath);
		//如果文件不存在,联网下载图片
		 setImgFromNet(loadUrl, relativePath ,len);
	});
}

/*给图片标签<img>设置本地图片
 * imgId 图片标签<img>的id
 * relativePath 本地相对路径 例如:"_downloads/logo.jpg"
 */
function setImgFromLocal(relativePath) {
	//本地相对路径("_downloads/logo.jpg")转成SD卡绝对路径("/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/downloads/logo.jpg");
	var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
	//给<img>设置图片
	//$id(imgId).setAttribute("src", sd_path);
	
}

/*联网下载图片,并设置给<img>*/
function setImgFromNet(loadUrl, relativePath ,len) {
	//先设置下载中的默认图片
	//$id(imgId).setAttribute("src", "../images/loading.png");
	//创建下载任务
	var dtask = plus.downloader.createDownload(loadUrl, {}, function(d, status) {
		if(status == 200) {
			//下载成功
			console.log("下载成功=" + relativePath);
			//setImgFromLocal(d.filename);
			setImg(loadUrl , len);
		} else {
			//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
			console.log("下载失败=" + status + "==" + relativePath);
			//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
			if(relativePath != null)
				delFile(relativePath);
		}
	});
	//启动下载任务
	dtask.start();
}

/*删除指定文件*/
function delFile(relativePath) {
	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
		entry.remove(function(entry) {
			console.log("文件删除成功==" + relativePath);
		}, function(e) {
			console.log("文件删除失败=" + relativePath);
		});
	});
}

/*根据id查找元素*/
function $id(id) {
	return document.getElementById(id);
}