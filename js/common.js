$(function(){
    //登陆页面
  

})


function clearUserid() {
    sessionStorage.removeItem("USER_INFO");
}
//封装ajax请求
function _ajax(opt) {
    $.ajax({
        url: opt.url,
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: opt.data,
        success: opt.success
    });
}