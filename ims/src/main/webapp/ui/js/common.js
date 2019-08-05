var issOnlineUrl = "http://127.0.0.1:24010/ZKIDROnline";
var browserFlag = getBrowserType();
var popIdcardJson1;
/*
$().ready(function(){
	$(document).off("DOMNodeInserted","#cert_message_type");
	$("#cert_message_type").on("DOMNodeInserted",function(e){
		openMessage($("#cert_message_type").text(), $("#cert_message").text());
	});
});
*/
//身份证
//includeScript("baseISSObject.js", function(){
//includeScript("baseISSOnline.js", function(){
	var setting = {
			Cert : {
				callBack : function(result){
					setCertificateData(result);
				},
				select : "#button_readID"
			},
			Methods : {
				showMessage : function(type,message){
					$("#cert_message").text(message);
					$("#cert_message_type").text(msgType[type]);
				},
				downloadDrive : function(){
					$.jBox.closeTip();
					messageBox({messageType: "confirm", text: "请安装相关硬件驱动！点击确定下载驱动。", 
						callback: function(result){
							if(result)
							{
								window.location.href = "middleware/ZKIDROnline.exe";
							}
							closeMessage();
					}});
				}
			}
		}
		createISSonlineDevice(setting);
//});
//});

function setCertificateData(result)
{
	popIdcardJson1 = result;//全局变量
	if(ID=='addTenantID'){
		$("#addHrRenterIDCard").val(result.Certificate.IDNumber);
		$("#addHrRenterName").val(result.Certificate.Name);
		$("#addHrRenterBirth").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$("#addHrRenterSex").val(result.Certificate.Sex);
		
		$("#addHrRenterNation").val(result.Certificate.Nation);
		$("#addHrRenterIdcardAddress").val(result.Certificate.Address);
	}else if(ID=='addHouseholdsID'){
		var identityInformation= $("#id_card_reader_text_box", parent.document).val();
		$("#identityInformation").val(identityInformation+"");
		
		$("#popName").val(result.Certificate.Name);
		$("#popBirth").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$("#popIdcard").val(result.Certificate.IDNumber);
		$("#idIssued").val(result.Certificate.IDIssued);
		$("#issuedValidDate").val(result.Certificate.IssuedData+"-"+result.Certificate.ValidDate);
		$("#popSex").val(result.Certificate.Sex);
		
		imgData =result.Certificate.Base64Photo;
		$("#id_img_perss").attr("src","data:image/jpg;base64,"+imgData);
		
		$("#popNation").val(result.Certificate.Nation);
		$("#popIdcardAddress").val(result.Certificate.Address);
	}else if(ID=='openUpdateID'){
		$("#pop_name").val(result.Certificate.Name);
		$("#pop_birth").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$("#pop_idcard").val(result.Certificate.IDNumber);
		$("#pop_sex").val(result.Certificate.Sex);
		
		imgData =result.Certificate.Base64Photo;
		$("#id_img_pers_open").attr("src","data:image/jpg;base64,"+imgData);
		
		$("#pop_nation").val(result.Certificate.Nation);
		$("#pop_idcard_address").val(result.Certificate.Address);
	}else if(ID=='clientCardReading'){
		$this.parent().children().children(".clientName").val(result.Certificate.Name);
		$this.parent().children().children(".clientBirth").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$this.parent().children().children(".clientIdcard").val(result.Certificate.IDNumber);
		$this.parent().children().children(".clientSex").val(result.Certificate.Sex);
		imgData =result.Certificate.Base64Photo;
		$this.parent().parent().children().children("#popImg").attr("src","data:image/jpg;base64,"+imgData);
		
		$this.parent().children().children(".clientNation").val(result.Certificate.Nation);
		$this.parent().children().children(".clientIdcardAddress").val(result.Certificate.Address);
		var popIdcardJson = JSON.stringify(popIdcardJson1);
		$this.parent().children().children(".clientPopIdcardJson").val(popIdcardJson);
		
		$this.hide();
		$this.parent().children("#addLiveMan").show();
		
	}else if(ID=='userIdCard'){	
		$(".add_userName").val(result.Certificate.Name);//用户姓名
		$("#userBirthday").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));//用户出生日期
		$("#userSex").val(result.Certificate.Sex);//用户性别
		$("#addUserIdCard").val(result.Certificate.IDNumber);//用户身份证号码
		$("#userNation").val(result.Certificate.Nation);//用户民族
		$("#userIdIssued").val(result.Certificate.IDIssued);//用户身份证签发机关
		$("#userAddress").val(result.Certificate.Address);//用户住址
		$("#userValidData").val(result.Certificate.IssuedData+"-"+result.Certificate.ValidDate);//身份证有效期
		imgData =result.Certificate.Base64Photo;
		$("#userImsphoto").attr("src","data:image/jpg;base64,"+imgData);//身份证头像
		$("#userImsphoto").val(imgData);
	}else if(ID=='addLandlordID'){
		$("#addHsLandlordIdcard").val(result.Certificate.IDNumber);
		$("#addHsLandlordName").val(result.Certificate.Name);
		$("#addHsLandlordBirth").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$("#addHsLandlordSex").val(result.Certificate.Sex);
		
		$("#addHsLandlordNation").val(result.Certificate.Nation);
		$("#addHsLandlordIdcardAddress").val(result.Certificate.Address);
		imgData =result.Certificate.Base64Photo;
		$("#addHsLandlordImsphoto").val(imgData);
	/*121qq*/
	}else if(ID=='updataIdCard'){
		$("#pop_name").val(result.Certificate.Name);//用户姓名
		$("#pop_idcard").val(result.Certificate.IDNumber);//用户身份证号码
		$('#pop_sex').val(result.Certificate.Sex);//用户性别
		$("#pop_nation").val(result.Certificate.Nation);//用户民族
/*		$("#userIdIssued").val(result.Certificate.IDIssued);//用户身份证签发机关*/
		$("#pop_idcard_address").val(result.Certificate.Address);//用户住址
/*		$("#userValidData").val(result.Certificate.IssuedData+"-"+result.Certificate.ValidDate);//身份证有效期*/
		imgData =result.Certificate.Base64Photo;
		$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);//身份证头像
		$("#id_img_pers").val(imgData);
	}




	
}
	
