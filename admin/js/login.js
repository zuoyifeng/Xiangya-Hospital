$(function () {
    //用户名
    var $username = $('#username');
    //密码
    var $password = $('#password');
    //提示文字对象
    var $info = $('#info');
    //登录按钮
    var $loginbtn = $('#loginbtn');
    //是否可以提交表单
    $loginbtn.click(function(){
        var username=$.trim($username.val());
        var password=$.trim($password.val());
        if (!username) {
            $info.removeClass('hide').text('用户名不能为空');
            $username.focus();
            return false;
        }
        if (!password) {
            $info.removeClass('hide').text('密码不能为空');
            $password.focus();
            return false;
        }
        var res = {
            "status": true,
            "httpstatus": 200,
            "data": {
                "id": 7,
                "role": "1",
                "passwd": "0a594152643e2501c10effcfdb4bc6a0",
                "uUserDTO": {
                    "id": 8,
                    "createdTime": "2017-06-29 17:15:28",
                    "email": "123456",
                    "groupId": 1,
                    "mobileNo": "1213456",
                    "status": 1,
                    "tenantId": 1,
                    "userName": "linan"
                }
            },
            "isValidateMessage": false,
            "messages": [],
            "validateMessages": {}
        }

        var userinfo = res.data.uUserDTO;
                    userinfo.role = res.data.loginName;
                    sessionStorage.setItem('USER_INFO', JSON.stringify(userinfo));
        console.log(JSON.parse(sessionStorage.getItem('USER_INFO')));
        window.location = 'index.html';

        /*$.ajax({
            url: GLOBAL_AJAX_URL.userLogin,
            type: "POST",
            data:{
                loginName: username,
                passwd: password
            },
            success:function(res){
                if (res.status) {
                    var userinfo = res.data.uUserDTO;
                    userinfo.loginName = res.data.loginName;
                    sessionStorage.setItem('USER_INFO', JSON.stringify(userinfo));
                    window.location = 'index.html';
                }else{
                    $info.removeClass('hide').text(res.message);
                    $('#username').focus();
                }
            }
        });*/
    });
    //点击确定按钮提交表单
    $(document).on('keyup',function(e){
        if(e.keyCode=='13'){
            $loginbtn.trigger('click');
        }
    })
})