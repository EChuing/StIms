var password = "";


$(function(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	
	console.log(isAndroid)
	if(isAndroid){
		$('#password').css("font-size","50px")
	}
	var co = getQueryString('co');
	var hsId = getQueryString('hsId');
	var url = "selectLock.action?co="+co+"&hsId="+hsId;
	$.ajax({
		url:url,
		data:{
			
		},
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.code == 1){
				var data = result.body;
				var html = "";
				for(var a in data){
					html += '<option value="'+data[a].id+'">'+data[a].address+'</option>';
				}
				$('#lockSelect').html(html)
			}else{
				alert(result.msg);
			}
		}
	})
});

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 

$('.num').on('click',function(){
	var a = $(this).attr('data-id');
	$(this).css("background-color","#FFD700");
	var that = this;
	setTimeout(function () { 
		$(that).css("background-color","#f6f4f3");
	}, 150); 
	password += a;
	$('#password').val(password);
//	if(password.length == 4){
//		checkPassword()
//	}
})

function subPassword(){
	checkPassword()
}

function checkPassword(){
	var co = getQueryString('co');
	var jdcDeviceId = $('#lockSelect option:selected').val();
	var jdcPassword = password;
	var hsId = getQueryString('hsId');
	$.ajax({
		url:"checkLockPassword.action",
		data:{
			jdcDeviceId:jdcDeviceId,
			jdcPassword:jdcPassword,
			co:co,
			jdcHsId:hsId
		},
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.code == 1){
				alert("开锁成功");
			}else if(result.code == -1){
				password = "";
				$('#password').val(password);
				alert(result.msg);
			}else if(result.code == -2){
				password = "";
				$('#password').val(password);
				alert(result.msg);
			}else if(result.code == -3){
				password = "";
				$('#password').val(password);
				alert(result.msg);
			}else if(result.code == -4){
				password = "";
				$('#password').val(password);
				alert(result.msg);
			}else{
				alert("开锁失败");
			}
		}
	})
}

$('#delete').on('click',function(){
	password = password.substring(0,password.length-1);
	$('#password').val(password);
})

$('#clean').on('click',function(){
	password = "";
	$('#password').val(password);
})


$('#lockSelect').change(function(){
	password = "";
	$('#password').val(password);
})

