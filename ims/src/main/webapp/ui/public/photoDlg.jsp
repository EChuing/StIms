<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
.main{
	width: 100%;
	height: auto;
	margin: 0px auto;
	text-align: center;
}

.photoGraph{
	margin: 0px auto;
	width:300px;
	height:200px;
}
.photo{
	height: 200px;
	margin: 0px auto;
}
.photo-one{
	height: 70px;
}
.photo-one input{
	width:100px;
	height:30px;
	line-height:30px;
	text-align:center;
	color:#fff;
	border-radius:8px;
	background:#0ca9ad;
}
.photo-one button{
	width:100px;
	height:30px;
	line-height:30px;
	text-align:center;
	color:#fff;
	border-radius:8px;
	background:#0ca9ad;
}
.photo-one button:hover{
	background:#ff8040;
}
/* 所有class为menu的div中的ul样式 */
div #imgwrap ul
{
    list-style:none; /* 去掉ul前面的符号 */
    margin: -10px 0 0 0; /* 与外界元素的距离为0 */
    padding: 5px; /* 与内部元素的距离为0 */
    width:auto; /*宽度根据元素内容调整*/
    text-align: center;
}
/* 所有class为menu的div中的ul中的li样式 */
div #imgwrap ul li
{
    display: inline-block;
    width:150px;
    margin-lift:2px;
    position: relative;
}
/*删除按钮样式*/
.cancelsss {
    width: 24px;
    height: 24px;
    display: inline;
    float: right;
    text-indent: -9999px;
    overflow: hidden;
    background: url(http://pic-static.fangzhizun.com/images/upload-icons.png) no-repeat;
    margin: 5px 1px 1px;
    cursor: pointer;
}
/*引用删除图片是一个组合图片 所以进行定位*/
 .cancelsss {
     background-position: -48px 0;
 } 
/*横幕 鼠标移入移出删除效果的效果*/
.file-panel1 {
    position: absolute;
    height: 0;
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80000000', endColorstr='#80000000')\0;
    background: rgba( 0, 0, 0, 0.5 );
    width: 100%;
    top: 0;
    left: 0px;
    overflow: hidden;
    z-index: 300;
}
</style>
<div id="photoDlg" class="easyui-dialog" data-options="closed:true" style="background-color:#fafafa; background:#fafafa;">

	<div class="main" >
		<!-- 摄像头  -->
		<div class="photoGraph" id="thePhotoGraph" style="display:block;margin-top:30px">
				<video id="video" style=""></video>
		</div>
		
		<!-- 照片预览  -->
		<div class="photo" style="display:none;margin-top:30px" id="thePhoto">
			<canvas id="canvas" width="150px" height="200px" ></canvas>
		</div>
		
		<!-- 排在保存按钮控制  -->
		<div class="photo-one"  style="margin:0 auto">
			<div style="margin-top:50px">
				<input type="button" id="snap" value="拍照" />
				<button id="save" style="display:none;margin:0 auto;">保存</button>
				<input type="button" id="snap1" value="关闭" onclick="$('#photoDlg').dialog('close')" />
			</div>
			<!--  -->
			<div id="RepeatedWarnings" style="display:none;color:red;font-size:5px;" >一次最多上传三张照片!</div>
		</div>
		
		<!-- 动态储存照片  -->
		<div id="imgwrap" style="text-align: center;">
			<ul>
			</ul>
		</div>
		
	</div>
</div>
<script>
//全局变量控制照片数量
var quantity;
//id=snap转换成变量
var obt=document.getElementById("snap");
//id=thePhotoGraph转换成变量
var ophotograph=document.getElementById("thePhotoGraph");
//id=thePhoto转换成变量
var ophoto=document.getElementById("thePhoto");
//id=save转换成变量
var osave=document.getElementById("save");
//id=RepeatedWarnings转换成变量
var RepeatedWarnings=document.getElementById("RepeatedWarnings");
//标签名
var filepanel="file-panel1";
//标签名
var cancel="cancelsss";
//存照片进canvas
function takePhoto() {
//获得Canvas对象
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.drawImage(video, 0, 0, 150, 200);
}

//保存图片的格式
document.getElementById("save").onclick = function (){
    addImg(canvas);
    osave.style.display="none";
    obt.value="拍照";
    ophotograph.style.display="block";
    ophoto.style.display="none";
}

//保存图片方法
function addImg(canvas){
	RepeatedWarnings.style.display="none";
	//照片转换成base64格式赋给变量base64s
	var base64s = canvas.toDataURL("image/png");
	//获取标签长度
	quantity = $("ul > li > img").size();
	//判断是否超过三张照片size是从0开始所以这里就写2
	if(quantity<=2){
	quantity++;
	var li = " <li><div class="+filepanel+" ><sapn class="+cancel+">删除</sapn></div><img src="+base64s+" /></li>";
	//动态页面
	$('#imgwrap ul ').append(li);
	//鼠标移入事件	
	$("#imgwrap ul li").on("mouseenter",function(){
  	btns =$(this).find(".file-panel1");
  	btns.stop().animate({height: 24,width:150});
 	});
 	//鼠标移入事件
 	$("#imgwrap ul li").on("mouseleave",function(){
  	btns =$(this).find(".file-panel1");
  	btns.stop().animate({height: 0});
 	});
 	//删除
 	$("#imgwrap ul li .file-panel1").on("click",function(){
  	$(this).parents("#imgwrap ul li").remove();
 	})
	}else{
  	RepeatedWarnings.style.display="inline";
	}
	return quantity;
}

//控制按钮
obt.onclick=function(){
		navigator.getUserMedia({video: true,audio:true}, function onSuccess(stream) {
			console.log('已点击允许,开启成功');
			var Devicestate = navigator.mediaDevices.getUserMedia({
				audio: true,
				video: {
					//摄像宽高
					width: 150,
					height: 200
				}
			});
			Devicestate.then(function(mediaStream) {
				video = document.querySelector('video');
				video.srcObject = mediaStream;
				video.onloadedmetadata = function(e) {
					video.play();
				};
				//获取视频音频
				MediaStreamTrack=typeof mediaStream.stop==='function'?mediaStream:mediaStream.getTracks();
				var mediaStreamTrack1 = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
			});
			takePhoto();
			if(ophotograph.style.display=="block"){
				ophotograph.style.display="none";
				ophoto.style.display="block";
				osave.style.display="inline";
				obt.value="重拍";
			}
			else{
				ophotograph.style.display="block";
				ophoto.style.display="none";
				obt.value="拍照";
				osave.style.display="none";
			}
		}, function onError(error) {
			$("#RepeatedWarnings").text("用户拒绝使用,或者没有摄像头!");
			$("#RepeatedWarnings").show();
			console.log("错误：", error);
		});


}
</script>