function getRandomNum() 
{
    var random = parseInt(Math.random() * 10000);
    return random;
}

//消息控件的使用类型的类
var msgType = 
{
	info : "info",
	success : "success",
	warning : "warning",
	error : "error",
	loading : "loading"
};

function getBrowserType()
{
	var browserFlag = "";
	 //是否支持html5的cors跨域
    if (typeof(Worker) !== "undefined")
    {
        browserFlag = "html5";
    }
    //此处判断ie8、ie9
    else if(navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 8.0")>0 || navigator.userAgent.indexOf("MSIE 9.0")>0)
    {
        browserFlag = "simple";
    }
    else
	{
		browserFlag = "upgradeBrowser";//当前浏览器不支持该功能,请升级浏览器
	}
    return browserFlag;
}


function openMessage(type, text, ptimeout)
{ 
	text = (text == "" ? null : text);
	var timeout = 1000;
	if(type == msgType.warning || type == msgType.info)//警告
	{
		timeout = 3000;
	}
	else if(type == msgType.success)//成功 
	{
		
		text = (text && text != null ? text : "操作成功");//${common_op_succeed}:操作成功
		var num = strlen(text)/30;
		num = num > 8 ? 8 : num;
		timeout = Math.ceil(num) * timeout;//动态判断显示字符数的长度来延长显示时间
	}
	else if(type == msgType.error)//失败
	{
		text = (text && text != null) ? text : "操作失败";//${common_op_failed}:操作失败，程序出现异常
		timeout = 3000;
	}
	else if(type == msgType.loading)//处理中
	{
		timeout = 0;//当为'loading'时，timeout值会被设置为0，表示不会自动关闭。
		text = text && text != null ? text : "处理中";//${common_op_processing}:处理中
	}
	var width = strlen(text) * 6.1 + 45;//按字符计算宽度
	timeout = ptimeout ? ptimeout : timeout;
	$.jBox.tip(text, type,{timeout: timeout, width: (width > 400 ? 400 : "auto")});//设定最大宽度为400
}


function closeMessage(timeout)
{
	timeout = timeout ? timeout : 1000;
	window.setTimeout("$.jBox.closeTip();", timeout);//设定最小等待时间
}

function strlen(str)
{  
    var len = 0;  
    if(str != null)
    {
   		for (var i=0; i<str.length; i++)
    	{   
			var c = str.charCodeAt(i);
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) 
			{
				len++;   
			}	
			else 
			{
				len+=2;   
			}
    	}
    }
    return len;
}  

function messageBox(paramsJson)
{ 

	this.messageType = paramsJson.messageType ? $.trim(paramsJson.messageType) : "confirm";
	this.types = "";
  	if(paramsJson.type)
  	{
  		this.typeArray = paramsJson.type.split(" ");
	  	for(var i=0; i<this.typeArray.length; i++)
	  	{
  			this.types += this.typeArray[i]+" ";
	  	}
  	}
  	switch(this.messageType)
	{
		case "confirm":
		  	$.jBox.confirm(paramsJson.text, "提示", function(v, h, f) {
	     		if (v == "ok") 
	     		{ 
	     	 		paramsJson.callback(true);
	     		}
			});
			break;
	}
}
