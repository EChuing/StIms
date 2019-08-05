function authorize(){
        $.post("../getOpenIdByCode.action",function (data) {
        if(data.code<0){
            alert("===");
        }
        window.location.href = "wxAuthSuccess.html";
    });
}